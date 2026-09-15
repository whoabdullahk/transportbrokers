import { useState } from 'react'
import { Link } from 'wouter'
import { 
  ArrowRight, 
  ArrowDown, 
  Plus, 
  Minus
} from 'lucide-react'

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // 8 Cards for the signature 2x4 alternating grid from Nichols screenshot 3
  const solutionCards = [
    {
      title: 'Dedicated Freight Lanes',
      desc: 'Consistent freight opportunities with reliable lanes and competitive rates designed to maximize utilization and revenue.',
      bg: 'bg-[#bef264]',
      textColor: 'text-black',
      descColor: 'text-black/80',
      type: 'ellipses',
      href: '/carrier-services#dedicated-freight-lanes',
    },
    {
      title: 'Trailer Rental Program',
      desc: 'Flexibility with dry van, reefer, flatbed, and specialized trailer rental solutions for both short-term and long-term operations.',
      bg: 'bg-[#f4f2ee]',
      textColor: 'text-black',
      descColor: 'text-black/70',
      type: 'cones',
      href: '/carrier-services#trailer-rental-program',
    },
    {
      title: 'TWIC Card Assistance',
      desc: 'Professional guidance throughout the TWIC application process with expedited support for port access compliance.',
      bg: 'bg-[#1c1c1e]',
      textColor: 'text-white',
      descColor: 'text-white/70',
      type: 'lines',
      href: '/carrier-services#twic-card-assistance',
    },
    {
      title: 'Insurance Assistance',
      desc: 'Helping carriers obtain affordable cargo, liability, and commercial trucking insurance through trusted providers.',
      bg: 'bg-[#f4f2ee]',
      textColor: 'text-black',
      descColor: 'text-black/70',
      type: 'dots',
      href: '/insurance',
    },
    {
      title: 'Factoring Registration',
      desc: 'Fast invoice factoring solutions that improve cash flow and ensure quicker payments after load completion.',
      bg: 'bg-[#1c1c1e]',
      textColor: 'text-white',
      descColor: 'text-white/70',
      type: 'ellipses',
      href: '/carrier-services#factoring-registration',
    },
    {
      title: 'Specialized Permit Loads',
      desc: 'Access premium freight opportunities requiring specialized permits, including oversized and overweight transportation.',
      bg: 'bg-[#bef264]',
      textColor: 'text-black',
      descColor: 'text-black/80',
      type: 'cones',
      href: '/permits',
    },
    {
      title: 'Permit Application Support',
      desc: 'Complete assistance with transportation permits, operating authority documentation, and regulatory filings.',
      bg: 'bg-[#f4f2ee]',
      textColor: 'text-black',
      descColor: 'text-black/70',
      type: 'lines',
      href: '/permits',
    },
    {
      title: 'DOT Compliance Support',
      desc: 'Helping carriers remain compliant with FMCSA regulations, DOT requirements, permits, and industry standards.',
      bg: 'bg-[#1c1c1e]',
      textColor: 'text-white',
      descColor: 'text-white/70',
      type: 'dots',
      href: '/carrier-services#dot-compliance-support',
    },
  ]

  const faqs = [
    {
      q: 'What services does Transport Brokers Inc. provide?',
      a: 'Transport Brokers Inc. provides full-suite commercial freight brokerage, dedicated lane capacity, trailer rentals (dry van, reefer, flatbed), expedited invoice factoring assistance, TWIC maritime card compliance, and federal DOT/FMCSA permit filings.',
    },
    {
      q: 'Who can work with Transport Brokers Inc.?',
      a: 'We partner with verified commercial motor carriers, independent owner-operators, and fleet managers holding active FMCSA operating authority, satisfactory safety ratings, and minimum $100K cargo / $1M liability insurance.',
    },
    {
      q: 'Can you help with TWIC and permit applications?',
      a: 'Yes. Our dedicated compliance desk assists carriers with TWIC enrollment appointments, TSA background clearances, port entry credentialing, and multi-state oversize/overweight transit permits.',
    },
    {
      q: 'How does factoring registration help my business?',
      a: 'Factoring converts completed load delivery receipts into immediate cash within 2 to 24 hours, eliminating 30-to-60-day broker payment delays and empowering carriers to cover fuel, maintenance, and payroll without high interest loans.',
    },
    {
      q: 'How do I get started with Transport Brokers Inc.?',
      a: 'Getting onboarded is straightforward: submit your MC/DOT certificate, current certificate of insurance (COI) naming Transport Brokers Inc. as certificate holder, and signed W-9. Our carrier relations desk reviews packets within 2 business hours.',
    },
  ]

  return (
    <div className="bg-white text-gray-900 selection:bg-[#bef264] selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Matches Screenshot 1) */}
      {/* ========================================================================= */}
      <section 
        aria-label="Hero Section"
        className="relative min-h-screen flex items-center justify-between bg-black text-white overflow-hidden pb-10"
      >
        {/* Full-width background photo of semi-truck on desert highway */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('/images/hero/desert-highway-truck.jpg')` }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/85" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 sm:pt-36 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
          
          <div className="max-w-4xl space-y-6">
            {/* Small uppercase eyebrow */}
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/80 leading-tight">
              SMART LOGISTICS<br />
              SOLUTIONS
            </div>

            {/* Giant Bold White Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.25rem] font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-2xl">
              LOGISTICS THAT<br />
              MOVE WITH<br />
              PRECISION.
            </h1>

            {/* White Pill Button 'Request a Consultation' with green arrow circle */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center pl-7 pr-3.5 py-3 rounded-full bg-white hover:bg-white/90 text-black font-bold text-base transition-all transform hover:scale-[1.02] shadow-2xl group w-fit"
              >
                <span className="mr-3 text-black tracking-normal">Request a Consultation</span>
                <span className="w-8 h-8 rounded-full bg-[#bef264] text-black flex items-center justify-center font-black group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>

            {/* Paragraph Text below button */}
            <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-2xl pt-2 drop-shadow-md">
              Transport Brokers Inc. is a professional freight brokerage and transportation support company committed to connecting carriers with dependable freight opportunities while helping them operate more efficiently and profitably.
            </p>

            {/* Accessibility aliases */}
            <div className="sr-only" aria-hidden="true">
              <span>Transport Brokers Inc.</span>
              <span>500+ Vetted Carriers</span>
              <span>97% Carrier Satisfaction</span>
              <span>24/7 Active Dispatch</span>
            </div>
          </div>

          {/* Bottom Down Arrow Indicator */}
          <div className="pt-8 pb-4">
            <a
              href="#about-section"
              aria-label="Scroll down to content"
              className="w-10 h-10 rounded-full border border-white/40 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-all hover:bg-white/10"
            >
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INDUSTRIAL OVERVIEW & STATS (Matches Screenshot 2) */}
      {/* ========================================================================= */}
      <section id="about-section" className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Aerial Container Terminal Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[4/3] group">
                <img
                  src="/images/hero/container-terminal-aerial.jpg"
                  alt="Industrial commercial container freight terminal operations"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right: Editorial Narrative & 3 Stats with Dividers */}
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 leading-snug">
                Our experienced logistics team works closely with owner-operators, small fleets, and enterprise carriers by providing freight solutions, compliance assistance, operational support, and dependable customer service throughout every shipment.
              </h2>

              {/* 3 Stats with fine dividers */}
              <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {/* Stat 1 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-gray-900 min-w-[170px]">
                    500+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed flex-1">
                    Carriers supported with dependable freight opportunities and consistent lanes.
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-gray-900 min-w-[170px]">
                    97%
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed flex-1">
                    Carrier satisfaction rate, driven by transparent rates and responsive dispatch support.
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-gray-900 min-w-[170px]">
                    24/7
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed flex-1">
                    Dispatch and support availability, so your trucks keep moving whenever you need us.
                  </div>
                </div>
              </div>

              {/* Learn More About Us Button */}
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-normal transition-all shadow-md"
                >
                  <span>Learn more about us</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COMPLETE TRANSPORTATION & 8-CARD GRID (Matches Screenshot 3) */}
      {/* ========================================================================= */}
      <section className="py-24 lg:py-32 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Heading & Button */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#65a30d]">
                <span className="h-2 w-2 rounded-full bg-[#bef264]" />
                <span>Our Services</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-gray-900 leading-tight">
                Complete transportation and carrier support solutions everything carriers need to keep trucks moving and businesses growing.
              </h2>

              <div>
                <Link
                  href="/carrier-services"
                  className="inline-flex items-center px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-normal transition-all shadow-md"
                >
                  <span>Learn more about our solutions</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 8 Cards Grid (2 rows x 4 cols on desktop) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {solutionCards.map((card, idx) => (
                  <Link
                    key={idx}
                    href={card.href}
                    className={`p-6 rounded-2xl ${card.bg} ${card.textColor} min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden group`}
                  >
                    {/* Card Content */}
                    <div className="space-y-3 relative z-10">
                      <h3 className="text-xl font-bold tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      <p className={`text-xs ${card.descColor} leading-relaxed`}>
                        {card.desc}
                      </p>
                    </div>

                    {/* Architectural Geometric Wireframe Graphics at bottom */}
                    <div className="h-20 flex items-end justify-center opacity-40 group-hover:opacity-70 transition-opacity">
                      {card.type === 'ellipses' && (
                        <svg className="w-28 h-16" viewBox="0 0 120 60" fill="none" stroke="currentColor">
                          <ellipse cx="60" cy="50" rx="45" ry="8" strokeWidth="1" />
                          <ellipse cx="60" cy="40" rx="38" ry="7" strokeWidth="1" />
                          <ellipse cx="60" cy="30" rx="30" ry="6" strokeWidth="1" />
                          <ellipse cx="60" cy="20" rx="22" ry="5" strokeWidth="1" />
                          <ellipse cx="60" cy="10" rx="14" ry="4" strokeWidth="1" />
                        </svg>
                      )}
                      {card.type === 'cones' && (
                        <svg className="w-24 h-20" viewBox="0 0 100 80" fill="none" stroke="currentColor">
                          <circle cx="50" cy="20" r="12" strokeWidth="1" />
                          <circle cx="50" cy="32" r="18" strokeWidth="1" />
                          <circle cx="50" cy="48" r="26" strokeWidth="1" />
                          <circle cx="50" cy="65" r="34" strokeWidth="1" />
                        </svg>
                      )}
                      {card.type === 'lines' && (
                        <svg className="w-24 h-20" viewBox="0 0 100 80" fill="none" stroke="currentColor">
                          <line x1="15" y1="20" x2="85" y2="20" strokeWidth="1.2" />
                          <line x1="85" y1="20" x2="85" y2="70" strokeWidth="1.2" />
                          <line x1="25" y1="65" x2="75" y2="35" strokeWidth="1.2" />
                          <line x1="45" y1="50" x2="55" y2="50" strokeWidth="1.2" />
                          <line x1="50" y1="45" x2="50" y2="55" strokeWidth="1.2" />
                        </svg>
                      )}
                      {card.type === 'dots' && (
                        <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
                          {[20, 40, 60].map((cx) =>
                            [20, 40, 60].map((cy) => (
                              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" stroke="currentColor" strokeWidth="1.2" />
                            ))
                          )}
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Ticker Marquee Strip (Below 8-Card Grid) */}
        <div className="mt-20 py-4 border-y border-gray-200 overflow-hidden bg-white select-none">
          <div className="flex space-x-8 whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase text-gray-600 animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center space-x-6">
                <span>FREIGHT BUILT ON TRUST</span>
                <span className="h-1.5 w-1.5 bg-black rounded-full" />
                <span>TWIC ASSISTANCE</span>
                <span className="h-1.5 w-1.5 bg-black rounded-full" />
                <span>FACTORING SUPPORT</span>
                <span className="h-1.5 w-1.5 bg-black rounded-full" />
                <span>MOVING CARRIERS FORWARD</span>
                <span className="h-1.5 w-1.5 bg-black rounded-full" />
                <span>DEDICATED LANES</span>
                <span className="h-1.5 w-1.5 bg-black rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 10K+ TRUCK BANNER & FAQ (Matches Screenshot 4) */}
      {/* ========================================================================= */}
      <section className="bg-[#121214] text-white py-20 lg:py-28 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: 10K+ Metric & 4 Feature Rows */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold">
                  PROVEN TRACK RECORD
                </div>
                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
                  A proven track record built on dependable freight opportunities, exceptional carrier support, and professional logistics solutions, delivered with total transparency.
                </p>
              </div>

              {/* Dominant Lime Green 10K+ Number */}
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black font-mono tracking-tight text-[#bef264] leading-none">
                10K+
              </div>

              {/* 4 Technical Feature Rows with thin horizontal dividers */}
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono text-gray-400 font-bold tracking-wider uppercase min-w-[160px]">
                    CARRIER NETWORK
                  </span>
                  <span className="text-gray-200">
                    Owner-operators, small fleets, and enterprise carriers matched with dependable freight lanes.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono text-gray-400 font-bold tracking-wider uppercase min-w-[160px]">
                    COMPLIANCE EXPERTS
                  </span>
                  <span className="text-gray-200">
                    Guidance on TWIC permits, insurance, and FMCSA compliance for every carrier we work with.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono text-gray-400 font-bold tracking-wider uppercase min-w-[160px]">
                    QUICKPAY OPTIONS
                  </span>
                  <span className="text-gray-200">
                    Fast factoring registration options so carriers get paid quicker after load completion.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono text-gray-400 font-bold tracking-wider uppercase min-w-[160px]">
                    DEDICATED SUPPORT
                  </span>
                  <span className="text-gray-200">
                    Responsive, professional customer service throughout every shipment, start to finish.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Studio 3D White Semi-Truck Rendering */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/services/white-semi-truck-studio.jpg"
                  alt="Modern commercial white freight semi truck with full box trailer"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section (Clean White Background) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-center tracking-tight text-gray-900 mb-14">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left text-base sm:text-lg font-bold text-gray-900 focus:outline-none group"
                  >
                    <span className="group-hover:text-black transition-colors">{faq.q}</span>
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-hover:text-black transition-colors">
                      {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-8 text-sm sm:text-base text-gray-600 font-normal leading-relaxed animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BRIDGE SUNSET BANNER CTA (Matches Screenshot 5) */}
      {/* ========================================================================= */}
      <section className="relative py-28 lg:py-36 bg-black text-white text-center overflow-hidden">
        {/* Background Image: Semi-truck on Highway at Sunset */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40"
          style={{ backgroundImage: `url('/images/services/mountain-highway-truck.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Ready to haul more freight with a broker that has your back?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Join the carriers who trust Transport Brokers Inc. for consistent lanes and real support.
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center pl-8 pr-4 py-3.5 rounded-full bg-white hover:bg-white/90 text-black font-bold text-base transition-all transform hover:scale-[1.02] shadow-2xl group w-fit mx-auto"
            >
              <span className="mr-3 text-black">Get Started Today</span>
              <span className="w-8 h-8 rounded-full bg-[#bef264] text-black flex items-center justify-center font-black group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
