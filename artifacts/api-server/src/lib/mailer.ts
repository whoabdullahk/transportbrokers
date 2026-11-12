import nodemailer from "nodemailer";
import dns from "dns";
import net from "net";
import { logger } from "./logger.js";

export interface SendEmailAttachment {
  filename: string;
  content: string | Buffer; // Base64 string or Buffer
  contentType?: string;
}

export interface SendEmailParams {
  from?: string; // e.g. '"Display Name" <email@domain.com>'
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: SendEmailAttachment[];
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}

// Track temporary outbound SMTP blocks (e.g. Render free tier blocking ports 25/465/587)
// so subsequent sends fail over to HTTPS email APIs immediately without waiting for timeout.
let smtpBlockedUntil = 0;
const SMTP_BLOCK_TTL_MS = 30 * 60 * 1000;

export function isSmtpNetworkError(errOrMsg: unknown): boolean {
  const msg = typeof errOrMsg === "string"
    ? errOrMsg
    : errOrMsg instanceof Error
      ? `${(errOrMsg as any).code || ""} ${errOrMsg.message}`
      : String(errOrMsg || "");
  return /ETIMEDOUT|ENETUNREACH|ECONNREFUSED|EHOSTUNREACH|ESOCKET|Connection timeout|Greeting never received/i.test(msg);
}

/**
 * Resolves a hostname strictly to an IPv4 address using system getaddrinfo (dns.lookup).
 * Passing a literal IPv4 host + tls.servername bypasses Nodemailer 9's internal
 * dns.Resolver (which resolves AAAA records and ignores custom lookup options).
 */
export async function resolveIpv4Host(hostname: string): Promise<string> {
  if (!hostname || net.isIP(hostname) !== 0) {
    return hostname;
  }
  return new Promise((resolve) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (!err && address) {
        resolve(address);
      } else {
        resolve(hostname);
      }
    });
  });
}

function normalizeBase64(content: string | Buffer): string {
  if (Buffer.isBuffer(content)) {
    return content.toString("base64");
  }
  const commaIdx = content.indexOf(",");
  if (content.startsWith("data:") && commaIdx !== -1) {
    return content.slice(commaIdx + 1);
  }
  return content;
}

/** Extracts a bare email address from `"Display Name" <email>` or plain `email` strings. */
export function extractEmailAddress(value?: string): string {
  const raw = (value || "").trim();
  const match = raw.match(/<([^<>]+)>/);
  return (match ? match[1] : raw).trim();
}

/** Returns the configured sender email address (always bare email, free of display-name wrappers). */
export function getSenderEmail(): string {
  return (
    extractEmailAddress(process.env.SMTP_FROM) ||
    extractEmailAddress(process.env.SMTP_USER) ||
    "brandontaylor@goldstartranposrtationinc.com"
  );
}

/** Returns the configured company inbox email address. */
export function getInboxEmail(): string {
  return extractEmailAddress(process.env.SMTP_TO) || extractEmailAddress(process.env.SMTP_USER) || getSenderEmail();
}

function sanitizeFromField(rawFrom?: string): string {
  const fallback = getSenderEmail();
  if (!rawFrom || /<undefined>|<null>/i.test(rawFrom)) {
    return fallback;
  }
  return rawFrom;
}

async function sendViaResend(params: SendEmailParams, toList: string[], ccList: string[], bccList: string[]): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, provider: "resend", error: "RESEND_API_KEY is missing" };
  }

  try {
    const mappedAttachments = params.attachments?.map((att) => ({
      filename: att.filename,
      content: normalizeBase64(att.content),
      contentType: att.contentType,
    }));

    const fromField = sanitizeFromField(params.from);

    const bodyPayload = {
      from: fromField,
      to: toList,
      cc: ccList.length > 0 ? ccList : undefined,
      bcc: bccList.length > 0 ? bccList : undefined,
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: mappedAttachments && mappedAttachments.length > 0 ? mappedAttachments : undefined,
    };

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      const data = await response.json().catch(() => ({})) as any;

      if (response.status === 429 && attempt < maxAttempts) {
        const waitMs = 700 * attempt;
        logger.warn({ attempt, waitMs }, "Resend API rate limited (429), retrying...");
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }

      if (!response.ok) {
        logger.error({ responseData: data, status: response.status }, "Resend API returned error status");
        return { success: false, provider: "resend", error: data.message || `HTTP ${response.status}` };
      }

      logger.info({ messageId: data.id }, "Email sent successfully via Resend API");
      return { success: true, provider: "resend", messageId: data.id };
    }

    return { success: false, provider: "resend", error: "Resend API rate limit exceeded" };
  } catch (err: any) {
    logger.error({ err }, "Resend API request failed");
    return { success: false, provider: "resend", error: err.message || String(err) };
  }
}

async function sendViaSendGrid(params: SendEmailParams, toList: string[], ccList: string[], bccList: string[]): Promise<SendEmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { success: false, provider: "sendgrid", error: "SENDGRID_API_KEY is missing" };
  }

  try {
    const fromField = sanitizeFromField(params.from);

    let fromEmail = fromField;
    let fromName: string | undefined;
    const match = fromField.match(/^(?:"?([^"]*)"?\s)?(?:<(.+?)>)$/);
    if (match) {
      fromName = match[1] || undefined;
      fromEmail = match[2];
    }

    const mappedAttachments = params.attachments?.map((att) => ({
      content: normalizeBase64(att.content),
      filename: att.filename,
      type: att.contentType || "application/octet-stream",
      disposition: "attachment",
    }));

    const personalizations: any = {
      to: toList.map((email) => ({ email })),
    };

    if (ccList.length > 0) {
      personalizations.cc = ccList.map((email) => ({ email }));
    }
    if (bccList.length > 0) {
      personalizations.bcc = bccList.map((email) => ({ email }));
    }

    const bodyPayload = {
      personalizations: [personalizations],
      from: { email: fromEmail, name: fromName },
      reply_to: params.replyTo ? { email: params.replyTo } : undefined,
      subject: params.subject,
      content: [
        ...(params.text ? [{ type: "text/plain", value: params.text }] : []),
        ...(params.html ? [{ type: "text/html", value: params.html }] : []),
      ],
      attachments: mappedAttachments && mappedAttachments.length > 0 ? mappedAttachments : undefined,
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      let errorMsg = `HTTP ${response.status}`;
      try {
        const data = await response.json() as any;
        errorMsg = JSON.stringify(data.errors || data);
      } catch {}
      logger.error({ errorResponse: errorMsg }, "SendGrid API returned error status");
      return { success: false, provider: "sendgrid", error: errorMsg };
    }

    const messageId = response.headers.get("x-message-id") || "sendgrid-success";
    logger.info({ messageId }, "Email sent successfully via SendGrid API");
    return { success: true, provider: "sendgrid", messageId };
  } catch (err: any) {
    logger.error({ err }, "SendGrid API request failed");
    return { success: false, provider: "sendgrid", error: err.message || String(err) };
  }
}

async function sendViaMailgun(params: SendEmailParams, toList: string[], ccList: string[], bccList: string[]): Promise<SendEmailResult> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!apiKey || !domain) {
    return { success: false, provider: "mailgun", error: "Mailgun credentials not configured" };
  }

  try {
    const fromField = sanitizeFromField(params.from);
    const apiUrl = (process.env.MAILGUN_API_URL ?? "https://api.mailgun.net/v3").replace(/\/$/, "");
    const requestUrl = `${apiUrl}/${domain}/messages`;

    const formData = new FormData();
    formData.append("from", fromField);

    toList.forEach((toEmail) => {
      formData.append("to", toEmail);
    });

    ccList.forEach((ccEmail) => {
      formData.append("cc", ccEmail);
    });

    bccList.forEach((bccEmail) => {
      formData.append("bcc", bccEmail);
    });

    if (params.replyTo) {
      formData.append("h:Reply-To", params.replyTo);
    }

    formData.append("subject", params.subject);

    if (params.text) {
      formData.append("text", params.text);
    }
    if (params.html) {
      formData.append("html", params.html);
    }

    if (params.attachments && params.attachments.length > 0) {
      for (const att of params.attachments) {
        const contentBuffer = Buffer.isBuffer(att.content)
          ? att.content
          : Buffer.from(normalizeBase64(att.content), "base64");
        const blob = new Blob([new Uint8Array(contentBuffer)], { type: att.contentType || "application/octet-stream" });
        formData.append("attachment", blob, att.filename);
      }
    }

    const authHeader = "Basic " + Buffer.from(`api:${apiKey}`).toString("base64");

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
      },
      body: formData,
    });

    const responseText = await response.text();
    let responseData: any = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { rawResponse: responseText };
    }

    if (!response.ok) {
      logger.error({ responseData, statusCode: response.status }, "Mailgun API returned error status");
      return { success: false, provider: "mailgun", error: responseData.message || responseText || `HTTP ${response.status}` };
    }

    logger.info({ messageId: responseData.id }, "Email sent successfully via Mailgun API");
    return { success: true, provider: "mailgun", messageId: responseData.id };
  } catch (err: any) {
    logger.error({ err }, "Mailgun API request failed");
    return { success: false, provider: "mailgun", error: err.message || String(err) };
  }
}

async function sendViaSmtp(params: SendEmailParams, toList: string[], ccList: string[], bccList: string[]): Promise<SendEmailResult> {
  const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return { success: false, provider: "smtp", error: "SMTP credentials not configured" };
  }

  try {
    const resolvedHost = await resolveIpv4Host(host);

    const transporter = nodemailer.createTransport({
      host: resolvedHost,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false, servername: host },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    } as any);

    // Hostinger SPF Rule: Enforce that the actual email address in the 'From' header
    // is EXACTLY the authenticated SMTP_USER.
    let finalizedFrom = sanitizeFromField(params.from);
    const nameMatch = finalizedFrom.match(/^(?:"?([^"]*)"?\s)?(?:<(.+?)>)$/);
    if (nameMatch) {
      const displayName = nameMatch[1];
      finalizedFrom = displayName ? `"${displayName}" <${user}>` : user;
    } else if (finalizedFrom !== user) {
      finalizedFrom = `"${finalizedFrom}" <${user}>`;
    }

    const mappedAttachments = params.attachments?.map((att) => ({
      filename: att.filename,
      content: Buffer.isBuffer(att.content) ? att.content : Buffer.from(normalizeBase64(att.content), "base64"),
      contentType: att.contentType,
    }));

    const info = await transporter.sendMail({
      from: finalizedFrom,
      to: toList,
      cc: ccList.length > 0 ? ccList : undefined,
      bcc: bccList.length > 0 ? bccList : undefined,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: mappedAttachments,
    });

    smtpBlockedUntil = 0;
    logger.info({ messageId: info.messageId, resolvedHost, port }, "Email sent successfully via SMTP");
    return { success: true, provider: "smtp", messageId: info.messageId };
  } catch (err: any) {
    if (isSmtpNetworkError(err)) {
      smtpBlockedUntil = Date.now() + SMTP_BLOCK_TTL_MS;
    }
    logger.error(
      {
        host,
        port,
        user,
        err: {
          message: err.message,
          code: err.code,
          command: err.command,
          syscall: err.syscall,
        },
      },
      "SMTP sendMail failed"
    );
    return { success: false, provider: "smtp", error: err.message || String(err) };
  }
}

/**
 * Sends an email using the configured provider (SMTP, Resend, SendGrid, or Mailgun)
 * with automatic fallback across other configured providers (e.g. SMTP -> Resend HTTPS
 * when outbound SMTP ports 465/587 are blocked on free hosting tiers like Render).
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const provider = (process.env.EMAIL_PROVIDER ?? "smtp").toLowerCase();

  const toList = (Array.isArray(params.to) ? params.to : [params.to]).filter(Boolean);
  const rawCcList = params.cc ? (Array.isArray(params.cc) ? params.cc : [params.cc]) : [];
  const rawBccList = params.bcc ? (Array.isArray(params.bcc) ? params.bcc : [params.bcc]) : [];
  const toLowerSet = new Set(toList.map((e) => e.trim().toLowerCase()));
  const ccList = rawCcList.filter((e) => e && !toLowerSet.has(e.trim().toLowerCase()));
  const ccLowerSet = new Set(ccList.map((e) => e.trim().toLowerCase()));
  const bccList = rawBccList.filter((e) => e && !toLowerSet.has(e.trim().toLowerCase()) && !ccLowerSet.has(e.trim().toLowerCase()));

  logger.info({ provider, to: toList, subject: params.subject }, "Attempting to send email");

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY);
  const hasMailgun = Boolean(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN);
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const hasHttpFallback = hasResend || hasSendGrid || hasMailgun;

  const attemptOrder: string[] = [];
  const pushUnique = (name: string, enabled: boolean) => {
    if (enabled && !attemptOrder.includes(name)) {
      attemptOrder.push(name);
    }
  };

  if (provider === "smtp" && smtpBlockedUntil > Date.now() && hasHttpFallback) {
    // Outbound SMTP was recently detected as blocked/timed out; try HTTPS APIs first for fast delivery.
    pushUnique("resend", hasResend);
    pushUnique("sendgrid", hasSendGrid);
    pushUnique("mailgun", hasMailgun);
    pushUnique("smtp", hasSmtp);
  } else {
    pushUnique(provider, true);
    pushUnique("resend", hasResend);
    pushUnique("sendgrid", hasSendGrid);
    pushUnique("mailgun", hasMailgun);
    pushUnique("smtp", hasSmtp);
  }

  const errors: string[] = [];

  for (const currentProvider of attemptOrder) {
    let result: SendEmailResult;
    if (currentProvider === "resend") {
      result = await sendViaResend(params, toList, ccList, bccList);
    } else if (currentProvider === "sendgrid") {
      result = await sendViaSendGrid(params, toList, ccList, bccList);
    } else if (currentProvider === "mailgun") {
      result = await sendViaMailgun(params, toList, ccList, bccList);
    } else {
      result = await sendViaSmtp(params, toList, ccList, bccList);
    }

    if (result.success) {
      return result;
    }

    errors.push(`${currentProvider}: ${result.error || "Unknown error"}`);
    if (attemptOrder.length > 1) {
      logger.warn({ failedProvider: currentProvider, error: result.error }, "Email provider failed, trying next fallback...");
    }
  }

  return {
    success: false,
    error: errors.join(" | ") || "No email provider configured",
  };
}

/**
 * Asynchronously verifies the SMTP connection during server initialization
 * and logs detailed diagnostics.
 */
export async function verifySmtpConnection(): Promise<void> {
  const provider = (process.env.EMAIL_PROVIDER ?? "smtp").toLowerCase();
  if (provider !== "smtp") {
    logger.info({ provider }, "Email provider is not SMTP; skipping startup SMTP verification.");
    return;
  }

  const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    logger.warn("SMTP startup check: credentials not configured (SMTP_USER or SMTP_PASS missing).");
    return;
  }

  logger.info({ host, port, user }, "SMTP startup check: testing connection...");
  try {
    const resolvedHost = await resolveIpv4Host(host);
    const transporter = nodemailer.createTransport({
      host: resolvedHost,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false, servername: host },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    } as any);

    await transporter.verify();
    smtpBlockedUntil = 0;
    console.log(`SMTP startup check: SUCCESS – connection verified (${resolvedHost}:${port})`);
  } catch (err: any) {
    if (isSmtpNetworkError(err)) {
      smtpBlockedUntil = Date.now() + SMTP_BLOCK_TTL_MS;
    }
    console.error("SMTP startup check: FAILED – could not connect to SMTP server:", err?.message || err);
  }
}
