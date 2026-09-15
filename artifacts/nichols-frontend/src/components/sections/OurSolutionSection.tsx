import { CheckCircle2, Award, TrendingUp, ShieldCheck, Truck, Users, Clock } from 'lucide-react'

export interface OurSolutionSectionProps {
  heading?: string
  description?: string
  features?: string[]
}

export function OurSolutionSection({
  heading = 'Our Solution',
  description = 'Transport Brokers Inc. bridges the gap between high-demand freight corridors and dependable carrier networks. We eliminate empty deadhead miles, provide transparent load dispatching, and empower owner-operators with tailored back-office logistics, automated billing, and direct lane access.',
  features = [
    'Direct shipper contract matching with zero hidden broker markups',
    'Same-day factoring onboarding and expedited QuickPay settlements',
    'Comprehensive DOT, IFTA, and TWIC compliance assistance',
    'Modern fleet trailer rentals with full roadside maintenance support',
  ],
}: OurSolutionSectionProps) {
  const pillars = [
    {
      title: 'Carrier Relationships',
      desc: 'We operate carrier-first. Independent truckers and fleets receive direct access to dedicated lanes with zero predatory broker cuts.',
      icon: <Users className="h-5 w-5 text-lime-400" />,
      tag: 'RELATIONSHIP DRIVEN',
    },
    {
      title: 'Operational Expertise',
      desc: 'Backed by decades of collective dispatch mastery across heavy-haul, reefer, and dry van corridors nationwide.',
      icon: <Truck className="h-5 w-5 text-lime-400" />,
      tag: 'DISPATCH MASTERY',
    },
    {
      title: 'Compliance Support',
      desc: 'End-to-end FMCSA safety audits, TWIC maritime certification, and multi-state fuel/tax permit clearances.',
      icon: <ShieldCheck className="h-5 w-5 text-lime-400" />,
      tag: 'DOT COMPLIANT',
    },
    {
      title: 'Reliable Freight',
      desc: 'Consistent year-round freight agreements with industrial shippers to keep wheels rolling in all economic climates.',
      icon: <Clock className="h-5 w-5 text-lime-400" />,
      tag: 'YEAR-ROUND LANES',
    },
    {
      title: 'Business Growth',
      desc: 'Expedited cash flow via factoring partnerships, fleet equipment leasing, and automated billing support.',
      icon: <TrendingUp className="h-5 w-5 text-lime-400" />,
      tag: 'FLEET EXPANSION',
    },
  ]

  return (
    <section 
      id="about"
      aria-label="Our Solution Section"
      className="py-24 lg:py-36 bg-brand-charcoal text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Giant Headline */}
        <div className="space-y-4 max-w-4xl mb-16">
          <div className="inline-flex items-center space-x-2 text-lime-400 font-mono font-bold uppercase text-xs tracking-widest">
            <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
            <span>Why Transport Brokers Inc. • Executive Overview</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            <span>{heading}</span>
          </h2>
          <div className="text-xl sm:text-2xl text-lime-400 font-bold uppercase tracking-wide">
            Built For Serious Haulers
          </div>


          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed pt-2">
            {description}
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-brand-surface border border-white/10 hover:border-lime-500/40 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-lime-500/20 transition-colors">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400 font-semibold">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mt-6 group-hover:text-lime-400 transition-colors">
                {pillar.title}
              </h3>
              
              <p className="text-sm text-gray-400 mt-2 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}

          {/* The TBI Advantage Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-500/10 via-brand-surface to-brand-black border border-lime-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-lime-500/20">
                <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-bold">
                  DIFFERENTIATOR
                </span>
                <Award className="h-5 w-5 text-lime-400" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-white mt-6">
                The TBI Advantage
              </h3>

              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-300">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <a
                href="#contact"
                className="inline-flex items-center text-xs font-mono uppercase text-lime-400 font-bold hover:underline"
              >
                Request Carrier Packet →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

