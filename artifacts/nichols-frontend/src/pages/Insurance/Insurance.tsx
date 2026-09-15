import { Link } from 'wouter'
import { ShieldCheck, ArrowUpRight, FileCheck } from 'lucide-react'

export function Insurance() {
  const requirements = [
    {
      title: 'Auto Liability',
      amount: '$1,000,000',
      description: 'Mandatory primary liability coverage required for all commercial power units operating interstate under TBI dispatch.',
    },
    {
      title: 'Motor Truck Cargo',
      amount: '$100,000 – $250,000',
      description: 'Comprehensive cargo protection covering dry van, reefer temperature variation, and secured flatbed shipments against transit loss or damage.',
    },
    {
      title: 'Physical Damage',
      amount: 'Stated Value',
      description: 'Collision and comprehensive coverage protecting tractor and trailer assets against road hazards, weather events, and vandalism.',
    },
    {
      title: 'Trailer Interchange',
      amount: '$25,000 – $50,000',
      description: 'Required when operating TBI rental trailers or third-party shipper pool equipment to cover interchange liability.',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Certificate Submission',
      desc: 'Submit your Acord 25 Certificate of Insurance (COI) listing Transport Brokers Inc. as certificate holder.',
    },
    {
      step: '02',
      title: 'Automated Broker Verification',
      desc: 'Our compliance desk connects with your underwriting agent to confirm active policy status, expiration dates, and exclusion riders.',
    },
    {
      step: '03',
      title: 'Shipper Packet Endorsement',
      desc: 'We immediately file endorsed certificates with contracted industrial shippers, clearing your power unit for immediate loading.',
    },
    {
      step: '04',
      title: 'Continuous Renewal Tracking',
      desc: 'Automated 30-day renewal alerts prevent unexpected dispatch holds or cancellation gaps on your active carrier file.',
    },
  ]

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO - LIGHT THEME */}
      <section className="relative pt-32 pb-20 border-b border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest px-3.5 py-1 rounded-full bg-lime-100 border border-lime-300 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Risk Management & Insurance</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Commercial Cargo & Liability Insurance.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
              Transport Brokers Inc. enforces rigorous insurance compliance to protect our shippers and empower our carriers with access to high-value contracted freight.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REQUIREMENTS - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <div className="text-xs font-mono uppercase text-lime-700 tracking-widest font-bold">
              Carrier Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">
              Insurance Threshold Requirements
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              All active carriers in the TBI dispatch network must maintain current certificates meeting or exceeding these minimums:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm space-y-4 hover:border-lime-500/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-gray-500 tracking-wider font-semibold">
                    Requirement 0{i + 1}
                  </span>
                  <span className="text-xl font-mono font-black text-lime-700">
                    {req.amount}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 uppercase">
                  {req.title}
                </h3>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {req.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VERIFICATION PROCESS - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-mono uppercase text-lime-700 tracking-widest font-bold">
              Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-900 tracking-tight">
              How We Verify & Endorse Policies
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              Fast, automated insurance verification that keeps your trucks moving without bureaucratic downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm space-y-3 relative"
              >
                <div className="text-3xl font-mono font-black text-lime-600">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CARRIER INSURANCE ASSISTANCE WITH REAL PHOTOGRAPHY - LIGHT THEME */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-md grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden relative">
              <img
                src="/images/services/loading-dock-2.jpg"
                alt="Freight cargo insurance inspection and dock safety"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/20 lg:to-gray-50" />
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest font-semibold">
                  <FileCheck className="h-4 w-4" />
                  <span>Need Better Rates?</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">
                  Insurance Advisory & Partner Network
                </h3>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  Struggling with high down-payments or renewal spikes? Through our network of licensed transportation insurance brokers, we help independent owner-operators access competitive fleet-rated policies with flexible monthly financing.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?service=Insurance%20Assistance"
                  className="px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-sm"
                >
                  <span>Request Insurance Review</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 text-lime-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA - LIGHT THEME */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Have Questions on Policy Endorsements?
          </h2>
          <p className="text-base text-gray-600 font-normal max-w-xl mx-auto leading-relaxed">
            Contact our compliance desk directly for certificate holder information or broker packet submissions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-md"
            >
              <span>Contact Compliance Desk</span>
              <ArrowUpRight className="ml-2 h-4 w-4 text-lime-400" />
            </Link>
            <a
              href="mailto:billing@TBItransportation.com"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm uppercase tracking-wider transition-all border border-gray-300 shadow-sm inline-flex items-center justify-center"
            >
              <span>Email: billing@TBItransportation.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
