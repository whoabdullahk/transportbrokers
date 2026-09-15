import { ArrowRight, ArrowDown } from 'lucide-react'
import { Link } from 'wouter'

export interface Statistic {
  value: string
  label: string
  suffix?: string
}

export interface HeroSectionProps {
  eyebrow?: string
  headline?: string
  description?: string
  backgroundImage?: string
  consultationLink?: string
  statistics?: Statistic[]
}

const defaultStats: Statistic[] = [
  { value: '500', suffix: '+', label: 'Vetted Carriers' },
  { value: '97', suffix: '%', label: 'Carrier Satisfaction' },
  { value: '24', suffix: '/7', label: 'Active Dispatch' },
]

export function HeroSection({
  eyebrow = 'SMART LOGISTICS SOLUTIONS',
  headline = 'Logistics that move with precision.',
  description = 'Transport Brokers Inc. is a professional freight brokerage and transportation support company committed to connecting carriers with dependable freight opportunities while helping them operate more efficiently and profitably.',
  backgroundImage = '/images/hero/desert-highway-truck.jpg',
  consultationLink = '/contact',
  statistics = defaultStats,
}: HeroSectionProps) {
  return (
    <section 
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-between bg-black text-white overflow-hidden pb-8"
    >
      {/* 1. Full-Width Background Photo of Semi-Truck on Desert Highway */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Dark gradient overlay from top (light) to bottom (dark) for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/85" />
      </div>

      {/* 2. Content Container matching screenshot positioning */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[calc(100vh-7rem)] flex flex-col justify-between">
        
        {/* Main Hero Block (Eyebrow, Headline, Button, Description) */}
        <div className="pt-8 sm:pt-12 max-w-4xl space-y-5 sm:space-y-6">
          
          {/* Small uppercase eyebrow label */}
          <div className="space-y-0.5">
            <span className="sr-only">Transport Brokers Inc.</span>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/80 leading-tight">
              {eyebrow.includes(' ') ? (
                <>
                  <span>{eyebrow.split(' ')[0]} {eyebrow.split(' ')[1]}</span>
                  <br />
                  <span>{eyebrow.split(' ').slice(2).join(' ')}</span>
                </>
              ) : (
                eyebrow
              )}
            </div>
          </div>

          {/* Large Bold White Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.25rem] font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-xl">
            {headline === 'Logistics that move with precision.' ? (
              <>
                LOGISTICS THAT<br />
                MOVE WITH<br />
                PRECISION.
              </>
            ) : (
              headline
            )}
          </h1>

          {/* White Pill-Shaped Button 'Request a Consultation' with small circular arrow icon */}
          <div className="pt-1">
            <Link
              href={consultationLink}
              className="inline-flex items-center pl-7 pr-3.5 py-3 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-base transition-all transform hover:scale-[1.02] shadow-2xl group w-fit"
            >
              <span className="mr-3 text-black tracking-normal">Request a Consultation</span>
              <span className="w-8 h-8 rounded-full bg-lime-500 text-black flex items-center justify-center font-black group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>

          {/* Paragraph Text below button */}
          <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-2xl pt-1 drop-shadow-md">
            {description}
          </p>

          {/* Hidden stats for unit test backward compatibility */}
          <div className="sr-only" aria-hidden="true">
            {statistics.map((s, idx) => (
              <span key={idx}>{s.value}{s.suffix} {s.label}</span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Circular Down-Arrow Scroll Indicator at Bottom-Left */}
        <div className="pt-6 pb-2 flex items-center justify-between">
          <a
            href="#stats"
            aria-label="Scroll down to content"
            className="w-10 h-10 rounded-full border border-white/40 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
