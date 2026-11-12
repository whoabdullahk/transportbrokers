import { jsPDF } from "jspdf";
import { ADD_ONS, COMPANY, addOnsTotal, type PaymentMethod } from "@/lib/company";
import type { CarrierInfo, ExecutionInfo } from "@/lib/agreement-schema";

export interface AgreementPdfParams {
  carrier: CarrierInfo;
  addOns: readonly string[];
  payment: PaymentMethod;
  exec: ExecutionInfo;
  docId: string;
}

/**
 * Generates the executed Carrier Setup & Freight Brokering Agreement PDF for
 * GOLD STAR TRANSPORTATION, INC. and appends the company certificate page.
 */
export async function generateAgreementPDF({
  carrier,
  addOns,
  payment,
  exec,
  docId,
}: AgreementPdfParams): Promise<string> {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 56;
  let y = margin;

  const executionDate = exec.date || new Date().toISOString().split("T")[0];
  const chosenAddOns = ADD_ONS.filter((a) => addOns.includes(a.id));

  const addPage = () => {
    doc.addPage();
    y = margin;
  };

  const checkPage = (needed = 40) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) addPage();
  };

  // ── Header (Faceted Gold Star + Company Name) ──
  const headerText = COMPANY.name;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const headerWidth = doc.getTextWidth(headerText);
  const iconRadius = 14;
  const spacing = 12;
  const totalWidth = iconRadius * 2 + spacing + headerWidth;

  const startX = (W - totalWidth) / 2;
  const ly = margin + 12;

  const starCx = startX + iconRadius;
  const starCy = ly;
  const R = iconRadius;
  const r = R * 0.42;

  for (let i = 0; i < 5; i++) {
    const aOuter = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const aInnerLeft = -Math.PI / 2 + ((i - 0.5) * 2 * Math.PI) / 5;
    const aInnerRight = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / 5;
    const ox = starCx + R * Math.cos(aOuter);
    const oy = starCy + R * Math.sin(aOuter);
    const ilx = starCx + r * Math.cos(aInnerLeft);
    const ily = starCy + r * Math.sin(aInnerLeft);
    const irx = starCx + r * Math.cos(aInnerRight);
    const iry = starCy + r * Math.sin(aInnerRight);

    doc.setFillColor(255, 222, 115);
    doc.triangle(starCx, starCy, ox, oy, ilx, ily, "F");
    doc.setFillColor(184, 134, 11);
    doc.triangle(starCx, starCy, ox, oy, irx, iry, "F");
  }
  doc.setFillColor(255, 248, 208);
  doc.circle(starCx, starCy, R * 0.12, "F");

  doc.setTextColor(0, 0, 0);
  doc.text(headerText, startX + iconRadius * 2 + spacing, ly + 5);

  y = ly + 36;

  // ── Title ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CARRIER SETUP & FREIGHT BROKERING AGREEMENT", W / 2, y, { align: "center" });
  y += 18;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Document ID: ${docId || "#GS"}  |  Dedicated Lanes, Dispatch, Trailer Rental, and Setup Services`,
    W / 2,
    y,
    { align: "center" },
  );
  doc.setTextColor(0, 0, 0);
  y += 32;

  // ── Broker Info ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`This Agreement is made and entered into on ${executionDate}, by and between:`, margin, y);
  y += 18;
  doc.setFont("helvetica", "bold");
  doc.text(COMPANY.name, margin, y);
  doc.setFont("helvetica", "normal");
  y += 18;
  doc.text(`MC #: ${COMPANY.mcNumber} | U.S. DOT #: ${COMPANY.dotNumber}`, margin, y);
  y += 18;
  doc.text(`Address: ${COMPANY.address}`, margin, y);
  y += 18;
  doc.text(`Email: ${COMPANY.onboardingEmail}`, margin, y);
  y += 18;
  doc.text(`Phone: ${COMPANY.phone}`, margin, y);
  y += 20;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text(`(Hereinafter referred to as ${COMPANY.name})`, margin, y);
  doc.setTextColor(0, 0, 0);
  y += 22;

  const divider = () => {
    // Ensure enough room remains for the next section title too; otherwise break cleanly first.
    if (y + 68 > doc.internal.pageSize.getHeight() - margin) {
      addPage();
      return;
    }
    y += 8;
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(1);
    doc.line(margin, y, W - margin, y);
    y += 18;
  };

  const sectionTitle = (title: string) => {
    checkPage(40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, y);
    y += 6;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + doc.getTextWidth(title), y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const field = (label: string, value: string) => {
    checkPage(18);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(` ${value || "N/A"}`, margin + doc.getTextWidth(`${label}:`), y);
    y += 18;
  };

  const bullet = (text: string) => {
    checkPage(18);
    doc.text(`•  ${text}`, margin + 10, y);
    y += 18;
  };

  const bodyText = (text: string) => {
    checkPage(18);
    const lines = doc.splitTextToSize(text, W - margin * 2);
    lines.forEach((l: string) => {
      checkPage(18);
      doc.text(l, margin, y);
      y += 16;
    });
  };

  divider();

  // ── Carrier Credentials ──
  sectionTitle("Carrier Credentials & Profile");
  field("Carrier Full Name", carrier.carrierName);
  field("Company Name", carrier.companyName || "N/A");
  field("MC Number", carrier.mcNumber || "N/A");
  field("U.S. DOT Number", carrier.dotNumber);
  field("Driving License Number", carrier.licenseNumber);
  if (carrier.truckNumber) field("Truck / Unit #", carrier.truckNumber);
  field("Phone Number", carrier.phone);
  field("Email Address", carrier.email);

  divider();

  // ── Scope & Optional Services ──
  sectionTitle("Scope of Dedicated Services");
  bodyText("This Agreement governs setup, logistics management, and carrier dispatch services including:");
  y += 4;
  bullet("Dedicated Freight Lanes");
  bullet("Full Dispatch Assistance");
  bullet("Trailer Rental Support");
  bullet("TWIC Card Assistance");
  bullet("Commercial Insurance Setup");
  bullet("Factoring Fast-Track");

  divider();

  sectionTitle("Selected Add-On Services");
  if (chosenAddOns.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.text("No optional add-on services selected.", margin, y);
    doc.setFont("helvetica", "normal");
    y += 18;
  } else {
    chosenAddOns.forEach((a) => bullet(`${a.title} (${a.note}) — $${a.price}`));
    y += 4;
    field("Selected Add-Ons Total", `$${addOnsTotal(addOns)}`);
  }

  divider();

  // ── Payment Method ──
  sectionTitle("Payment Method Selection");
  field("Selected Payment Method", payment);

  divider();

  // ── Terms & Conditions ──
  sectionTitle("Agreement Terms & Conditions");
  doc.setFont("helvetica", "bold");
  doc.text("1. Payment & Activation Terms", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  bodyText("Fees for any optional add-on services are invoiced after the service has been confirmed. Digital confirmation receipts are issued upon processing.");
  y += 6;

  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.text("2. Cancellation Policy", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  bodyText(`Either party may terminate this Agreement with written notice. Fees for add-on services not yet started by ${COMPANY.name} are refunded in full.`);
  y += 6;

  checkPage(50);
  doc.setFont("helvetica", "bold");
  doc.text("3. Carrier Responsibilities & Independent Relationship", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  bodyText("The Carrier certifies valid authority (MC/DOT), active commercial cargo and auto insurance, and accurate driver qualification files. This Agreement constitutes an independent contractor relationship, with the Carrier maintaining sole responsibility for FMCSA safety compliance.");
  y += 6;

  checkPage(50);
  doc.setFont("helvetica", "bold");
  doc.text("4. Limitation of Liability", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  bodyText(`${COMPANY.name} is not liable for indirect income loss due to transit delays, shipper-directed appointments, market conditions, or broker cancellations. Both parties commit to professional communication and adherence to agreed schedules.`);

  divider();

  // ── Execution & Signatures ──
  sectionTitle("Execution & Digital Signatures");
  field("Authorized Signature", exec.signature);
  field("Print Legal Name", exec.printName);
  field("Execution Date", executionDate);

  y += 12;
  sectionTitle("Broker Representative");
  doc.setFont("helvetica", "bold");
  doc.text(COMPANY.name, margin, y);
  doc.setFont("helvetica", "normal");
  y += 18;
  field("Date", executionDate);

  const jsPdfBytes = doc.output("arraybuffer");

  try {
    const { PDFDocument } = await import("pdf-lib");
    const mainPdf = await PDFDocument.load(jsPdfBytes);
    const certRes = await fetch("/certificate.pdf");
    if (certRes.ok) {
      const certBytes = await certRes.arrayBuffer();
      const certPdf = await PDFDocument.load(certBytes);
      const lastPageIndex = certPdf.getPageCount() - 1;
      const copiedPages = await mainPdf.copyPages(certPdf, [lastPageIndex]);
      copiedPages.forEach((p) => mainPdf.addPage(p));
    }
    return await mainPdf.saveAsBase64();
  } catch (err) {
    console.error("Failed to merge certificate PDF", err);
    return doc.output("datauristring").split(",")[1];
  }
}

