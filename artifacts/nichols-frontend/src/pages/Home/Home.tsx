import { useState } from 'react'
import { Link } from 'wouter'
import {
  ArrowRight,
  ArrowDown,
  Plus,
  Minus,
  Award
} from 'lucide-react'
import { TaglineReveal } from '../../components/sections/TaglineReveal'
import { Counter } from '../../components/common/Counter'
import { MaskedReveal } from '../../components/common/MaskedReveal'
import { LiveTelemetryBar } from '../../components/sections/LiveTelemetryBar'

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // 8 Cards arranged in an asymmetric Bento Grid (breaking 3-column AI slop):
  // - Flat surfaces from approved dark/light palette (#181818, #1F1F1F, #F5F5F0)
  // - Dynamic spans: 8+4, 4+4+4, 8+4, 6+6
  // - Nested radius: outer rounded-2xl (16px), inner rounded-md (8px)
  const solutionCards = [
    {
      title: 'Dedicated Freight Lanes',
      desc: 'Consistent freight opportunities with reliable lanes and competitive rates designed to maximize utilization and revenue across all 48 contiguous states.',
      bg: 'bg-[#181818] border border-[#D4AF37]/40 shadow-sm',
      textColor: 'text-white font-semibold',
      descColor: 'text-neutral-300',
      badgeBg: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30',
      tag: 'PREMIUM CONTRACTS',
      type: 'ellipses',
      href: '/carrier-services#dedicated-freight-lanes',
      span: 'lg:col-span-8',
    },
    {
      title: 'Trailer Rental Program',
      desc: 'Flexibility with dry van, reefer, flatbed, and specialized trailer rental solutions for both short-term and long-term operations.',
      bg: 'bg-[#F5F5F0] border border-neutral-200/90 shadow-sm',
      textColor: 'text-neutral-900 font-semibold',
      descColor: 'text-neutral-700',
      badgeBg: 'bg-black/5 text-neutral-800 border border-black/5',
      tag: 'FLEET EXPANSION',
      type: 'cones',
      href: '/carrier-services#trailer-rental-program',
      span: 'lg:col-span-4',
    },
    {
      title: 'TWIC Card Assistance',
      desc: 'Professional guidance throughout the TWIC application process with expedited support for port access compliance.',
      bg: 'bg-[#1F1F1F] border border-white/10 shadow-sm',
      textColor: 'text-white font-semibold',
      descColor: 'text-neutral-300',
      badgeBg: 'bg-white/10 text-[#D4AF37] border border-white/10',
      tag: 'MARITIME CLEARANCE',
      type: 'lines',
      href: '/carrier-services#twic-card-assistance',
      span: 'lg:col-span-4',
    },
    {
      title: 'Insurance Assistance',
      desc: 'Helping carriers obtain affordable cargo, liability, and commercial trucking insurance through trusted providers.',
      bg: 'bg-[#F5F5F0] border border-neutral-200/90 shadow-sm',
      textColor: 'text-neutral-900 font-semibold',
      descColor: 'text-neutral-700',
      badgeBg: 'bg-black/5 text-neutral-800 border border-black/5',
      tag: 'RISK MANAGEMENT',
      type: 'dots',
      href: '/insurance',
      span: 'lg:col-span-4',
    },
    {
      title: 'Factoring Registration',
      desc: 'Fast invoice factoring solutions that improve cash flow and ensure quicker payments after load completion.',
      bg: 'bg-[#181818] border border-white/10 shadow-sm',
      textColor: 'text-white font-semibold',
      descColor: 'text-neutral-300',
      badgeBg: 'bg-white/10 text-[#D4AF37] border border-white/10',
      tag: 'CASH FLOW',
      type: 'ellipses',
      href: '/carrier-services#factoring-registration',
      span: 'lg:col-span-4',
    },
    {
      title: 'Specialized Permit Loads',
      desc: 'Access premium freight opportunities requiring specialized permits, including oversized and overweight transportation across state lines.',
      bg: 'bg-[#1F1F1F] border border-[#D4AF37]/35 shadow-sm',
      textColor: 'text-white font-semibold',
      descColor: 'text-neutral-300',
      badgeBg: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30',
      tag: 'HEAVY HAUL',
      type: 'cones',
      href: '/permits',
      span: 'lg:col-span-8',
    },
    {
      title: 'Permit Application Support',
      desc: 'Complete assistance with transportation permits, operating authority documentation, and regulatory filings.',
      bg: 'bg-[#F5F5F0] border border-neutral-200/90 shadow-sm',
      textColor: 'text-neutral-900 font-semibold',
      descColor: 'text-neutral-700',
      badgeBg: 'bg-black/5 text-neutral-800 border border-black/5',
      tag: 'REGULATORY COMPLIANCE',
      type: 'lines',
      href: '/permits',
      span: 'lg:col-span-6',
    },
    {
      title: 'DOT Compliance Support',
      desc: 'Helping carriers remain compliant with FMCSA regulations, DOT requirements, permits, and industry standards.',
      bg: 'bg-[#181818] border border-white/10 shadow-sm',
      textColor: 'text-white font-semibold',
      descColor: 'text-neutral-300',
      badgeBg: 'bg-white/10 text-[#D4AF37] border border-white/10',
      tag: 'SAFETY AUDITING',
      type: 'dots',
      href: '/carrier-services#dot-compliance-support',
      span: 'lg:col-span-6',
    },
  ]

  const faqs = [
    {
      q: 'What services does Gold Star Transportation, Inc. provide?',
      a: 'Gold Star Transportation, Inc. provides full-suite commercial freight brokerage, dedicated lane capacity, trailer rentals (dry van, reefer, flatbed), expedited invoice factoring assistance, TWIC maritime card compliance, and federal DOT/FMCSA permit filings.',
    },
    {
      q: 'Who can work with Gold Star Transportation, Inc.?',
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
      q: 'How do I get started with Gold Star Transportation, Inc.?',
      a: 'Getting onboarded is straightforward: submit your MC/DOT certificate, current certificate of insurance (COI) naming Gold Star Transportation, Inc. as certificate holder, and signed W-9. Our carrier relations desk reviews packets within 2 business hours.',
    },
  ]

  return (
    <div className="bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Aligned with AI Design Skill B5) */}
      {/* ========================================================================= */}
      <section
        aria-label="Hero Section"
        className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-between bg-[#000000] text-white overflow-hidden pb-12"
      >
        {/* Full-width background photo with high-contrast neutral lighting */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105 transform animate-in fade-in duration-1000 opacity-60"
          style={{ backgroundImage: `url('/images/hero/desert-highway-truck.jpg')` }}
        >
          {/* Flat neutral scrim for legibility (zero colored/purple AI gradients) */}
          <div className="absolute inset-0 bg-[#000000]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 sm:pt-40 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div className="max-w-[680px] space-y-7">
            {/* Live Status Telemetry Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-[0.2em] text-white/90">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Smart Logistics &amp; Nationwide Freight</span>
            </div>

            {/* Headline with B5 Text Gradient (#FFFFFF -> #9B9B9B) and Kinetic Masked Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.96] text-balance max-w-[680px]">
              <MaskedReveal delay={100}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#9B9B9B]">
                  Logistics that move
                </span>
              </MaskedReveal>
              <MaskedReveal delay={250}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#9B9B9B]">
                  with{' '}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0A8] via-[#F4C542] to-[#D4AF37]">
                  precision.
                </span>
              </MaskedReveal>
            </h1>

            {/* Paragraph Text (Capped at 680px per B5 layout rule, text-pretty) */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-[680px] pt-1 text-pretty">
              Gold Star Transportation, Inc. is a premier nationwide freight brokerage and carrier support firm connecting owner-operators and enterprise carriers with dependable high yield lanes, accelerated factoring, and 24/7 dedicated dispatch.
            </p>

            {/* Action Buttons Row with Tactile Press Feedback */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="btn-tactile inline-flex items-center pl-7 pr-3.5 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4C542] hover:from-[#F4C542] hover:to-[#D4AF37] text-neutral-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] group w-fit cursor-pointer"
              >
                <span className="mr-3 tracking-normal">Request a Consultation</span>
                <span className="w-8 h-8 rounded-full bg-neutral-950 text-[#D4AF37] flex items-center justify-center font-bold group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </span>
              </Link>

              <Link
                href="/carrier-services"
                className="btn-tactile inline-flex items-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base border border-white/20 backdrop-blur-md cursor-pointer hover:border-[#D4AF37]/50"
              >
                <span>Explore Solutions</span>
              </Link>
            </div>

            {/* Floating Trust Metrics in Tabular Monospace with Animated Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 max-w-xl border-t border-white/15">
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-[#D4AF37]">
                  <Counter end={500} suffix="+" />
                </div>
                <div className="text-xs text-neutral-300 font-medium">Vetted Carriers</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold font-mono text-white">
                  <Counter end={97.4} decimals={1} suffix="%" />
                </div>
                <div className="text-xs text-neutral-300 font-medium">On-Time Delivery</div>
              </div>
              <div className="space-y-0.5 col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold font-mono text-white">
                  <Counter end={24} suffix="/7" />
                </div>
                <div className="text-xs text-neutral-300 font-medium">Active Dispatch</div>
              </div>
            </div>

            {/* Accessibility aliases */}
            <div className="sr-only" aria-hidden="true">
              <span>Gold Star Transportation, Inc.</span>
              <span>500+ Vetted Carriers</span>
              <span>97% Carrier Satisfaction</span>
              <span>24/7 Active Dispatch</span>
            </div>
          </div>

          {/* Bottom Down Arrow Indicator */}
          <div className="pt-10 pb-4">
            <a
              href="#about-section"
              aria-label="Scroll down to content"
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-all hover:bg-white/15 group cursor-pointer btn-tactile"
            >
              <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIVE FREIGHT TELEMETRY RIBBON (Awwwards Real-Time Corridor Tracker) */}
      {/* ========================================================================= */}
      <LiveTelemetryBar />

      {/* ========================================================================= */}
      {/* 2. INDUSTRIAL OVERVIEW & STATS SECTION */}
      {/* ========================================================================= */}
      <section id="about-section" className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Aerial Container Terminal Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] group border border-gray-200/80">
                <img
                  src="/images/hero/container-terminal-aerial.jpg"
                  alt="Industrial commercial container freight terminal operations"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                    Terminal Logistics Network
                  </span>
                  <p className="text-sm font-semibold text-white/90 mt-0.5">
                    Direct access to deepwater ports, railheads, and intermodal corridors.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & 3 Stats with Dividers */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <span>The Brokerage Standard</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 leading-snug">
                  Our experienced logistics team works closely with owner-operators, small fleets, and enterprise carriers by providing freight solutions, compliance assistance, operational support, and dependable customer service throughout every shipment.
                </h2>
              </div>

              {/* 3 Stats with fine dividers and Animated Counter Physics */}
              <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {/* Stat 1 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group">
                  <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-neutral-900 min-w-[170px] group-hover:text-[#D4AF37] transition-colors">
                    <Counter end={500} suffix="+" />
                  </div>
                  <div className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed flex-1 text-pretty">
                    Carriers supported with dependable freight opportunities and consistent lanes.
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group">
                  <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-neutral-900 min-w-[170px] group-hover:text-[#D4AF37] transition-colors">
                    <Counter end={97} suffix="%" />
                  </div>
                  <div className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed flex-1 text-pretty">
                    Carrier satisfaction rate, driven by transparent rates and responsive dispatch support.
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group">
                  <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-neutral-900 min-w-[170px] group-hover:text-[#D4AF37] transition-colors">
                    <Counter end={24} suffix="/7" />
                  </div>
                  <div className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed flex-1 text-pretty">
                    Dispatch and support availability, so your trucks keep moving whenever you need us.
                  </div>
                </div>
              </div>

              {/* Learn More About Us Button with Tactile Feedback */}
              <div>
                <Link
                  href="/about"
                  className="btn-tactile inline-flex items-center px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-sm tracking-normal shadow-md group cursor-pointer"
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MANDATORY TAGLINE REVEAL SECTION (AI Design Skill B11) */}
      {/* ========================================================================= */}
      <TaglineReveal />

      {/* ========================================================================= */}
      {/* 3. COMPLETE TRANSPORTATION & 8-CARD GRID */}
      {/* ========================================================================= */}
      <section className="py-24 lg:py-32 bg-[#F5F5F0]/70 border-b border-neutral-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

            {/* Left Column: Heading & Button */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span>Our Core Services</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-neutral-900 leading-tight text-balance">
                Complete transportation and carrier support solutions. Everything carriers need to keep trucks moving and businesses growing.
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty">
                From dedicated lanes to fast factoring and compliance filings, we equip modern carriers to run efficiently with zero broker friction.
              </p>

              <div>
                <Link
                  href="/carrier-services"
                  className="btn-tactile inline-flex items-center px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-sm tracking-normal shadow-md group cursor-pointer"
                >
                  <span>Learn more about our solutions</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                </Link>
              </div>
            </div>

            {/* Right Column: 8 Cards Asymmetric Bento Grid (Dynamic col-spans) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
                {solutionCards.map((card, idx) => (
                  <Link
                    key={idx}
                    href={card.href}
                    className={`p-6 sm:p-7 rounded-2xl ${card.bg} ${card.textColor} ${card.span} min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group btn-tactile hover:border-[#D4AF37]/50`}
                  >
                    {/* Top Tag & Card Content */}
                    <div className="space-y-3 relative z-10">
                      <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${card.badgeBg}`}>
                        {card.tag}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight leading-snug text-balance">
                        {card.title}
                      </h3>
                      <p className={`text-xs ${card.descColor} leading-relaxed text-pretty`}>
                        {card.desc}
                      </p>
                    </div>

                    {/* Wireframe Graphic at bottom */}
                    <div className="h-20 flex items-end justify-center opacity-40 group-hover:opacity-80 transition-opacity">
                      {card.type === 'ellipses' && (
                        <svg className="w-28 h-16" viewBox="0 0 120 60" fill="none" stroke="currentColor">
                          <ellipse cx="60" cy="50" rx="45" ry="8" strokeWidth="1.2" />
                          <ellipse cx="60" cy="40" rx="38" ry="7" strokeWidth="1.2" />
                          <ellipse cx="60" cy="30" rx="30" ry="6" strokeWidth="1.2" />
                          <ellipse cx="60" cy="20" rx="22" ry="5" strokeWidth="1.2" />
                          <ellipse cx="60" cy="10" rx="14" ry="4" strokeWidth="1.2" />
                        </svg>
                      )}
                      {card.type === 'cones' && (
                        <svg className="w-24 h-20" viewBox="0 0 100 80" fill="none" stroke="currentColor">
                          <circle cx="50" cy="20" r="12" strokeWidth="1.2" />
                          <circle cx="50" cy="32" r="18" strokeWidth="1.2" />
                          <circle cx="50" cy="48" r="26" strokeWidth="1.2" />
                          <circle cx="50" cy="65" r="34" strokeWidth="1.2" />
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

        {/* Marquee Strip - Infinite Moving Ribbon */}
        <div className="mt-20 py-4 border-y border-gray-200 overflow-hidden bg-white select-none shadow-sm relative">
          <div className="flex whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase text-gray-800 animate-marquee">
            {[...Array(2)].map((_, trackIdx) => (
              <div key={trackIdx} className="flex items-center space-x-8 pr-8 flex-shrink-0">
                <span className="inline-flex items-center space-x-6">
                  <span>FREIGHT BUILT ON TRUST</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>TWIC ASSISTANCE</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>FACTORING SUPPORT</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>MOVING CARRIERS FORWARD</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>DEDICATED LANES</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>48-STATE CORRIDOR NETWORK</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                </span>
                <span className="inline-flex items-center space-x-6">
                  <span>FREIGHT BUILT ON TRUST</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>TWIC ASSISTANCE</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>FACTORING SUPPORT</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>MOVING CARRIERS FORWARD</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>DEDICATED LANES</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                  <span>48-STATE CORRIDOR NETWORK</span>
                  <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 10K+ TRUCK BANNER & FAQ (Aligned with AI Design Skill rules) */}
      {/* ========================================================================= */}
      <section className="bg-[#181818] text-white py-20 lg:py-28 overflow-hidden relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: 10K+ Metric & 4 Technical Feature Rows */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span>PROVEN TRACK RECORD</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl text-pretty">
                  A proven track record built on dependable freight opportunities, exceptional carrier support, and professional logistics solutions, delivered with total transparency.
                </p>
              </div>

              {/* Dominant Gold 10K+ Number with Rolling Counter Physics */}
              <div className="text-7xl sm:text-8xl lg:text-9xl font-bold font-mono tracking-tight text-[#D4AF37] leading-none drop-shadow-[0_0_35px_rgba(212,175,55,0.25)]">
                <Counter end={10} suffix="K+" />
              </div>

              {/* 4 Technical Feature Rows */}
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs hover:bg-white/[0.03] px-2 rounded-md transition-colors">
                  <span className="font-mono text-[#D4AF37] font-semibold tracking-wider uppercase min-w-[160px]">
                    CARRIER NETWORK
                  </span>
                  <span className="text-neutral-200">
                    Owner-operators, small fleets, and enterprise carriers matched with dependable freight lanes.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs hover:bg-white/[0.03] px-2 rounded-md transition-colors">
                  <span className="font-mono text-[#D4AF37] font-semibold tracking-wider uppercase min-w-[160px]">
                    COMPLIANCE EXPERTS
                  </span>
                  <span className="text-neutral-200">
                    Guidance on TWIC permits, insurance, and FMCSA compliance for every carrier we work with.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs hover:bg-white/[0.03] px-2 rounded-md transition-colors">
                  <span className="font-mono text-[#D4AF37] font-semibold tracking-wider uppercase min-w-[160px]">
                    QUICKPAY OPTIONS
                  </span>
                  <span className="text-neutral-200">
                    Fast factoring registration options so carriers get paid quicker after load completion.
                  </span>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs hover:bg-white/[0.03] px-2 rounded-md transition-colors">
                  <span className="font-mono text-[#D4AF37] font-semibold tracking-wider uppercase min-w-[160px]">
                    DEDICATED SUPPORT
                  </span>
                  <span className="text-neutral-200">
                    Responsive, professional customer service throughout every shipment, start to finish.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Studio Semi-Truck Rendering */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-500 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1F1F1F] p-4">
                <img
                  src="/images/services/white-semi-truck-studio.jpg"
                  alt="Modern commercial white freight semi truck with full box trailer"
                  className="w-full h-auto object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
              Support Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-neutral-900 text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left text-base sm:text-lg font-semibold text-neutral-900 focus:outline-none group cursor-pointer"
                  >
                    <span className="group-hover:text-black transition-colors text-balance">{faq.q}</span>
                    <span className="ml-4 flex-shrink-0 text-neutral-400 group-hover:text-black transition-colors">
                      {isOpen ? <Minus className="h-5 w-5 text-[#D4AF37]" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-8 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed animate-fadeIn text-pretty">
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
      {/* 5. BRIDGE SUNSET BANNER CTA */}
      {/* ========================================================================= */}
      <section className="relative py-28 lg:py-36 bg-[#000000] text-white text-center overflow-hidden">
        {/* Background Image: Semi-truck on Highway at Sunset */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 scale-105"
          style={{ backgroundImage: `url('/images/services/mountain-highway-truck.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-[#000000]/80 pointer-events-none" />

        <div className="relative z-10 max-w-[680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
            <Award className="h-3.5 w-3.5" />
            <span>Partner With Gold Star</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight text-balance">
            Ready to haul more freight with a broker that has your back?
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal max-w-xl mx-auto leading-relaxed text-pretty">
            Join the carriers who trust Gold Star Transportation, Inc. for consistent lanes, transparent rates, and real 24/7 support.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-tactile inline-flex items-center pl-8 pr-4 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4C542] hover:from-[#F4C542] hover:to-[#D4AF37] text-neutral-950 font-bold text-base shadow-[0_0_25px_rgba(212,175,55,0.3)] group w-fit cursor-pointer"
            >
              <span className="mr-3 text-neutral-950">Get Started Today</span>
              <span className="w-8 h-8 rounded-full bg-neutral-950 text-[#D4AF37] flex items-center justify-center font-bold group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </Link>

            <Link
              href="/carrier-services"
              className="btn-tactile inline-flex items-center px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-md cursor-pointer"
            >
              <span>Explore Carrier Services</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
