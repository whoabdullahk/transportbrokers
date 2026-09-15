import { ShieldCheck, Truck, Clock, Award } from 'lucide-react'

export interface MetricItem {
  value: string
  suffix?: string
  label: string
  sublabel?: string
  icon?: React.ReactNode
}

export interface StatsSectionProps {
  statValue?: string
  statLabel?: string
  description?: string
  truckImage?: string
}

export function StatsSection({
  statValue = '10K+',
  statLabel = 'LOADS DISPATCHED',
  description = 'Transport Brokers Inc. maintains an elite network spanning 48 continental states. Through precision lane engineering, high-volume shipper contracts, and non-stop operational dispatch, we power carrier profitability and on-time performance.',
  truckImage = '/images/services/white-truck.jpg',
}: StatsSectionProps) {
  const metrics: MetricItem[] = [
    {
      value: '500',
      suffix: '+',
      label: 'Carriers Supported',
      sublabel: 'Vetted independent owner-operators & fleet partners',
      icon: <Truck className="h-4 w-4 text-lime-400" />,
    },
    {
      value: '97',
      suffix: '%',
      label: 'Carrier Satisfaction',
      sublabel: 'Consistently rated 5-stars for dispatch transparency',
      icon: <Award className="h-4 w-4 text-lime-400" />,
    },
    {
      value: '24',
      suffix: '/7',
      label: 'Dispatch & Support',
      sublabel: 'Live operational desk ready for emergency routing',
      icon: <Clock className="h-4 w-4 text-lime-400" />,
    },
    {
      value: statValue,
      suffix: '',
      label: statLabel,
      sublabel: 'Commercial dry van, reefer, and flatbed shipments',
      icon: <ShieldCheck className="h-4 w-4 text-lime-400" />,
    },
  ]


  return (
    <section 
      id="stats"
      aria-label="Dispatched Loads Statistics Section"
      className="py-20 lg:py-28 bg-brand-charcoal text-white border-y border-white/10 relative overflow-hidden"
    >
      {/* Background technical accent */}
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-400 uppercase tracking-widest">
              <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
              <span>Operational Reliability Metrics</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Performance Proven By The Numbers
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Editorial Metrics Grid with Thin Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 pt-8">
          {metrics.map((metric, idx) => (
            <div 
              key={idx}
              className={`py-8 sm:py-6 ${idx === 0 ? 'sm:pr-8' : idx === 3 ? 'sm:pl-8' : 'sm:px-8'} group hover:bg-white/[0.02] transition-colors rounded-lg`}
            >
              <div className="flex items-center space-x-2 mb-4">
                {metric.icon}
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                  METRIC 0{idx + 1}
                </span>
              </div>

              {/* Dominant Number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-lime-400 tracking-tight font-mono leading-none group-hover:text-lime-300 transition-colors">
                <span>{metric.value}</span>
                {metric.suffix && <span className="text-white">{metric.suffix}</span>}
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  {metric.label}
                </h3>
                {metric.sublabel && (
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {metric.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner / Image Overlay */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-brand-surface border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={truckImage}
              alt="TBI freight transport fleet truck"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-white/10"
              loading="lazy"
            />
            <div>
              <div className="text-xs font-mono uppercase text-lime-400 tracking-wider">
                Fleet Ready • Continental 48 Coverage
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                Direct Shipper Contract Execution
              </div>
              <div className="text-xs text-gray-400 font-light mt-0.5">
                Zero broker middlemen markups. Direct freight lane agreements for maximum rate-per-mile.
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-md bg-white/10 hover:bg-lime-500 hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/15"
          >
            Join Carrier Network →
          </a>
        </div>
      </div>
    </section>
  )
}

