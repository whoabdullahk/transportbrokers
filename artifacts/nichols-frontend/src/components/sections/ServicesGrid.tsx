import { useState } from 'react'
import { 
  Truck, 
  Container, 
  CreditCard, 
  ShieldCheck, 
  DollarSign, 
  FileCheck2, 
  FileText, 
  CheckSquare,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react'
import type { Service } from '../../types/services'
import { servicesData } from '../../data/services'
import { ServiceCard } from './ServiceCard'

export interface ServicesGridProps {
  services?: Service[]
  columns?: number
}

const serviceIcons: Record<string, React.ReactNode> = {
  'dedicated-freight-lanes': <Truck className="h-6 w-6" />,
  'trailer-rental-program': <Container className="h-6 w-6" />,
  'twic-card-assistance': <CreditCard className="h-6 w-6" />,
  'insurance-assistance': <ShieldCheck className="h-6 w-6" />,
  'factoring-registration': <DollarSign className="h-6 w-6" />,
  'specialized-permit-loads': <FileCheck2 className="h-6 w-6" />,
  'permit-application-support': <FileText className="h-6 w-6" />,
  'dot-compliance-support': <CheckSquare className="h-6 w-6" />,
}

const serviceHighlights: Record<string, { specs: string[]; coverage: string; turnaround: string }> = {
  'dedicated-freight-lanes': {
    specs: ['Direct Shipper Contracts', 'Dry Van, Reefer, Flatbed', 'Consistent Daily/Weekly Volume'],
    coverage: 'Major Continental 48 Corridors',
    turnaround: 'Immediate Dispatch Match',
  },
  'trailer-rental-program': {
    specs: ['Late-Model 53ft Air-Ride Units', '24/7 Roadside Maintenance', 'Flexible Short/Long Term'],
    coverage: 'National Yard Drop Network',
    turnaround: 'Same-Day Equipment Release',
  },
  'twic-card-assistance': {
    specs: ['TSA Maritime Clearance', 'Port Access Certification', 'Expedited Documentation Help'],
    coverage: 'All US Ports & Terminals',
    turnaround: 'Full End-to-End Processing',
  },
  'insurance-assistance': {
    specs: ['Primary Liability ($1M+)', 'Physical Damage & Cargo', 'Top A-Rated Underwriters'],
    coverage: 'Nationwide Commercial Coverage',
    turnaround: 'Rapid 24-Hour Binder Issuance',
  },
  'factoring-registration': {
    specs: ['Low Industry Rates', 'Zero Hidden Fuel Holdbacks', 'Non-Recourse Protection'],
    coverage: 'All Verified Commercial Brokers',
    turnaround: 'Same-Day QuickPay Funding',
  },
  'specialized-permit-loads': {
    specs: ['Oversize / Overweight Routing', 'Superload Escort Coordination', 'Bridge & Axle Calculations'],
    coverage: 'Multi-State Corridor Filings',
    turnaround: 'Expedited State Clearances',
  },
  'permit-application-support': {
    specs: ['IFTA, IRP, HUT, KYU, NY HUT', 'Automated Renewal Tracking', 'Zero Delay Compliance Guarantee'],
    coverage: 'Federal & All 50 State Agencies',
    turnaround: 'Priority Turnaround',
  },
  'dot-compliance-support': {
    specs: ['FMCSA Audit Preparation', 'Safety Rating Improvements', 'ELD Logbook Compliance Review'],
    coverage: 'Commercial Fleet Operations',
    turnaround: 'Continuous Ongoing Advisory',
  },
}

export function ServicesGrid({
  services = servicesData,
}: ServicesGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeService = services[selectedIndex] || services[0]
  const activeDetails = serviceHighlights[activeService.id] || {
    specs: ['Commercial Logistics Execution', 'Dedicated Carrier Support', 'Direct Contracting'],
    coverage: 'Continental 48 Network',
    turnaround: 'Rapid Onboarding',
  }

  return (
    <section 
      id="services"
      aria-label="Services Section"
      className="py-24 lg:py-32 bg-brand-black text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-industrial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-lime-400 font-mono font-bold uppercase text-xs tracking-widest">
            <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
            <span>Core Capabilities & Freight Solutions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white leading-none">
            Carrier & Freight <span className="text-lime-400">Services.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
            Engineered to maximize fleet revenue, eliminate idle downtime, and keep commercial operators compliant across every mile of American pavement.
          </p>
        </div>

        {/* Master-Detail Interactive Solutions Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Featured Service Spotlight */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 transition-all duration-500">
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-brand-charcoal via-brand-surface to-brand-black p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Corner accent marker */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-bl-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-lime-500 text-black">
                    {serviceIcons[activeService.id] || <Truck className="h-6 w-6" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-lime-400 font-bold block">
                      FEATURED SOLUTION // SPEC 0{selectedIndex + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      CODE: NTS-{activeService.id.toUpperCase().substring(0, 8)}
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-lime-500/10 text-lime-400 border border-lime-500/20">
                  <Sparkles className="h-3 w-3 mr-1 text-lime-400" />
                  ACTIVE SPEC
                </span>
              </div>

              {/* Title & Detailed Narrative */}
              <div className="mt-8 space-y-4">
                <h3 data-testid="spotlight-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Overview: {activeService.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  Operational Parameters:
                </div>
                <div className="space-y-2">
                  {activeDetails.specs.map((spec, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                      <span className="font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coverage & Turnaround Meta */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block mb-1">CORRIDOR COVERAGE</span>
                  <span className="text-white font-semibold flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-lime-400" />
                    {activeDetails.coverage}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">DISPATCH TURNAROUND</span>
                  <span className="text-lime-400 font-bold">{activeDetails.turnaround}</span>
                </div>
              </div>

              {/* Consultation Action Button */}
              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-lime-500/20"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Services Arranged in Grid / List Interaction */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                index={index}
                title={service.title}
                description={service.description}
                backgroundColor={service.backgroundColor}
                textTheme={service.textTheme}
                link={service.link}
                icon={serviceIcons[service.id]}
                isActive={selectedIndex === index}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

