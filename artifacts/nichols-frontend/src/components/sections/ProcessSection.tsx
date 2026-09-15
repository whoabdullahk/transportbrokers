import { useState } from 'react'
import { FileText, Search, CheckCircle, Navigation, HeadphonesIcon, ArrowRight } from 'lucide-react'

export interface ProcessStep {
  number: string
  title: string
  description: string
  tag: string
  icon: React.ReactNode
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    description: 'Submit your equipment specifications, preferred freight lanes, insurance filings, or permitting requirements via our dispatch intake.',
    tag: 'INTAKE',
    icon: <FileText className="h-5 w-5 text-lime-400" />,
  },
  {
    number: '02',
    title: 'Review Requirements',
    description: 'Our senior logistics team reviews MC authorities, safety scores, equipment specs, and matches optimal direct shipper contracts.',
    tag: 'VALIDATION',
    icon: <Search className="h-5 w-5 text-lime-400" />,
  },
  {
    number: '03',
    title: 'Complete Service Process',
    description: 'Rapid onboarding execution: instant QuickPay factoring setup, trailer leases assigned, or state permit packets expedited.',
    tag: 'EXECUTION',
    icon: <CheckCircle className="h-5 w-5 text-lime-400" />,
  },
  {
    number: '04',
    title: 'Move Forward',
    description: 'Wheels roll. Loads are confirmed with transparent rate confirmations and real-time tracking integration.',
    tag: 'DISPATCH',
    icon: <Navigation className="h-5 w-5 text-lime-400" />,
  },
  {
    number: '05',
    title: 'Ongoing Support',
    description: '24/7 dedicated dispatch manager assigned to your account for continuous load booking, roadside assistance, and billing.',
    tag: '24/7 ADVISORY',
    icon: <HeadphonesIcon className="h-5 w-5 text-lime-400" />,
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section 
      id="process"
      aria-label="Process Section"
      className="py-24 lg:py-32 bg-brand-black text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-400 uppercase tracking-widest">
              <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
              <span>Streamlined Onboarding & Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              How TBI Moves You <span className="text-lime-400">Forward.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed">
            From initial carrier intake to round-the-clock nationwide dispatch, our 5-step operational pipeline is engineered for zero downtime.
          </p>
        </div>

        {/* Desktop Connected Horizontal Track */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting Technical Route Line */}
          <div className="absolute top-12 left-8 right-8 h-[2px] bg-white/10 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-lime-500 to-lime-400 transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx
              const isPast = activeStep >= idx

              return (
                <div 
                  key={step.number}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="cursor-pointer group flex flex-col items-center text-center p-4"
                >
                  {/* Step Node */}
                  <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-lime-500 text-black border-lime-400 shadow-lime-glow -translate-y-2' 
                      : isPast
                        ? 'bg-brand-surface text-lime-400 border-lime-500/40'
                        : 'bg-brand-surface text-gray-400 border-white/10 group-hover:border-white/30'
                  }`}>
                    <span className="text-xs font-mono font-black">{step.number}</span>
                    <div className="mt-0.5">{step.icon}</div>
                  </div>

                  {/* Title & Tag */}
                  <div className="mt-5 space-y-2">
                    <span className={`text-[10px] font-mono tracking-widest uppercase block ${
                      isSelected ? 'text-lime-400 font-bold' : 'text-gray-400'
                    }`}>
                      {step.tag}
                    </span>
                    <h3 className={`text-base font-bold leading-snug transition-colors ${
                      isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected Step Detail Card (Desktop) */}
        <div className="hidden lg:block p-8 rounded-2xl bg-brand-surface border border-white/15 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-black font-mono text-lime-400">
                  {steps[activeStep].number}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  STAGE OBJECTIVE // {steps[activeStep].tag}
                </span>
              </div>
              <h4 className="text-2xl font-black text-white">
                {steps[activeStep].title}
              </h4>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-lime-500/20 flex-shrink-0"
            >
              <span>Get Started Now</span>
              <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Mobile Vertical Process Stack */}
        <div className="lg:hidden space-y-4">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="p-6 rounded-xl bg-brand-surface border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-black font-mono text-lime-400">
                    {step.number}
                  </span>
                  <span className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                    {step.tag}
                  </span>
                </div>
                <div className="p-2 rounded bg-white/5 text-lime-400">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">
                {step.title}
              </h3>

              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
