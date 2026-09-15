import type { Feature } from '../../types/features'
import { ArrowRight } from 'lucide-react'

export interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div
      data-testid={`feature-card-${feature.id}`}
      className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 text-white shadow-xl flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-1"
    >
      {feature.image && (
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <span className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-2 block">
            Feature 0{feature.order}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-lime-400 transition-colors">
            {feature.title}
          </h3>
          {feature.description && (
            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              {feature.description}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center text-lime-400 text-sm font-semibold">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}
