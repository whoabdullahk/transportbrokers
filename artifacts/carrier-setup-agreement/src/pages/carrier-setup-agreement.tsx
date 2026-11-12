import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Barcode,
  Briefcase,
  Building,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  Container,
  CreditCard,
  FileSignature,
  FileText,
  Hash,
  IdCard,
  Landmark,
  Layers,
  Loader2,
  Mail,
  MapPin,
  PenLine,
  Phone,
  Radio,
  Receipt,
  RotateCcw,
  Route as RouteIcon,
  Scale,
  Send,
  ShieldAlert,
  ShieldCheck,
  Truck,
  User,
  UserCheck,
  Zap,
} from "lucide-react";

import BrandLogo from "@/components/BrandLogo";
import { FmcsaCertificateCard } from "@/components/agreement/fmcsa-certificate-card";
import { Field, InfoTile, SectionHeader } from "@/components/agreement/parts";
import type { CarrierInfo, ExecutionInfo } from "@/lib/agreement-schema";
import { ADD_ONS, COMPANY, PAYMENT_METHODS, addOnsTotal, type PaymentMethod } from "@/lib/company";
import { generateAgreementPDF } from "@/lib/generate-agreement-pdf";

const PAY_ICONS: Record<PaymentMethod, typeof Building2> = {
  Factoring: Building2,
  "ACH Direct Deposit": Zap,
  "Check Deposit": Receipt,
};

const SCOPE = [
  { icon: RouteIcon, label: "Dedicated Freight Lanes" },
  { icon: Radio, label: "Full Dispatch Assistance" },
  { icon: Container, label: "Trailer Rental Support" },
  { icon: IdCard, label: "TWIC Card Assistance" },
  { icon: ShieldCheck, label: "Commercial Insurance Setup" },
  { icon: Landmark, label: "Factoring Fast-Track" },
];

const TERMS = [
  {
    icon: Check,
    title: "Payment & Activation Terms",
    body: "Fees for any optional add-on services are invoiced after the service has been confirmed. Digital confirmation receipts are issued upon processing.",
  },
  {
    icon: RotateCcw,
    title: "Cancellation Policy",
    body: `Either party may terminate this Agreement with written notice. Fees for add-on services not yet started by ${COMPANY.name} are refunded in full.`,
  },
  {
    icon: ShieldCheck,
    title: "Carrier Responsibilities & Independent Relationship",
    body: "The Carrier certifies valid authority (MC/DOT), active commercial cargo and auto insurance, and accurate driver qualification files. This Agreement constitutes an independent contractor relationship, with the Carrier maintaining sole responsibility for FMCSA safety compliance.",
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    body: `${COMPANY.name} is not liable for indirect income loss due to transit delays, shipper-directed appointments, market conditions, or broker cancellations. Both parties commit to professional communication and adherence to agreed schedules.`,
  },
];

const EMPTY_CARRIER: CarrierInfo = {
  carrierName: "",
  companyName: "",
  mcNumber: "",
  dotNumber: "",
  licenseNumber: "",
  truckNumber: "",
  phone: "",
  email: "",
};

const GOLD_STAR_API_URL = "https://transportbrokers.onrender.com";

function resolveApiBase(): string {
  const rawEnvUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
  // Guard against stale Vercel env overrides still pointing at the legacy backend
  if (!rawEnvUrl || rawEnvUrl.includes("chodulogistics.onrender.com")) {
    return GOLD_STAR_API_URL;
  }
  return rawEnvUrl;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatLong(iso: string) {
  if (!iso) return "";
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function CarrierSetupAgreement() {
  const [step, setStep] = useState<0 | 1>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [today, setToday] = useState("");
  const [carrier, setCarrier] = useState<CarrierInfo>(EMPTY_CARRIER);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>("Factoring");
  const [exec, setExec] = useState<ExecutionInfo>({ signature: "", printName: "", date: "", agreed: false });
  const spotRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = todayISO();
    setToday(t);
    setExec((e) => (e.date ? e : { ...e, date: t }));
    const move = (ev: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.left = `${ev.clientX}px`;
        spotRef.current.style.top = `${ev.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const docId = today ? `#${COMPANY.initials}-${today.replaceAll("-", "")}` : "";
  const todayLong = formatLong(today);

  const setC = (k: keyof CarrierInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarrier((c) => ({ ...c, [k]: e.target.value }));
  };
  const setE = (k: "signature" | "printName" | "date") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExec((x) => ({ ...x, [k]: e.target.value }));
  };

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Allow moving freely between steps regardless of whether fields are filled
  const goTo = (s: 0 | 1) => {
    setStep(s);
    scrollTop();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step === 0) {
      goTo(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const pdfBase64 = await generateAgreementPDF({
        carrier,
        addOns,
        payment,
        exec,
        docId,
      });

      const apiBase = resolveApiBase();

      const payload = {
        dispatchCompany: COMPANY.name,
        carrierFullName: carrier.carrierName,
        companyName: carrier.companyName,
        mcNumber: carrier.mcNumber,
        dotNumber: carrier.dotNumber,
        drivingLicense: carrier.licenseNumber,
        truckNumber: carrier.truckNumber,
        phone: carrier.phone,
        email: carrier.email,
        otherServices: {
          twicCard: addOns.includes("twic"),
          trailerRental: addOns.includes("trailer"),
          factoringSetup: addOns.includes("factoring"),
          insuranceAssistance: addOns.includes("insurance"),
        },
        paymentMethod: payment,
        signature: exec.signature,
        printName: exec.printName,
        date: exec.date,
        docId,
      };

      const res = await fetch(`${apiBase}/api/carrier-agreement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: payload, pdfBase64 }),
      });

      if (res.ok) {
        const json = await res.json().catch(() => ({}));
        setEmailSent(json.emailSent ?? true);
        setSubmitted(true);
        scrollTop();
      } else {
        const json = await res.json().catch(() => ({}));
        setSubmitError(json.error || `Server error (${res.status}). Please try again.`);
        setEmailSent(false);
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to connect to server. Please try again.");
      setEmailSent(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAddOn = (id: string) =>
    setAddOns((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <>
      <div className="noise-overlay" />
      <div ref={spotRef} className="spotlight hidden md:block" />
      <main ref={topRef} className="relative z-10 mx-auto max-w-5xl scroll-mt-6 px-4 py-8 sm:px-6 sm:py-12">
        {/* Top bar */}
        <div className="glass-card mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-2xl px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <BrandLogo size={42} dark showText={false} />
            <div className="min-w-0 flex flex-col">
              <span className="font-display text-sm font-bold uppercase leading-tight tracking-wider sm:text-base">
                {COMPANY.name}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                {COMPANY.tagline}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-foreground/80">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{todayLong}</span>
            </div>
            <div className="glass inline-flex items-center gap-2 rounded-full border-foreground/20 px-3.5 py-1.5 text-xs text-foreground/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span>Doc ID {docId}</span>
            </div>
            <a
              href={COMPANY.siteUrl}
              className="btn-3d inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/85"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Site
            </a>
          </div>
        </div>

        {/* Hero */}
        <div className="glass-card relative mb-8 overflow-hidden rounded-3xl p-7 text-center sm:p-12">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full border-foreground/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <FileSignature className="h-4 w-4" /> Official Carrier Onboarding
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Carrier Setup &amp; <span className="text-gradient">Freight Brokering Agreement</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Dedicated lane reservation, automated dispatch schedule, trailer rental program, and verified settlement integration with {COMPANY.name}.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-6 text-xs text-foreground/80 sm:text-sm md:grid-cols-4">
            {["Dedicated Lanes", "Transparent Settlements", "Direct Broker Dispatches", "24/7 Fleet Telematics"].map((t) => (
              <div key={t} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" /> <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {submitted ? (
          <SuccessCard carrier={carrier} exec={exec} payment={payment} addOns={addOns} docId={docId} emailSent={emailSent} />
        ) : (
          <>
            {/* Stepper */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                className="stepper-tab"
                data-state={step === 0 ? "active" : "completed"}
                onClick={() => goTo(0)}
              >
                <div className="stepper-num">01</div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phase One</span>
                  <span className="text-sm font-bold sm:text-base">Company &amp; Carrier Credentials</span>
                </div>
              </button>
              <button
                type="button"
                className="stepper-tab"
                data-state={step === 1 ? "active" : "idle"}
                onClick={() => goTo(1)}
              >
                <div className="stepper-num">02</div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phase Two</span>
                  <span className="text-sm font-bold sm:text-base">Services &amp; Legal Execution</span>
                </div>
              </button>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-10">
              <form onSubmit={onSubmit} noValidate>
                {step === 0 && (
                  <div className="form-step">
                    <SectionHeader
                      icon={Building2}
                      title="Company & Broker Information"
                      subtitle="Official operating authority and verified broker credentials."
                    />
                    <div className="glass-card mb-8 rounded-2xl border-foreground/15 p-5 sm:p-7">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        <ShieldAlert className="h-3.5 w-3.5" /> Authorized Freight Broker
                      </div>
                      <p className="mb-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
                        This Agreement is made and entered into on <strong className="text-foreground">{todayLong}</strong>, by and between:{" "}
                        <strong className="text-foreground">{COMPANY.name}</strong> (Broker / Service Provider) and the Carrier identified below.
                      </p>
                      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoTile icon={Building} label="Company Name">{COMPANY.name}</InfoTile>
                        <InfoTile icon={Hash} label="MC Number">{COMPANY.mcNumber}</InfoTile>
                        <InfoTile icon={Barcode} label="U.S. DOT Number">{COMPANY.dotNumber}</InfoTile>
                        <InfoTile icon={MapPin} label="Headquarters Address">
                          <span className="text-xs font-semibold sm:text-sm">{COMPANY.address}</span>
                        </InfoTile>
                        <InfoTile icon={Mail} label="Onboarding Email">
                          <a href={`mailto:${COMPANY.onboardingEmail}`} className="break-all text-xs font-semibold hover:underline sm:text-sm">
                            {COMPANY.onboardingEmail}
                          </a>
                        </InfoTile>
                        <InfoTile icon={Phone} label="Dispatch Phone">
                          <a href="tel:+19176723364" className="text-xs font-semibold hover:underline sm:text-sm">
                            {COMPANY.phone}
                          </a>
                        </InfoTile>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Check className="h-4 w-4 shrink-0 text-success" /> Licensed Property Broker • Continuous Public Protection Filings (49 CFR 387)
                        </span>
                        <span className="italic text-subtle">(Hereinafter referred to as {COMPANY.name})</span>
                      </div>
                    </div>

                    {/* FMCSA Certificate of Motor Carrier Authority */}
                    <FmcsaCertificateCard todayLong={todayLong} />

                    <SectionHeader
                      icon={UserCheck}
                      title="Carrier Credentials & Profile"
                      subtitle="Provide legal operating authority, driver license, and official contact information."
                    />
                    <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                      <Field id="carrierName" label="Carrier Full Name" icon={User} placeholder="e.g. John Doe" value={carrier.carrierName} onChange={setC("carrierName")} autoComplete="name" />
                      <Field id="companyName" label="Company Name (if applicable)" icon={Briefcase} placeholder="e.g. Apex Transport LLC" value={carrier.companyName} onChange={setC("companyName")} autoComplete="organization" />
                      <Field id="mcNumber" label="MC Number" icon={Hash} placeholder="e.g. 1143014" value={carrier.mcNumber} onChange={setC("mcNumber")} />
                      <Field id="dotNumber" label="DOT Number" icon={Barcode} placeholder="e.g. 3456789" inputMode="numeric" value={carrier.dotNumber} onChange={setC("dotNumber")} />
                      <Field id="licenseNumber" label="Driving License Number" icon={IdCard} placeholder="e.g. D1234567" value={carrier.licenseNumber} onChange={setC("licenseNumber")} />
                      <Field id="truckNumber" label="Truck / Unit # (Optional)" icon={Truck} placeholder="e.g. Unit 204" value={carrier.truckNumber} onChange={setC("truckNumber")} />
                      <Field id="phone" label="Phone Number" icon={Phone} type="tel" placeholder="e.g. (555) 123-4567" value={carrier.phone} onChange={setC("phone")} autoComplete="tel" />
                      <Field id="email" label="Email Address" icon={Mail} type="email" placeholder="e.g. dispatch@apex.com" value={carrier.email} onChange={setC("email")} autoComplete="email" />
                    </div>

                    <div className="flex justify-end border-t border-border pt-7">
                      <button
                        type="submit"
                        className="btn-3d inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/85"
                      >
                        Continue to Services <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="form-step">
                    <SectionHeader
                      icon={Layers}
                      title="Scope of Dedicated Services"
                      subtitle="This Agreement governs setup, logistics management, and carrier dispatch services."
                    />
                    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {SCOPE.map(({ icon: Icon, label }) => (
                        <div key={label} className="glass flex items-center gap-3.5 rounded-xl p-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/5">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-semibold leading-snug sm:text-sm">{label}</span>
                        </div>
                      ))}
                    </div>

                    <SectionHeader
                      icon={BadgeCheck}
                      title="Optional Add-On Services"
                      subtitle="Select optional setup assistance services for expedited clearance."
                    />
                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {ADD_ONS.map((a) => {
                        const on = addOns.includes(a.id);
                        return (
                          <button
                            key={a.id}
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            data-selected={on}
                            onClick={() => toggleAddOn(a.id)}
                            className="select-tile flex items-center justify-between gap-3"
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-3.5">
                              <div className="check-box">
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-sm font-bold leading-snug">{a.title}</span>
                                <span className="mt-0.5 block text-xs text-muted-foreground">{a.note}</span>
                              </div>
                            </div>
                            <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                              ${a.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mb-10 flex justify-end text-sm text-muted-foreground">
                      Selected add-ons total: <span className="ml-2 font-display font-bold text-foreground">${addOnsTotal(addOns)}</span>
                    </div>

                    <SectionHeader
                      icon={CreditCard}
                      title="Payment Method Selection"
                      subtitle="Select how you want to receive freight payments for completed loads."
                    />
                    <div role="radiogroup" aria-label="Payment method" className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {PAYMENT_METHODS.map((m) => {
                        const Icon = PAY_ICONS[m];
                        const on = payment === m;
                        return (
                          <button
                            key={m}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            data-selected={on}
                            onClick={() => setPayment(m)}
                            className="select-tile flex items-center gap-3.5"
                          >
                            <div className="pay-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-bold leading-snug">{m}</span>
                          </button>
                        );
                      })}
                    </div>

                    <SectionHeader
                      icon={FileText}
                      title="Agreement Terms & Conditions"
                      subtitle="Review carrier responsibilities, liability boundaries, and cancellation terms."
                    />
                    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {TERMS.map(({ icon: Icon, title, body }) => (
                        <div key={title} className="glass rounded-xl p-5 sm:p-6">
                          <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold">
                            <Icon className="h-4 w-4 shrink-0 text-success" /> <span>{title}</span>
                          </h4>
                          <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">{body}</p>
                        </div>
                      ))}
                    </div>

                    <SectionHeader
                      icon={PenLine}
                      title="Execution & Digital Signatures"
                      subtitle="Sign electronically to execute this Carrier Setup Agreement."
                    />
                    <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                      <Field id="signature" label="Authorized Signature" icon={FileSignature} placeholder="Type your signature" value={exec.signature} onChange={setE("signature")} inputClassName="signature-field" />
                      <Field id="printName" label="Print Legal Name" icon={User} placeholder="Full legal name" value={exec.printName} onChange={setE("printName")} />
                      <Field id="date" label="Execution Date" icon={Calendar} type="date" value={exec.date} onChange={setE("date")} />
                    </div>
                    <label className="glass flex cursor-pointer items-start gap-3.5 rounded-xl p-4 text-sm leading-relaxed text-foreground/85">
                      <input
                        type="checkbox"
                        checked={exec.agreed}
                        onChange={(ev) => setExec((x) => ({ ...x, agreed: ev.target.checked }))}
                        className="mt-1 h-4 w-4 shrink-0 accent-primary"
                      />
                      <span>
                        I have read and agree to the terms of this Carrier Setup &amp; Freight Brokering Agreement with {COMPANY.name}.
                      </span>
                    </label>
                    {submitError && <p className="mt-3 text-xs text-destructive">{submitError}</p>}

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => goTo(0)}
                        className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold hover:border-foreground/30 disabled:opacity-50"
                      >
                        <ArrowLeft className="h-4 w-4" /> Previous Step
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-3d inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Submitting Agreement...
                          </>
                        ) : (
                          <>
                            Execute &amp; Submit Agreement <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        <footer className="mt-10 border-t border-border pt-6 text-center text-xs leading-relaxed text-subtle">
          <p>
            <strong className="text-muted-foreground">{COMPANY.name}</strong> • {COMPANY.address} • {COMPANY.phone} • {COMPANY.onboardingEmail}
          </p>
          <p className="mt-1.5">
            © {today.slice(0, 4)} {COMPANY.name}. All rights reserved. Licensed Property Broker • {COMPANY.mcNumber} • U.S. DOT {COMPANY.dotNumber}
          </p>
        </footer>
      </main>
    </>
  );
}

function SuccessCard({
  carrier,
  exec,
  payment,
  addOns,
  docId,
  emailSent,
}: {
  carrier: CarrierInfo;
  exec: ExecutionInfo;
  payment: PaymentMethod;
  addOns: string[];
  docId: string;
  emailSent: boolean;
}) {
  const chosen = ADD_ONS.filter((a) => addOns.includes(a.id));
  return (
    <div className="glass-card form-step rounded-3xl p-8 text-center sm:p-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-8 w-8" strokeWidth={3} />
      </div>
      <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Agreement Executed</h2>
      <p className="mx-auto mb-3 max-w-lg text-sm text-muted-foreground">
        Thank you{carrier.carrierName ? `, ${carrier.carrierName}` : ""}. Your agreement {docId} has been received by {COMPANY.name}.
        {carrier.email ? ` Our onboarding team will contact you at ${carrier.email}.` : ""}
      </p>
      {emailSent && (
        <p className="mb-8 text-xs font-medium text-success">
          ✓ Signed PDF confirmation emailed to {carrier.email ? `${carrier.email} and ` : ""}
          {COMPANY.onboardingEmail}.
        </p>
      )}
      {!emailSent && <div className="mb-6" />}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
        <InfoTile icon={Hash} label="MC / DOT">
          {carrier.mcNumber || "—"} / {carrier.dotNumber || "—"}
        </InfoTile>
        <InfoTile icon={CreditCard} label="Payment Method">
          {payment}
        </InfoTile>
        <InfoTile icon={BadgeCheck} label="Add-On Services">
          {chosen.length ? chosen.map((c) => c.title).join(", ") : "None"}
        </InfoTile>
        <InfoTile icon={FileSignature} label="Signed By">
          {exec.printName || carrier.carrierName || "Carrier"} • {formatLong(exec.date) || "Today"}
        </InfoTile>
      </div>
    </div>
  );
}
