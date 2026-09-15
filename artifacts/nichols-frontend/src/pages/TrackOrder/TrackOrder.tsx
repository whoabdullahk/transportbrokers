import { useState, useEffect, useRef } from 'react'
import { Link } from 'wouter'
import { Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import L from 'leaflet'

interface TrackOrderRecord {
  trackingId: string
  status: string
  carrier: string
  dotNumber: string
  truckNumber: string
  scheduleWindows: string
  tripsPerWeek: string
  startDate: string
  contractNumber: string
  totalPerRoundTrip: string
  dailyRate: string
  weeklyRate: string
  monthlyRate: string
  outboundRoute: string
  returnRoute: string
  pickupLocation: string
  deliveryLocation: string
  eachSideMiles: string
  totalRoundTripMiles: string
  commodity: string
  outboundWeight: string
  backhaulWeight: string
  reservationFee: string
  purpose: string
  refundable: string
  appliesToContract: string
  bolStatus: string
  originCoords: [number, number]
  destCoords: [number, number]
  originName: string
  destName: string
}

const defaultRecord: TrackOrderRecord = {
  trackingId: 'NTS-78432',
  status: 'ACTIVE CONTRACT • DISPATCHED',
  carrier: 'Transport Brokers Inc. Freight Fleet',
  dotNumber: '2212598',
  truckNumber: 'TRK-9428',
  scheduleWindows: 'Mon–Fri: 06:00 AM – 06:00 PM CST',
  tripsPerWeek: '5 Trips / Week',
  startDate: 'September 15, 2026',
  contractNumber: 'DFA-2026-88',
  totalPerRoundTrip: '$2,450.00',
  dailyRate: '$2,450.00',
  weeklyRate: '$12,250.00',
  monthlyRate: '$49,000.00',
  outboundRoute: 'Alexandria, LA → Dallas, TX',
  returnRoute: 'Dallas, TX → Alexandria, LA',
  pickupLocation: '111 Pecan Row Ln, Alexandria, LA 71303',
  deliveryLocation: '4200 Logistics Pkwy, Dallas, TX 75241',
  eachSideMiles: '312 Miles',
  totalRoundTripMiles: '624 Miles',
  commodity: 'General Dry Van Industrial Freight',
  outboundWeight: '41,200 lbs',
  backhaulWeight: '38,500 lbs',
  reservationFee: '$500.00',
  purpose: 'Dedicated Lane Equipment & Driver Capacity Guarantee',
  refundable: 'Yes (Applied to Final Billing Settlement)',
  appliesToContract: 'DFA-2026-88',
  bolStatus: 'Active & Verified',
  originCoords: [31.3113, -92.4451], // Alexandria, LA
  destCoords: [32.7767, -96.7970],  // Dallas, TX
  originName: 'Alexandria, LA',
  destName: 'Dallas, TX',
}

function getRecordForId(rawId: string): TrackOrderRecord {
  const cleanId = rawId.trim().toUpperCase()
  if (!cleanId) return defaultRecord

  return {
    ...defaultRecord,
    trackingId: cleanId.startsWith('NTS-') ? cleanId : `NTS-${cleanId}`,
    contractNumber: `DFA-${cleanId.replace(/\D/g, '').slice(0, 4) || '2026'}-88`,
    appliesToContract: `DFA-${cleanId.replace(/\D/g, '').slice(0, 4) || '2026'}-88`,
  }
}

async function fetchShipmentData(rawId: string): Promise<TrackOrderRecord> {
  const cleanId = rawId.trim().toUpperCase()
  if (!cleanId) return defaultRecord

  try {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${baseUrl}/api/shipments/${encodeURIComponent(cleanId)}`)
    if (res.ok) {
      const data = await res.json()
      return {
        ...defaultRecord,
        trackingId: data.trackingNumber || cleanId,
        status: (data.status || 'Active Contract • Dispatched').toUpperCase(),
        carrier: data.carrierName || defaultRecord.carrier,
        outboundRoute: `${data.origin || 'Alexandria, LA'} → ${data.destination || 'Dallas, TX'}`,
        returnRoute: `${data.destination || 'Dallas, TX'} → ${data.origin || 'Alexandria, LA'}`,
        pickupLocation: `${data.origin || 'Alexandria, LA'} Regional Logistics Hub`,
        deliveryLocation: `${data.destination || 'Dallas, TX'} Distribution Terminal`,
        reservationFee: data.pendingFees || defaultRecord.reservationFee,
        startDate: data.estimatedDelivery
          ? new Date(data.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : defaultRecord.startDate,
        contractNumber: `DFA-${cleanId.replace(/\D/g, '').slice(0, 4) || '2026'}-88`,
        appliesToContract: `DFA-${cleanId.replace(/\D/g, '').slice(0, 4) || '2026'}-88`,
      }
    }
  } catch {
    // API not reachable or offline, fallback smoothly
  }
  return null
}

export function TrackOrder() {
  const [inputVal, setInputVal] = useState('')
  const [activeRecord, setActiveRecord] = useState<TrackOrderRecord | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Parse URL query parameter (e.g. ?tracking_id=78432 or ?bol=NTS-78432)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const q = params.get('tracking_id') || params.get('bol') || params.get('id')
      if (q) {
        setInputVal(q)
        fetchShipmentData(q).then((rec) => {
          if (rec) setActiveRecord(rec)
          else setFeedback(`Tracking ID ${q} not found.`)
        })
      }
    }
  }, [])

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || !activeRecord) return

    // Teardown previous instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    try {
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      })
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const origin = activeRecord.originCoords
      const destination = activeRecord.destCoords

      const customOriginIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background:#0f172a;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;border:2px solid #84cc16;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.35);display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#84cc16;"></span>ORIGIN: ${activeRecord.originName}</div>`,
        iconSize: [160, 32],
        iconAnchor: [80, 16],
      })

      const customDestIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background:#0f172a;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;border:2px solid #38bdf8;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.35);display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#38bdf8;"></span>DEST: ${activeRecord.destName}</div>`,
        iconSize: [150, 32],
        iconAnchor: [75, 16],
      })

      L.marker(origin, { icon: customOriginIcon }).addTo(map)
      L.marker(destination, { icon: customDestIcon }).addTo(map)

      // Polyline route through Shreveport corridor
      const midpoint: [number, number] = [32.45, -94.3]
      const routeLine = L.polyline([origin, midpoint, destination], {
        color: '#16a34a',
        weight: 5,
        opacity: 0.9,
        dashArray: '10, 8',
      }).addTo(map)

      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] })
    } catch {
      // Graceful fallback if leaflet cannot render
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [activeRecord])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    setIsLoading(true)
    setFeedback(null)
    try {
      const rec = await fetchShipmentData(inputVal)
      if (rec) {
        setActiveRecord(rec)
        setFeedback(`Showing verified dispatch record for ${rec.trackingId}`)
      } else {
        setActiveRecord(null)
        setFeedback(`Tracking ID ${inputVal} not found. Please verify and try again.`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO SECTION: Light background, simple headline, subtext, plain input, black pill button */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Track your order
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal">
            Enter your tracking ID below for real-time dispatch updates, transit telemetry, schedule windows, and carrier verification.
          </p>

          {/* Form with plain text input labeled TRACKING ID and black pill button */}
          <form onSubmit={handleSubmit} className="pt-4 max-w-2xl mx-auto">
            <div className="space-y-2 text-left">
              <label htmlFor="trackingIdInput" className="block text-xs font-mono uppercase font-bold text-gray-700 tracking-wider">
                TRACKING ID
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="trackingIdInput"
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. NTS-78432"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white border border-gray-300 text-gray-900 font-mono text-base placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md shrink-0 inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isLoading ? 'Locating...' : 'Track Order'}</span>
                  <ArrowRight className="h-4 w-4 text-lime-400" />
                </button>
              </div>
            </div>

            {feedback && (
              <div className="text-xs font-mono text-gray-600 pt-3 text-left flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-lime-600" />
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 2. RESULTS CONTAINER */}
      {activeRecord && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* STEP 2: Two light cards side by side: 'Load Overview' & 'Schedule' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Load Overview */}
            {/* 2A. QUICK STATS: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Load Overview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <ShieldCheck className="w-32 h-32 text-black" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-black">
                      Load Overview
                    </h3>
                    <span className="px-3 py-1 bg-lime-100 text-lime-700 text-[10px] font-bold uppercase tracking-widest rounded-full font-mono border border-lime-200">
                      {activeRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                        Tracking ID
                      </div>
                      <div className="font-bold text-gray-900">{activeRecord.trackingId}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                        DOT Number
                      </div>
                      <div className="font-bold text-gray-900">{activeRecord.dotNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                        Carrier
                      </div>
                      <div className="font-bold text-gray-900">{activeRecord.carrier}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                        Truck #
                      </div>
                      <div className="font-bold text-gray-900">{activeRecord.truckNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-black">
                      Schedule
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {activeRecord.tripsPerWeek}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                        Monday–Friday Windows
                      </div>
                      <div className="font-bold text-gray-900">{activeRecord.scheduleWindows}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                          Start Date
                        </div>
                        <div className="font-bold text-gray-900">{activeRecord.startDate}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 font-mono">
                          Contract Ref
                        </div>
                        <div className="font-bold text-gray-900">{activeRecord.contractNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 2B. RATE & COMPENSATION: Dark Theme */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800">
              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800">
                <div>
                  <div className="text-lime-400 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">
                    Guaranteed Lane Compensation
                  </div>
                  <div className="text-gray-400 text-xs font-mono mb-1 uppercase tracking-wider">
                    Total Per Round Trip
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                    {activeRecord.totalPerRoundTrip}
                  </div>
                </div>
                <div className="md:text-right max-w-sm">
                  <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    Contract: {activeRecord.contractNumber}
                  </div>
                  <p className="text-sm text-gray-400">
                    Rate includes complete terminal-to-terminal round-trip transit, certified equipment access, driver compensation, and standard fuel surcharges.
                  </p>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
                <div className="p-6">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Daily</div>
                  <div className="text-2xl font-black text-lime-400 font-mono mb-1">{activeRecord.dailyRate}</div>
                  <div className="text-xs text-gray-500">1 Scheduled Round Trip</div>
                </div>
                <div className="p-6 bg-neutral-900/50">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Weekly (5 Days)</div>
                  <div className="text-2xl font-black text-lime-400 font-mono mb-1">{activeRecord.weeklyRate}</div>
                  <div className="text-xs text-gray-500">5 Consecutive Operating Days</div>
                </div>
                <div className="p-6 bg-neutral-800/20">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Monthly (4 Weeks)</div>
                  <div className="text-2xl font-black text-lime-400 font-mono mb-1">{activeRecord.monthlyRate}</div>
                  <div className="text-xs text-gray-500">20 Contracted Round Trips</div>
                </div>
              </div>
            </div>

            {/* 2C. ROUTING & MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Route Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-2">
                  Route Information
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Continental corridor routing and authorized transit milestones.
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Outbound Route</span>
                    <span className="font-bold text-gray-900 text-sm">{activeRecord.outboundRoute}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Return Route</span>
                    <span className="font-bold text-gray-900 text-sm">{activeRecord.returnRoute}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Pickup Location</span>
                    <span className="font-bold text-gray-900 text-sm text-right max-w-[60%]">{activeRecord.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Delivery Location</span>
                    <span className="font-bold text-gray-900 text-sm text-right max-w-[60%]">{activeRecord.deliveryLocation}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-1">Each Side Miles</div>
                      <div className="font-bold text-gray-900 text-sm">{activeRecord.eachSideMiles}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-1">Total Round Trip</div>
                      <div className="font-bold text-gray-900 text-sm">{activeRecord.totalRoundTripMiles}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Commodity</span>
                    <span className="font-bold text-gray-900 text-sm">{activeRecord.commodity}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-1">Outbound Weight</div>
                      <div className="font-bold text-gray-900 text-sm">{activeRecord.outboundWeight}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-1">Backhaul Weight</div>
                      <div className="font-bold text-gray-900 text-sm">{activeRecord.backhaulWeight}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm flex flex-col min-h-[400px]">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Corridor Route Map</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">Leaflet • OpenStreetMap</span>
                </div>
                <div 
                  ref={mapContainerRef}
                  className="flex-1 w-full bg-gray-100 rounded-lg overflow-hidden relative z-0 border border-gray-200"
                  style={{ minHeight: '350px' }}
                />
              </div>

            </div>

            {/* 2D. BOTTOM SECTION: Slot Fee & Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-black mb-1">
                    Slot Fee Breakdown
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Dedicated lane capacity hold & terminal credentialing audit.
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Reservation Fee</span>
                      <span className="font-mono font-bold text-gray-900 text-base">{activeRecord.reservationFee}</span>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-1">Purpose</div>
                      <div className="font-bold text-gray-900 text-sm">{activeRecord.purpose}</div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Refundable</span>
                      <span className="font-bold text-gray-900 text-sm">{activeRecord.refundable}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Applies to Contract</span>
                      <span className="font-bold text-gray-900 text-sm font-mono">{activeRecord.appliesToContract}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Bill of Lading Status</span>
                      <span className="px-3 py-1 bg-lime-50 text-lime-700 text-xs font-bold rounded-full border border-lime-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {activeRecord.bolStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle / Branding Image */}
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 min-h-[300px] group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src="/images/services/intermodal.jpg" 
                  alt="Freight terminal operations"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-widest text-lime-400 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
                    Terminal Gate & Yard Visibility
                  </div>
                  <h4 className="text-white font-black uppercase tracking-wide text-lg leading-tight mb-2">
                    Intermodal Terminal & Slot Operations
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
                    Guaranteed terminal gate access, pre-reserved equipment slots, and priority backhaul staging.
                  </p>
                </div>
              </div>

            </div>

            {/* CALL TO ACTION BLOCK */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center max-w-4xl mx-auto mt-8 mb-12 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono mb-4">Direct Dispatch Inquiries</div>
              <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-3">
                Need real-time verbal confirmation?
              </h3>
              <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
                Our Alexandria dispatch team is actively monitoring this lane and can confirm gate entry, scale weights, and appointment schedules.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="tel:4435600311"
                  className="px-6 py-3 rounded-full bg-black text-white font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-lime-400" />
                  Call (443) 560-0311
                </a>
                <Link href="/contact-us">
                  <button className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider inline-flex items-center border border-gray-300 hover:border-black transition-colors">
                    Submit Inquiry
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>
      ) : (
        <section className="bg-neutral-900 py-32 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
              Ready to haul more freight with a broker that has your back?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join the carriers who trust Nichols Transportation Services for consistent lanes and real support.
            </p>
            <Link href="/carrier-services">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-wider inline-flex items-center gap-3 hover:bg-lime-400 transition-colors">
                Get Started Today
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-lime-400 shadow-sm">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
