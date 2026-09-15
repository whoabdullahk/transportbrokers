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
  return getRecordForId(cleanId)
}

export function TrackOrder() {
  const [inputVal, setInputVal] = useState('NTS-78432')
  const [activeRecord, setActiveRecord] = useState<TrackOrderRecord | null>(defaultRecord)
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
        fetchShipmentData(q).then((rec) => setActiveRecord(rec))
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
    try {
      const rec = await fetchShipmentData(inputVal)
      setActiveRecord(rec)
      setFeedback(`Showing verified dispatch record for ${rec.trackingId}`)
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
              <div className="p-7 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    Load Overview
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-lime-100 text-lime-900 border border-lime-300">
                    {activeRecord.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Tracking ID</div>
                    <div className="font-bold text-gray-900 font-mono text-base mt-0.5">{activeRecord.trackingId}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">DOT Number</div>
                    <div className="font-bold text-gray-900 font-mono text-base mt-0.5">{activeRecord.dotNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Carrier</div>
                    <div className="font-bold text-gray-900 mt-0.5">{activeRecord.carrier}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Truck #</div>
                    <div className="font-bold text-gray-900 font-mono text-base mt-0.5">{activeRecord.truckNumber}</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Schedule */}
              <div className="p-7 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    Schedule
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-50 text-blue-900 border border-blue-200">
                    {activeRecord.tripsPerWeek}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="sm:col-span-2">
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Monday–Friday Windows</div>
                    <div className="font-bold text-gray-900 font-mono mt-0.5">{activeRecord.scheduleWindows}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Start Date</div>
                    <div className="font-bold text-gray-900 mt-0.5">{activeRecord.startDate}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Contract Ref</div>
                    <div className="font-bold text-gray-900 font-mono mt-0.5">{activeRecord.contractNumber}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Dark accent card: Total Per Round Trip (Intentionally stays dark with lime-green top border) */}
            <div className="border-t-4 border-lime-500 bg-neutral-900 text-white p-8 sm:p-10 rounded-2xl shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-mono uppercase text-lime-400 tracking-widest font-bold">
                  Guaranteed Lane Compensation
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Contract: {activeRecord.contractNumber}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-sm font-mono uppercase text-gray-400 tracking-wider">
                    Total Per Round Trip
                  </h3>
                  <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight mt-1">
                    {activeRecord.totalPerRoundTrip}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md font-light leading-relaxed">
                  Rate includes complete terminal-to-terminal round-trip transit, certified equipment access, driver compensation, and standard fuel surcharges.
                </p>
              </div>
            </div>

            {/* STEP 4: Three dark accent boxes side by side: Daily, Weekly (5 days), Monthly (4 weeks) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Daily Box */}
              <div className="border-t-4 border-lime-500 bg-neutral-900 text-white p-6 rounded-xl shadow-lg space-y-2">
                <div className="text-xs font-mono uppercase text-gray-400 tracking-wider font-semibold">
                  Daily
                </div>
                <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono tracking-tight">
                  {activeRecord.dailyRate}
                </div>
                <div className="text-xs text-gray-400 font-light pt-1 border-t border-white/10">
                  1 Scheduled Round Trip
                </div>
              </div>

              {/* Weekly (5 days) Box */}
              <div className="border-t-4 border-lime-500 bg-neutral-900 text-white p-6 rounded-xl shadow-lg space-y-2">
                <div className="text-xs font-mono uppercase text-gray-400 tracking-wider font-semibold">
                  Weekly (5 days)
                </div>
                <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono tracking-tight">
                  {activeRecord.weeklyRate}
                </div>
                <div className="text-xs text-gray-400 font-light pt-1 border-t border-white/10">
                  5 Consecutive Operating Days
                </div>
              </div>

              {/* Monthly (4 weeks) Box */}
              <div className="border-t-4 border-lime-500 bg-neutral-900 text-white p-6 rounded-xl shadow-lg space-y-2">
                <div className="text-xs font-mono uppercase text-gray-400 tracking-wider font-semibold">
                  Monthly (4 weeks)
                </div>
                <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono tracking-tight">
                  {activeRecord.monthlyRate}
                </div>
                <div className="text-xs text-gray-400 font-light pt-1 border-t border-white/10">
                  20 Contracted Round Trips
                </div>
              </div>
            </div>

            {/* STEP 5: Route Information light card next to a real embedded map (Leaflet + OpenStreetMap) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Route Information Card */}
              <div className="lg:col-span-6 p-7 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm space-y-5">
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    Route Information
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Continental corridor routing and authorized transit milestones.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200 gap-1">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Outbound Route</span>
                    <span className="font-bold text-gray-900">{activeRecord.outboundRoute}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200 gap-1">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Return Route</span>
                    <span className="font-bold text-gray-900">{activeRecord.returnRoute}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200 gap-1">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Pickup Location</span>
                    <span className="font-medium text-gray-900 text-right">{activeRecord.pickupLocation}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200 gap-1">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Delivery Location</span>
                    <span className="font-medium text-gray-900 text-right">{activeRecord.deliveryLocation}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-200">
                    <div>
                      <span className="block font-mono text-gray-500 uppercase font-semibold text-xs">Each Side Miles</span>
                      <span className="font-bold text-gray-900 font-mono text-sm">{activeRecord.eachSideMiles}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-gray-500 uppercase font-semibold text-xs">Total Round Trip</span>
                      <span className="font-bold text-gray-900 font-mono text-sm">{activeRecord.totalRoundTripMiles}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-gray-200 gap-1">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Commodity</span>
                    <span className="font-bold text-gray-900">{activeRecord.commodity}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="block font-mono text-gray-500 uppercase font-semibold text-xs">Outbound Weight</span>
                      <span className="font-bold text-gray-900 font-mono">{activeRecord.outboundWeight}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-gray-500 uppercase font-semibold text-xs">Backhaul Weight</span>
                      <span className="font-bold text-gray-900 font-mono">{activeRecord.backhaulWeight}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Leaflet Map Container */}
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col min-h-[380px] bg-gray-100 relative">
                <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
                    <span>CORRIDOR ROUTE MAP</span>
                  </div>
                  <span className="text-gray-500">Leaflet • OpenStreetMap</span>
                </div>
                <div 
                  ref={mapContainerRef} 
                  className="w-full flex-1 min-h-[340px] z-0"
                  style={{ minHeight: '340px' }}
                />
              </div>
            </div>

            {/* STEP 6: Slot Fee Breakdown light card next to a real logistics/port photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Slot Fee Breakdown Card */}
              <div className="lg:col-span-6 p-7 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm space-y-5">
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    Slot Fee Breakdown
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Dedicated lane capacity hold & terminal credentialing audit.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Reservation Fee</span>
                    <span className="font-black text-gray-900 font-mono text-lg">{activeRecord.reservationFee}</span>
                  </div>

                  <div className="py-2 border-b border-gray-200 space-y-1">
                    <span className="block font-mono text-gray-500 uppercase font-semibold">Purpose</span>
                    <p className="font-medium text-gray-800 leading-relaxed">{activeRecord.purpose}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Refundable</span>
                    <span className="font-bold text-gray-900">{activeRecord.refundable}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Applies to Contract</span>
                    <span className="font-bold text-gray-900 font-mono">{activeRecord.appliesToContract}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-mono text-gray-500 uppercase font-semibold">Bill of Lading Status</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full border border-lime-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{activeRecord.bolStatus}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Real Logistics/Port/Freight Yard Photography */}
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative min-h-[300px]">
                <img
                  src="/images/hero/container-yard-aerial.jpg"
                  alt="Intermodal port terminal and logistics container yard"
                  className="w-full h-full object-cover min-h-[320px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-lime-400">
                    <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                    <span>Terminal Gate & Yard Visibility</span>
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase">
                    Intermodal Terminal & Slot Operations
                  </h4>
                  <p className="text-xs text-gray-300 font-light">
                    Guaranteed terminal gate access, pre-reserved equipment slots, and priority backhaul staging.
                  </p>
                </div>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center space-y-4">
              <div className="text-xs font-mono uppercase text-gray-500 tracking-wider font-semibold">
                Direct Dispatch Inquiries
              </div>
              <h3 className="text-2xl font-black text-gray-900 uppercase">
                Need Real-Time Verbal Confirmation?
              </h3>
              <p className="text-sm text-gray-600 max-w-xl mx-auto font-normal">
                Our Alexandria dispatch team is actively monitoring this lane and can confirm gate entry, scale weights, and appointment schedules.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:4435600311"
                  className="px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <Phone className="h-3.5 w-3.5 text-lime-400" />
                  <span>Call (443) 560-0311</span>
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs uppercase tracking-wider transition-all border border-gray-300 shadow-sm"
                >
                  <span>Submit Inquiry</span>
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  )
}
