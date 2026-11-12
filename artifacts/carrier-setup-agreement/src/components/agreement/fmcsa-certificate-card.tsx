import { COMPANY } from "@/lib/company";

/**
 * Dark-glass FMCSA Certificate of Motor Carrier Authority card displaying
 * GOLD STAR TRANSPORTATION, INC.'s operating authority and DOT emblem.
 */
export function FmcsaCertificateCard({ todayLong }: { todayLong: string }) {
  return (
    <div className="glass-card mb-10 rounded-2xl border border-foreground/15 p-5 sm:p-7">
      {/* Header: U.S. DOT Emblem & Service Date */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/[0.04]">
            {/* U.S. DOT Tri-Swirl Emblem */}
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="29" fill="#0B3D91" />
              <path
                d="M32 10C41.5 10 49.5 16.2 52.3 24.8C44.8 20.5 36.2 21.6 31.2 28.4C29.4 20.8 24.2 14.5 16.8 11.9C21.2 10.6 26.5 10 32 10Z"
                fill="#FFFFFF"
              />
              <path
                d="M52.8 39.2C48.1 47.4 39.3 52.8 29.4 52.4C35.8 47.6 38.6 39.3 35.1 31.8C42.4 33.9 50.1 32.3 55.6 26.9C55.9 31.2 54.9 35.5 52.8 39.2Z"
                fill="#FFFFFF"
              />
              <path
                d="M15.1 45.7C9.6 38.2 8.7 28 13.4 19.6C14.7 27.6 20.3 34 28.4 35C22.9 40.3 20.4 47.8 22.3 54.8C19.4 52.5 17 49.4 15.1 45.7Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:text-base">
              U.S. Department of Transportation
            </h3>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">
              Federal Motor Carrier Safety Administration
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
            Service Date: {COMPANY.serviceDate}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            1200 New Jersey Ave., S.E., Washington, DC 20590
          </p>
        </div>
      </div>

      {/* Authority Highlight Box */}
      <div className="my-6 rounded-xl border border-foreground/12 bg-foreground/[0.03] px-5 py-6 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
          Certificate of Motor Carrier Authority
        </p>
        <p className="font-display text-lg font-bold tracking-tight text-foreground sm:text-2xl">
          {COMPANY.mcDisplay} • U.S. DOT No. {COMPANY.dotNumber}
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
          {COMPANY.name} • {COMPANY.address}
        </p>
      </div>

      {/* Legal Statement */}
      <p className="mb-6 text-xs leading-relaxed text-foreground/80 sm:text-sm">
        This License is evidence of the applicant&apos;s authority to engage in operations, in interstate or foreign
        commerce, as a broker, arranging for transportation of freight (except household goods) by Motor Vehicle. This
        authority remains effective subject to continuous public protection filings (49 CFR 387) and process agent
        designations (49 CFR 366).
      </p>

      {/* Signatures Footer */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-5">
        <div>
          <div className="mb-2.5 inline-flex h-12 items-center justify-center rounded-md bg-white px-4 shadow-sm">
            {/* Official Signature Vector */}
            <svg width="118" height="30" viewBox="0 0 180 46" fill="none" aria-label="Jeffrey L. Secrist Signature">
              <path
                d="M12 31C18 18 25 8 28 8C30 8 24 27 21 37C19 42 14 43 13 38C12 32 23 23 32 20C36 18 35 28 38 28C41 28 45 16 49 16C52 16 48 31 46 37C45 41 49 24 55 21C58 19 57 28 60 27C64 26 67 20 71 21C74 22 71 33 70 38M65 25C71 23 78 21 84 20M95 11C94 17 91 27 91 31C91 33 96 31 101 29M114 14C108 18 106 23 111 25C116 27 119 31 113 33C109 34 106 32 108 29C113 24 121 20 126 20C128 20 126 28 130 27C134 26 138 19 141 19C143 19 141 27 145 27C148 27 151 21 154 21C157 21 156 28 160 26C163 25 166 13 168 9C167 15 164 25 165 30M158 19C164 18 170 17 175 17"
                stroke="#111827"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-xs font-bold text-foreground sm:text-sm">Jeffrey L. Secrist, Chief</p>
          <p className="text-[11px] text-muted-foreground">Information Technology Operations Division</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs font-bold text-foreground sm:text-sm">Verified Broker Representative</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {COMPANY.name} • {todayLong || COMPANY.serviceDate}
          </p>
        </div>
      </div>
    </div>
  );
}
