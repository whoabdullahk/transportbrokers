import { Link } from 'wouter'
import { Truck, ShieldCheck, ArrowUpRight, CheckCircle2, FileText, Key, DollarSign } from 'lucide-react'

export function CarrierServices() {
  const services = [
    {
      id: 'dedicated-freight-lanes',
      title: 'Dedicated Freight Lanes',
      tag: 'CONTRACT CARRIER',
      icon: <Truck className="h-6 w-6 text-lime-400" />,
      description:
        'Secure steady, recurring revenue with contracted dedicated freight lanes across premier American industrial corridors. We partner with vetted enterprise shippers to provide predictable schedules, minimal deadhead miles, and contracted rate-per-mile guarantees.',
      specs: [
        'Equipment: 53’ Dry Van, Refrigerated, Flatbed',
        'Corridors: Southeast, Midwest, Texas Triangle, Mid-Atlantic',
        'Volume: 3–7 loads per week per power unit',
        'Direct billing & automated rate confirmations',
      ],
    },
    {
      id: 'trailer-rental-program',
      title: 'Trailer Rental Program',
      tag: 'EQUIPMENT SOLUTIONS',
      icon: <Truck className="h-6 w-6 text-lime-400" />,
      description:
        'Expand your hauling capability without the burden of long-term equipment debt. Our trailer rental program provides late-model 53-foot air-ride dry vans and refrigerated units ready for immediate hook and haul.',
      specs: [
        'Available Units: 53ft Air-Ride Dry Vans, Late-Model Reefers',
        'Maintenance: Preventative maintenance & tire wear support',
        'Lease Terms: Daily, weekly, monthly, and seasonal contracts',
        'Rapid pick-up from strategic logistics yards',
      ],
    },
    {
      id: 'twic-card-assistance',
      title: 'TWIC Card Assistance',
      tag: 'CREDENTIALING',
      icon: <Key className="h-6 w-6 text-lime-400" />,
      description:
        'Access maritime terminals, coastal ports, petrochemical facilities, and secure federal installations. Our compliance team guides drivers through the Transportation Worker Identification Credential (TWIC) application, biometric appointments, and renewal protocols.',
      specs: [
        'Coverage: All US deepwater ports & intermodal railheads',
        'Assistance: Documentation audit & enrollment scheduling',
        'Turnaround: Expedited background check advisory',
        'Unlocks high-paying maritime & hazardous container freight',
      ],
    },
    {
      id: 'insurance-assistance',
      title: 'Insurance Assistance',
      tag: 'RISK MANAGEMENT',
      icon: <ShieldCheck className="h-6 w-6 text-lime-400" />,
      description:
        'Ensure continuous compliance with shipper minimums. We connect carriers with premier commercial insurance providers for primary auto liability ($1M), physical damage, cargo insurance ($100k-$500k), and general liability policies.',
      specs: [
        'Coverage: $1,000,000 Auto Liability / $100,000+ Cargo',
        'Turnaround: 24-hour certificate generation & policy review',
        'Brokers: A-rated commercial transportation underwriters',
        'Assistance: Shipper insurance certificate submission',
      ],
    },
    {
      id: 'factoring-registration',
      title: 'Factoring Registration',
      tag: 'CASH FLOW',
      icon: <DollarSign className="h-6 w-6 text-lime-400" />,
      description:
        'Accelerate your cash flow with non-recourse invoice factoring programs. Turn completed freight bills into liquid operating capital within 24 hours without waiting 30–60 days for shipper payment.',
      specs: [
        'Advance Rate: Up to 97% advance within 24 hours of POD',
        'Recourse: Non-recourse credit protection options',
        'Rates: Competitive low-percentage flat factoring fees',
        'Fuel Advances: Integrated fuel card discounts & cash advances',
      ],
    },
    {
      id: 'specialized-permit-loads',
      title: 'Specialized Permit Loads',
      tag: 'HEAVY HAUL',
      icon: <FileText className="h-6 w-6 text-lime-400" />,
      description:
        'Coordinate complex oversize, overweight, superload, and specialized cargo transport across state lines. We engineer multi-state route approvals, bridge clearances, curfew compliance, and certified pilot car escort teams.',
      specs: [
        'Configurations: Stepdeck, RGN, Lowboy, Double Drop',
        'Surveys: State DOT bridge analysis & height clearances',
        'Escorts: Certified civilian & law enforcement pilot coordination',
        'Full routing legal compliance documentation',
      ],
    },
    {
      id: 'permit-application-support',
      title: 'Permit Application Support',
      tag: 'PERMIT DESK',
      icon: <FileText className="h-6 w-6 text-lime-400" />,
      description:
        'Eliminate transit delays caused by state permitting bureaucracy. Our dedicated permit specialists prepare and submit temporary trip permits, fuel (IFTA) trip permits, and annual state oversize operating authorities.',
      specs: [
        'Permit Types: Single-trip, multi-trip, annual blanket permits',
        'States: All 48 continental states & Canadian provinces',
        'Processing: Direct state DOT electronic submission',
        'Emergency expedited turnaround available 24/7',
      ],
    },
    {
      id: 'dot-compliance-support',
      title: 'DOT Compliance Support',
      tag: 'SAFETY & AUDIT',
      icon: <ShieldCheck className="h-6 w-6 text-lime-400" />,
      description:
        'Protect your operating authority and maintain clean CSA safety scores. We provide comprehensive safety consulting including Driver Qualification (DQ) file management, ELD logbook audits, drug and alcohol clearinghouse registration, and mock DOT audits.',
      specs: [
        'Audits: FMCSA New Entrant & comprehensive safety audits',
        'Files: Driver qualification (DQ) file maintenance',
        'Monitoring: Real-time CSA BASIC score tracking',
        'Consortium: DOT drug & alcohol clearinghouse management',
      ],
    },
  ]

  const serviceImages: Record<string, string> = {
    'dedicated-freight-lanes': '/images/services/white-truck.jpg',
    'trailer-rental-program': '/images/services/loading-dock.jpg',
    'twic-card-assistance': '/images/hero/container-yard-aerial.jpg',
    'insurance-assistance': '/images/services/loading-dock-2.jpg',
    'factoring-registration': '/images/services/fleet-warehouse.jpg',
    'specialized-permit-loads': '/images/services/mountain-highway-truck.jpg',
    'permit-application-support': '/images/services/hero-highway-sunset.jpg',
    'dot-compliance-support': '/images/services/driver-cab.jpg',
  }

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO - LIGHT THEME */}
      <section className="relative pt-32 pb-20 border-b border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest px-3.5 py-1 rounded-full bg-lime-100 border border-lime-300 font-semibold">
              <Truck className="h-4 w-4" />
              <span>Fleet & Carrier Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Comprehensive Carrier Services.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
              From dedicated contract lanes and trailer rentals to TWIC credentials, cargo insurance, and DOT compliance, Transport Brokers Inc. equips carriers with the operational backbone needed to maximize earnings.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID WITH REAL PHOTOGRAPHY - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-lime-500/60 transition-all flex flex-col justify-between overflow-hidden group scroll-mt-28"
              >
                {/* Photo header for each service */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={serviceImages[svc.id] || '/images/services/white-truck.jpg'}
                    alt={svc.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full border border-gray-200 text-[11px] font-mono font-bold text-gray-900 uppercase tracking-widest">
                    {svc.tag}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-lime-700 transition-colors uppercase">
                      {svc.title}
                    </h2>

                    <p className="text-sm text-gray-600 font-normal leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="pt-4 space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                        Operational Specifications:
                      </div>
                      <ul className="space-y-2">
                        {svc.specs.map((spec, i) => (
                          <li key={i} className="flex items-start text-xs text-gray-600 font-medium">
                            <CheckCircle2 className="h-4 w-4 text-lime-600 mr-2 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/contact?service=${encodeURIComponent(svc.title)}`}
                      className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-gray-900 hover:text-lime-700 font-bold"
                    >
                      <span>Inquire About Service</span>
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 text-lime-600" />
                    </Link>

                    <a
                      href="tel:4435600311"
                      className="text-xs font-mono text-gray-500 hover:text-black font-medium transition-colors"
                    >
                      Call: (443) 560-0311
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BOTTOM CTA - LIGHT THEME */}
      <section className="py-20 bg-gray-50 text-center border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Ready to Onboard Your Equipment?
          </h2>
          <p className="text-base text-gray-600 font-normal max-w-xl mx-auto leading-relaxed">
            Our onboarding team will review your authority, equipment, and insurance certificates to get you rolling on dedicated freight within 24 hours.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-md"
            >
              <span>Submit Carrier Application</span>
              <ArrowUpRight className="ml-2 h-4 w-4 text-lime-400" />
            </Link>
            <a
              href="tel:4435600311"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm uppercase tracking-wider transition-all border border-gray-300 shadow-sm inline-flex items-center justify-center"
            >
              <span>Speak to Carrier Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
