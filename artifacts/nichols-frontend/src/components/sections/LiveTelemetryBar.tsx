import { useEffect, useState } from 'react'

export function LiveTelemetryBar() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' CST'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const corridors = [
    { from: 'LOS ANGELES, CA', to: 'DALLAS, TX', route: 'I-10 E CORRIDOR', status: 'ACTIVE CAPACITY', transit: '28H' },
    { from: 'CHICAGO, IL', to: 'ATLANTA, GA', route: 'I-65 / I-24 S', status: 'LIVE DISPATCH', transit: '14H' },
    { from: 'PORT OF HOUSTON', to: 'MEMPHIS, TN', route: 'I-45 / I-55 N', status: 'TWIC PRIORITY', transit: '11H' },
    { from: 'SAVANNAH, GA', to: 'CHARLOTTE, NC', route: 'I-95 / I-77 N', status: 'EXPEDITED REEFER', transit: '6H' },
    { from: 'SEATTLE, WA', to: 'SALT LAKE CITY, UT', route: 'I-84 / I-15 S', status: 'HEAVY HAUL', transit: '16H' },
  ]

  return (
    <div
      aria-label="Live Freight Network Telemetry"
      className="bg-[#000000] border-y border-white/10 text-white/80 py-3.5 overflow-hidden select-none relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Authority status & live clock */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-[#181818] border border-white/10 text-[#D4AF37]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
            <span className="font-bold tracking-wider">LIVE NETWORK</span>
          </div>

          <div className="text-white/60">
            <span>DISPATCH CLOCK: </span>
            <span className="text-white font-bold tabular-nums">{currentTime}</span>
          </div>
        </div>

        {/* Center / Right: Active Corridors ticker */}
        <div className="flex items-center overflow-x-auto hide-scrollbar space-x-6 w-full md:w-auto">
          {corridors.map((c, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 text-[11px] whitespace-nowrap bg-white/[0.03] px-3 py-1 rounded border border-white/5"
            >
              <span className="text-white font-medium">{c.from}</span>
              <span className="text-[#D4AF37]">&rarr;</span>
              <span className="text-white font-medium">{c.to}</span>
              <span className="text-white/40">[{c.route}]</span>
              <span className="text-[#D4AF37] font-semibold text-[10px] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded">
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
