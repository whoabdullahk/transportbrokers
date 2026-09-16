import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react'

export interface CTASectionProps {
  heading?: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
}

export function CTASection({
  heading = 'Ready To Haul More Freight?',
  subheading = 'Join carriers who trust Transport Brokers Inc. for consistent lanes and real support. Access guaranteed QuickPay, dedicated freight corridors, and 24/7 dedicated dispatch.',
  ctaText = 'Get Started Today',
  ctaLink = '#contact',
}: CTASectionProps) {
  return (
    <section 
      id="cta"
      aria-label="Bottom Call To Action Section"
      className="py-28 lg:py-40 bg-brand-black text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Background freight imagery with heavy cinematic gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/images/hero/desert-highway-truck.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/95" />
      </div>

      {/* Subtle green ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-lime-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md">
          <ShieldCheck className="h-4 w-4 text-lime-400 mr-1" />
          <span>CARRIER NETWORK ONBOARDING • IMMEDIATE ACCESS</span>
        </div>

        {/* Dramatic Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.05]">
          {heading}
        </h2>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
          {subheading}
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href={ctaLink}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-lg bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-base uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-2xl shadow-lime-500/30 focus:outline-none focus:ring-4 focus:ring-lime-400"
          >
            <span>{ctaText}</span>
            <ArrowRight className="ml-2.5 h-5 w-5 stroke-[2.5]" />
          </a>

          <a
            href="tel:3307567732"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-base transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PhoneCall className="mr-2.5 h-5 w-5 text-lime-400" />
            <span className="font-mono">330-756-7732</span>
          </a>
        </div>

        {/* Operating status footer tag */}
        <div className="pt-4 text-xs font-mono text-gray-400 tracking-wider">
          LIVE DISPATCH SUPPORT: MONDAY – SUNDAY • 24 HOURS A DAY
        </div>

      </div>
    </section>
  )
}

