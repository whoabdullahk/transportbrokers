import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ServiceColor, TextTheme } from '../../types/services'
import { getServiceBackgroundClass } from '../../lib/serviceUtils'

export interface ServiceCardProps {
  title: string
  description: string
  icon?: ReactNode
  backgroundColor: ServiceColor
  textTheme?: TextTheme
  link: string
  isActive?: boolean
  index?: number
  onSelect?: () => void
}

export function ServiceCard({
  title,
  description,
  icon,
  backgroundColor,
  textTheme,
  link,
  isActive = false,
  index,
  onSelect,
}: ServiceCardProps) {
  const bgClass = getServiceBackgroundClass(backgroundColor)
  const isDark = textTheme ? textTheme === 'light' : backgroundColor === 'black'

  const textColorClass = isDark ? 'text-white' : 'text-gray-900'
  const descColorClass = isDark ? 'text-gray-300' : 'text-gray-700'
  const borderClass = isDark ? 'border-white/10' : 'border-gray-200/80'
  const btnBgClass = isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'

  return (
    <div
      data-testid={`service-card-${backgroundColor}`}
      onClick={onSelect}
      onMouseEnter={onSelect}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border transition-all duration-300 cursor-pointer ${bgClass} ${borderClass} ${
        isActive 
          ? 'ring-2 ring-lime-500 shadow-lime-glow -translate-y-1' 
          : 'hover:-translate-y-1 hover:shadow-xl'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/15 backdrop-blur-md inline-flex text-current">
              {icon || <div className="w-5 h-5 rounded-full bg-current opacity-60" />}
            </div>
            {index !== undefined && (
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                0{index + 1}
              </span>
            )}
          </div>
          
          <a
            href={link}
            aria-label={`Learn more about ${title}`}
            className={`p-2 rounded-full transition-transform transform group-hover:rotate-45 group-hover:scale-110 ${btnBgClass} focus:outline-none focus:ring-2 focus:ring-lime-500`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${textColorClass} group-hover:text-lime-400 transition-colors`}>
          {title}
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed ${descColorClass} line-clamp-2 group-hover:line-clamp-none transition-all`}>
          {description}
        </p>
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-current/10 mt-3">
        <span className={`inline-flex items-center text-xs font-mono font-bold tracking-wider uppercase group-hover:underline ${textColorClass}`}>
          <span>Learn More</span>
          <ArrowUpRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <span className="text-[10px] font-mono uppercase text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">
          ACTIVE SPEC
        </span>
      </div>
    </div>
  )
}

