import { Compass, ShieldCheck } from 'lucide-react'

export interface FullPageImageProps {
  image?: string
  alt?: string
  overlay?: boolean
  overlayOpacity?: number
}

export function FullPageImage({
  image = '/images/hero/foggy-highway-trailer.jpg',
  alt = 'Commercial semi-trailer truck traveling through early morning fog on interstate',
  overlay = true,
}: FullPageImageProps) {
  return (
    <section 
      aria-label="Scenic Freight Highway"
      className="relative w-full h-[65vh] sm:h-[80vh] md:h-[90vh] overflow-hidden bg-brand-black flex items-center justify-center border-b border-white/10"
    >
      {/* Background image */}
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-110"
        loading="lazy"
      />

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/70 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6 text-white">
              
              {/* Asymmetric Technical Route Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-lime-500/40 text-lime-400 text-xs font-mono tracking-widest uppercase">
                <Compass className="h-3.5 w-3.5" />
                <span>Interstate Freight Corridors • 24/7/365</span>
              </div>

              {/* Dramatic Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05]">
                Moving America Forward <span className="text-lime-400">24 Hours</span> A Day.
              </h2>

              <p className="text-base sm:text-lg text-gray-200 font-light max-w-xl leading-relaxed">
                From high-density Gulf Coast corridors to transcontinental Midwest freight lanes, our capacity network never sleeps.
              </p>

              {/* Micro technical coordinates */}
              <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-gray-400">
                <span className="flex items-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-lime-400 mr-1.5" />
                  100% Insured Fleet
                </span>
                <span>•</span>
                <span>Dispatch Status: Active</span>
                <span>•</span>
                <span>48 Continental States</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}

