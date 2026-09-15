import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Feature } from '../../types/features'
import { featuresData } from '../../data/features'
import { FeatureCard } from './FeatureCard'
import { navigateScroll } from '../../lib/scrollUtils'

export interface FeaturesScrollProps {
  features?: Feature[]
}

export function FeaturesScroll({
  features = featuresData,
}: FeaturesScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    navigateScroll('left', scrollRef.current)
  }

  const handleScrollRight = () => {
    navigateScroll('right', scrollRef.current)
  }

  return (
    <section 
      id="features"
      aria-label="Features Showcase Section"
      className="py-24 lg:py-32 bg-brand-black text-white overflow-hidden border-b border-white/10 relative"
    >
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-lime-400 font-mono font-bold uppercase text-xs tracking-widest">
              <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
              <span>Operational Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Operational Excellence In Every <span className="text-lime-400">Mile.</span>
            </h2>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleScrollLeft}
              aria-label="Scroll features left"
              className="p-3.5 rounded-full bg-white/5 hover:bg-lime-500 hover:text-black border border-white/15 transition-all text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Scroll features right"
              className="p-3.5 rounded-full bg-white/5 hover:bg-lime-500 hover:text-black border border-white/15 transition-all text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        className="relative z-10 flex space-x-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 hide-scrollbar scroll-smooth max-w-7xl mx-auto"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}

