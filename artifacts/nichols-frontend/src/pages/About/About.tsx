import { Link } from 'wouter'
import { ShieldCheck, Award, ArrowUpRight, Building2, MapPin } from 'lucide-react'
import { FAQSection } from '../../components/sections/FAQSection'

export function About() {
  const stats = [
    { value: '500+', label: 'Independent Carriers Supported' },
    { value: '10K+', label: 'Loads Dispatched Across 48 States' },
    { value: '97.4%', label: 'On-Time Delivery Performance' },
    { value: '24/7', label: 'Dedicated Logistics Operations' },
  ]

  const values = [
    {
      title: 'Carrier-First Philosophy',
      desc: 'We treat independent owner-operators as business partners, providing honest load boards, transparent rate confirmations, and zero predatory broker deductions.',
    },
    {
      title: 'Operational Precision',
      desc: 'Our Alexandria logistics center monitors lanes 24/7 to provide instant check calls, proactive weather routing, and zero-delay detention resolutions.',
    },
    {
      title: 'Absolute Compliance',
      desc: 'Strict adherence to FMCSA guidelines, comprehensive active cargo verification ($1,000,000 policy), and rigorous safety ratings keep our entire network protected.',
    },
    {
      title: 'Direct Shipper Contracts',
      desc: 'We cultivate lasting enterprise shipper agreements, bypassing intermediary load boards to deliver higher rate-per-mile earnings directly to our haulers.',
    },
  ]

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO SECTION - LIGHT THEME */}
      <section className="relative pt-32 pb-20 border-b border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest px-3.5 py-1 rounded-full bg-lime-100 border border-lime-300 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>About Transport Brokers Inc.</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Moving American Freight With Precision & Integrity.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
              Founded in Alexandria, Louisiana, Transport Brokers Inc. has grown into a premier freight coordination and carrier support firm connecting shippers with verified transportation assets across the continental United States.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR - LIGHT THEME */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((s, i) => (
              <div key={i} className={`${i !== 0 ? 'md:pl-8' : ''} pt-4 sm:pt-0`}>
                <div className="text-4xl sm:text-5xl font-black font-mono text-gray-900">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-lime-700 font-bold uppercase tracking-wide mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPANY STORY & MISSION - LIGHT THEME WITH REAL PHOTOGRAPHY */}
      <section className="py-20 lg:py-28 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest font-semibold">
                <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">
                Built from the Ground Up for Modern Transportation
              </h2>
              <div className="space-y-4 text-gray-600 font-normal leading-relaxed text-sm sm:text-base">
                <p>
                  Transport Brokers Inc. was established with a singular objective: to eliminate the friction, opacity, and predatory practices that plague modern freight dispatching.
                </p>
                <p>
                  Operating under federal authority <strong className="text-gray-900">USDOT 2212598</strong> and <strong className="text-gray-900">MC-172356</strong>, our operations headquarters in Alexandria, Louisiana coordinates heavy commercial freight across all 48 continental states.
                </p>
                <p>
                  Whether managing dedicated high-volume shipper lanes, providing trailer rental assets to growing fleets, or assisting owner-operators with TWIC credentials and insurance verification, we deliver end-to-end operational dependability.
                </p>
              </div>

              <div className="pt-4 flex items-center space-x-6 text-xs font-mono text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-lime-600" />
                  <span>BUFFALO, NY 14220</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-lime-600" />
                  <span>Licensed Motor Broker</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative">
                <img
                  src="/images/services/white-truck.jpg"
                  alt="Transport Brokers Inc. fleet logistics"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200">
                  <div className="text-xs font-mono text-lime-700 uppercase tracking-wider font-bold">
                    Operational Credibility
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-1">
                    Continuous 48-State Interstate Freight Authority • USDOT 2212598
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES - LIGHT THEME */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-700 uppercase tracking-widest font-semibold">
              <Award className="h-4 w-4" />
              <span>Core Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">
              The Standards That Guide Every Dispatch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-gray-50 border border-gray-200 shadow-sm space-y-3 hover:border-lime-500/50 hover:shadow-md transition-all"
              >
                <div className="text-xs font-mono text-lime-700 uppercase tracking-widest font-bold">
                  Principle 0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 uppercase">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* 6. CONVERSION CTA WITH TEAM/OFFICE PHOTO & LIGHT ACCENT BLOCK */}
      <section className="py-20 bg-lime-50/60 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="/images/services/driver-cab.jpg"
                  alt="Transport Brokers Inc. professional dispatch operations and fleet driver"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-800 uppercase tracking-widest px-3 py-1 rounded-full bg-lime-200/80 border border-lime-300 font-semibold">
                <span>Dedicated Operations Desk</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight">
                Partner With TBI Today
              </h2>
              <p className="text-base text-gray-600 font-normal max-w-xl leading-relaxed">
                Experience the difference of working with a dispatch and logistics partner dedicated to your bottom-line profitability and long-term fleet growth.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-md"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 text-lime-400" />
                </Link>
                <Link
                  href="/carrier-services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm uppercase tracking-wider transition-all border border-gray-300 shadow-sm inline-flex items-center justify-center"
                >
                  <span>Explore Carrier Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
