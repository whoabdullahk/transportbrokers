import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export interface HeroCTASectionProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  imageAlt?: string
}

export function HeroCTASection({
  headline = 'LOGISTICS THAT MOVE WITH PRECISION',
  subheadline = 'Streamlined transportation management, dedicated freight lanes, and rapid carrier dispatch tailored to elevate your bottom line.',
  ctaText = 'Request a Consultation',
  ctaLink = '#contact',
  backgroundImage = '/images/hero/desert-highway-truck.jpg',
  imageAlt = 'Truck driving on open highway',
}: HeroCTASectionProps) {
  return (
    <section 
      id="consultation"
      aria-label="Consultation CTA Section"
      className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center bg-brand-surface text-white overflow-hidden py-20 border-b border-white/10"
    >
      {/* Background Image with Dark Gradient */}
      <div 
        role="img"
        aria-label={imageAlt}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 filter contrast-125"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-charcoal/90 to-brand-black" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-mono font-bold tracking-widest uppercase">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Carrier & Shipper Solutions</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
          {headline}
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          {subheadline}
        </p>

        <div className="pt-2 flex justify-center">
          <a
            href={ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-xl shadow-lime-500/25 focus:outline-none focus:ring-4 focus:ring-lime-400"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="ml-2 h-4 w-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  )
}

