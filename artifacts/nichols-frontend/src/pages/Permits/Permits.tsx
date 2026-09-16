import { Link } from 'wouter'
import { FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react'

export function Permits() {
  const permitTypes = [
    {
      title: 'Oversize & Overweight Permits',
      tag: 'HEAVY HAUL',
      desc: 'Single-trip and annual routing permits for dimensional freight exceeding standard 80,000 lbs gross weight, 102" width, or 13\'6" height. We secure approved route corridors, curfews, and bridge formulas.',
      specs: ['State DOT electronic filings', 'Bridge engineering reviews', 'Curfew & weekend restrictions advisory', 'Pilot car & escort requirements'],
    },
    {
      title: 'TWIC Card Port Credentials',
      tag: 'MARITIME SECURITY',
      desc: 'Transportation Worker Identification Credential assistance for owner-operators needing unescorted access to MTSA-regulated marine terminals, maritime ports, railheads, and chemical facilities.',
      specs: ['Application pre-screening & document audit', 'TSA enrollment appointment coordination', 'Card activation and port authority linkage', 'Renewal tracking and expedited replacement'],
    },
    {
      title: 'Temporary Fuel & Trip Permits',
      tag: 'INTERSTATE CLEARANCE',
      desc: 'Immediate emergency trip and fuel (IFTA) permits for trucks entering states without active base apportioned plates (IRP) or fuel tax credentials, preventing impounds and roadside fines.',
      specs: ['24/7 immediate turnaround', 'All 48 continental states', 'Electronic delivery to cab', 'Temporary 72-hour operating authorities'],
    },
    {
      title: 'DOT Safety Audit Compliance',
      tag: 'REGULATORY COMPLIANCE',
      desc: 'End-to-end guidance for FMCSA New Entrant Safety Audits and targeted compliance reviews. We organize driver qualification files, ELD records, vehicle maintenance logs, and clearinghouse testing.',
      specs: ['Driver Qualification (DQ) file audits', 'ELD logbook and HOS compliance reviews', 'Drug & Alcohol Clearinghouse enrollment', 'Corrective Action Plan (CAP) formulation'],
    },
  ]

  const workflow = [
    {
      step: '01',
      title: 'Route & Load Audit',
      desc: 'We review your exact axle weights, dimensional drawings, origin, destination, and equipment configuration.',
    },
    {
      step: '02',
      title: 'Agency Filings',
      desc: 'Our specialists submit electronic applications directly through state DOT permitting portals and port security offices.',
    },
    {
      step: '03',
      title: 'Clearance Issuance',
      desc: 'State-issued routing approvals, permit documents, and required provisions are delivered directly to the driver’s cab.',
    },
    {
      step: '04',
      title: 'Escort Coordination',
      desc: 'If mandated, certified civilian pilot vehicles and law enforcement escorts are synchronized with your transit schedule.',
    },
  ]

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO - LIGHT THEME */}
      <section className="relative pt-32 pb-20 border-b border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest px-3.5 py-1 rounded-full bg-lime-100 border border-lime-300 font-semibold">
              <FileText className="h-4 w-4" />
              <span>Regulatory Filings & Credentials</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Permits, Credentials & DOT Compliance.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
              Navigate interstate regulations with confidence. Transport Brokers Inc. coordinates heavy-haul permits, TWIC maritime credentials, and FMCSA safety audits to keep your fleet legal and rolling.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE PERMIT CAPABILITIES WITH REAL COMPLIANCE & PORT PHOTOGRAPHY - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase text-lime-700 tracking-widest font-bold">
                Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">
                Specialized Permitting & Credentialing
              </h2>
              <p className="text-base text-gray-600 font-normal leading-relaxed">
                We eliminate bureaucratic delays with fast, direct state DOT coordination, TWIC biometric clearances, and multi-state heavy-haul route engineering.
              </p>
            </div>

            {/* Regulatory & Port Compliance Image Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative group">
                <img
                  src="/images/hero/container-yard-aerial.jpg"
                  alt="TWIC card maritime terminal port facility and container yard"
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-mono text-lime-400 uppercase tracking-wider font-bold">Port & Terminal Authority</p>
                    <p className="text-sm font-bold">TWIC Verified Access for Deepwater Ports & Rail Terminals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {permitTypes.map((p, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:border-lime-500/60 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-lime-700 uppercase tracking-widest font-bold">
                    {p.tag}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-semibold">
                    PERMIT 0{i + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-lime-700 transition-colors uppercase">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {p.desc}
                </p>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="text-xs font-mono text-gray-700 uppercase tracking-wider font-bold">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {p.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-600 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-lime-600 mr-2 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. APPLICATION WORKFLOW - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-mono uppercase text-lime-700 tracking-widest font-bold">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 tracking-tight">
              Permit Acquisition Workflow
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              How our permit desk secures legal clearances quickly and accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((w, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm space-y-3"
              >
                <div className="text-3xl font-mono font-black text-lime-600">
                  {w.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  {w.title}
                </h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA - LIGHT THEME */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Need Expedited Permits or TWIC Support?
          </h2>
          <p className="text-base text-gray-600 font-normal max-w-xl mx-auto leading-relaxed">
            Submit your route specifications or credential inquiry to our compliance desk for immediate assistance.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=Permit%20Application%20Support"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-md"
            >
              <span>Submit Permit Request</span>
              <ArrowUpRight className="ml-2 h-4 w-4 text-lime-400" />
            </Link>
            <a
              href="tel:3307567732"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm uppercase tracking-wider transition-all border border-gray-300 shadow-sm inline-flex items-center justify-center"
            >
              <span>Call Permit Desk: 330-756-7732</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
