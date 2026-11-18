import { useEffect, useState } from 'react'

export function Preloader() {
  const [mounted, setMounted] = useState(true)
  const [fading, setFading] = useState(false)
  const [progress, setProgress] = useState(18)

  useEffect(() => {
    // Simulated realistic telemetry initialization
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const step = Math.floor(Math.random() * 22) + 14
        return Math.min(prev + step, 100)
      })
    }, 110)

    const timer = setTimeout(() => {
      setProgress(100)
      setFading(true)
      const unmountTimer = setTimeout(() => {
        setMounted(false)
      }, 700)
      return () => clearTimeout(unmountTimer)
    }, 1100)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      id="brand-preloader"
      aria-label="Loading Gold Star Transportation Network"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07090D] select-none transition-opacity duration-700 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center px-6">
        {/* Animated Gold Star Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle outer rotating ring */}
          <div className="absolute w-24 h-24 rounded-full border border-[#D4AF37]/20 border-dashed animate-[spin_12s_linear_infinite]" />

          {/* Ambient pulsing ring */}
          <div className="absolute w-20 h-20 rounded-full bg-[#D4AF37]/10 animate-ping opacity-30" />

          {/* Star Icon Badge */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-b from-[#1E2330] to-[#0E121A] border border-[#D4AF37]/40 shadow-[0_0_35px_rgba(212,175,55,0.3)] flex items-center justify-center">
            <svg
              className="w-9 h-9 text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1 mb-8">
          <h2 className="text-xl sm:text-2xl font-black tracking-[0.28em] text-white uppercase drop-shadow-sm">
            GOLD STAR
          </h2>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.38em] text-[#D4AF37] uppercase">
            TRANSPORTATION, INC.
          </p>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-56 sm:w-64">
          <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F4C542] to-[#FFE082] rounded-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-[10px] font-mono tracking-wider text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              CORRIDOR NETWORK
            </span>
            <span className="font-semibold text-[#D4AF37]">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
