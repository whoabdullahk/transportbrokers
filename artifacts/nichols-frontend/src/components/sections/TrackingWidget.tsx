import { useState } from 'react'
import { Search, MapPin, Clock, Truck, ShieldCheck, CheckCircle2, ArrowRight, Activity, Loader2 } from 'lucide-react'

interface ShipmentCheckpoint {
  time: string
  location: string
  status: string
  completed: boolean
}

interface ShipmentData {
  trackingId: string
  status: string
  statusType: 'in-transit' | 'delivered' | 'pending'
  origin: string
  destination: string
  eta: string
  progress: number
  milesRemaining: number
  totalMiles: number
  equipment: string
  carrierRef: string
  checkpoints: ShipmentCheckpoint[]
}

const demoShipment: ShipmentData = {
  trackingId: 'NTS-78432',
  status: 'IN TRANSIT • ON SCHEDULE',
  statusType: 'in-transit',
  origin: 'Houston, TX (Terminal 4)',
  destination: 'Atlanta, GA (Logistics Hub)',
  eta: 'Tomorrow, 08:30 AM EST',
  progress: 74,
  milesRemaining: 215,
  totalMiles: 827,
  equipment: "53' Air-Ride Dry Van",
  carrierRef: 'NTS-UNIT-409',
  checkpoints: [
    { time: '06:15 AM CST', location: 'Houston Terminal 4, TX', status: 'Shipment Loaded & Dispatched', completed: true },
    { time: '11:40 AM CST', location: 'Lake Charles, LA Corridor', status: 'Scale & Fuel Gateway Verified', completed: true },
    { time: '04:25 PM CST', location: 'Baton Rouge, LA Terminal', status: 'DOT Rest & Safety Logged', completed: true },
    { time: 'CURRENT', location: 'Meridian, MS Interstate 20', status: 'Rolling In Transit (65 MPH)', completed: true },
    { time: 'Est. 08:30 AM EST', location: 'Atlanta Logistics Hub, GA', status: 'Dock Appointment Confirmed', completed: false },
  ],
}

export function TrackingWidget() {
  const [trackingCode, setTrackingCode] = useState('NTS-78432')
  const [activeShipment, setActiveShipment] = useState<ShipmentData | null>(demoShipment)
  const [isSearching, setIsSearching] = useState(false)
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingCode.trim()) return

    setIsSearching(true)
    setSearchFeedback(null)

    setTimeout(() => {
      setIsSearching(false)
      setActiveShipment({
        ...demoShipment,
        trackingId: trackingCode.toUpperCase().trim(),
      })
      setSearchFeedback(`Active telemetry loaded for load #${trackingCode.toUpperCase().trim()}`)
    }, 600)
  }

  return (
    <section 
      id="track"
      aria-label="Track Shipment Section"
      className="py-24 lg:py-32 bg-brand-charcoal text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-industrial opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime-400 uppercase tracking-widest px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
            <Activity className="h-3.5 w-3.5 text-lime-400 animate-pulse" />
            <span>Real-Time Fleet Telemetry</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Track Your <span className="text-lime-400">Shipment.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Instant operational visibility across every dispatch mile. Enter your TBI bill of lading or load reference below.
          </p>
        </div>

        {/* Tracking Input Container */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter BOL / Tracking ID (e.g. NTS-78432)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-brand-surface border border-white/15 text-white font-mono text-sm sm:text-base tracking-wider uppercase placeholder:text-gray-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-lime-500/20 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <span>Track Shipment</span>
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Explanation Pills Below Input */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-gray-400">
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-lime-400 mr-1.5" />
              Real-time load status
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-lime-400 mr-1.5" />
              Live route telemetry
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-lime-400 mr-1.5" />
              Verified delivery schedule
            </span>
          </div>

          {searchFeedback && (
            <p className="mt-3 text-center text-xs font-mono text-lime-400">
              {searchFeedback}
            </p>
          )}
        </div>

        {/* Live Tracking Product Display */}
        {activeShipment && (
          <div className="max-w-4xl mx-auto rounded-2xl bg-brand-surface border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Header: ID, Status, Timestamp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                  LOAD TELEMETRY RECORD
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-0.5 tracking-tight">
                  #{activeShipment.trackingId}
                </div>
              </div>

              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="h-2 w-2 rounded-full bg-lime-400 animate-ping mr-2" />
                {activeShipment.status}
              </div>
            </div>

            {/* Route Origin → Destination Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-white/10 items-center">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-gray-400">Origin Terminal</div>
                <div className="text-lg font-bold text-white flex items-center">
                  <MapPin className="h-4 w-4 text-lime-400 mr-1.5 flex-shrink-0" />
                  <span>{activeShipment.origin}</span>
                </div>
                <div className="text-xs text-gray-400">Departed on schedule</div>
              </div>

              {/* Progress Visual */}
              <div className="space-y-2 text-center">
                <div className="text-xs font-mono text-lime-400 uppercase font-bold">
                  {activeShipment.progress}% OF ROUTE COMPLETE
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-lime-500 rounded-full transition-all duration-700" 
                    style={{ width: `${activeShipment.progress}%` }} 
                  />
                </div>
                <div className="text-[11px] font-mono text-gray-400">
                  {activeShipment.milesRemaining} miles to destination ({activeShipment.totalMiles} total)
                </div>
              </div>

              <div className="space-y-1 md:text-right">
                <div className="text-xs font-mono uppercase text-gray-400">Destination Hub</div>
                <div className="text-lg font-bold text-white flex items-center md:justify-end">
                  <MapPin className="h-4 w-4 text-lime-400 mr-1.5 flex-shrink-0" />
                  <span>{activeShipment.destination}</span>
                </div>
                <div className="text-xs text-lime-400 font-mono font-semibold flex items-center md:justify-end">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>ETA: {activeShipment.eta}</span>
                </div>
              </div>
            </div>

            {/* Equipment & Dispatch Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs font-mono">
              <div>
                <span className="text-gray-400 block mb-1">EQUIPMENT TYPE</span>
                <span className="text-white font-bold flex items-center">
                  <Truck className="h-3.5 w-3.5 mr-1 text-lime-400" />
                  {activeShipment.equipment}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">POWER UNIT ID</span>
                <span className="text-white font-bold">{activeShipment.carrierRef}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">DISPATCH DESK</span>
                <span className="text-white font-bold">TBI Logistics Control</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">INSURANCE VERIFIED</span>
                <span className="text-lime-400 font-bold flex items-center">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                  Active $1M Policy
                </span>
              </div>
            </div>

            {/* Milestone Checkpoint Timeline */}
            <div className="pt-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold">
                Milestone Audit Log:
              </div>
              <div className="space-y-3">
                {activeShipment.checkpoints.map((cp, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-start space-x-3">
                      <span className={`h-2 w-2 rounded-full mt-1.5 ${
                        cp.completed ? 'bg-lime-400' : 'bg-gray-600'
                      }`} />
                      <div>
                        <div className="font-semibold text-white">{cp.status}</div>
                        <div className="text-xs text-gray-400 font-mono">{cp.location}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400 flex-shrink-0 ml-4">
                      {cp.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
