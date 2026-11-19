import { useEffect, useRef, useState, useMemo } from 'react'

interface TaglineRevealProps {
  className?: string
}

export function TaglineReveal({ className = '' }: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Primary authoritative copy meeting Part A5 & B11 criteria:
  // - Minimum two lines
  // - Clear outcome without pain ("Freight movement without broker friction")
  // - Real logistics metrics ("Two-hour onboarding, transparent rates, accelerated daily factoring")
  // - No hyphens in text per B1
  const copyText =
    'Nationwide freight movement without broker friction. We keep trucks loaded on high yield corridors with two hour onboarding, transparent rates, and accelerated daily factoring.'

  const words = useMemo(() => copyText.split(' '), [copyText])

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Throttled scroll listener via requestAnimationFrame (per B7 & B11 performance rules)
  useEffect(() => {
    if (prefersReducedMotion) return

    let animationFrameId: number | null = null

    const handleScroll = () => {
      if (animationFrameId !== null) return

      animationFrameId = window.requestAnimationFrame(() => {
        if (!containerRef.current) {
          animationFrameId = null
          return
        }

        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Trigger begins when element enters 85% of viewport and completes around 30% from top
        const start = windowHeight * 0.85
        const end = windowHeight * 0.25

        const totalRange = start - end
        const currentPos = start - rect.top
        const progress = Math.min(Math.max(currentPos / totalRange, 0), 1)

        setScrollProgress(progress)
        animationFrameId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial calculate

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [prefersReducedMotion])

  // Highlight words that carry deliberate brand accent
  const isAccentWord = (word: string) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '')
    return ['gold', 'friction', 'accelerated', 'factoring'].includes(clean)
  }

  return (
    <section
      ref={containerRef}
      aria-label="Core Principle and Tagline"
      className={`py-24 sm:py-32 lg:py-40 bg-[#000000] text-white relative overflow-hidden border-y border-white/10 ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Label */}
        <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span>The Brokerage Commitment</span>
        </div>

        {/* Word-by-word reveal typography (Heading 2 / text-4xl sm:text-5xl lg:text-6xl) */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.18] text-balance max-w-4xl">
          {words.map((word, idx) => {
            // Activation threshold for this specific word
            const wordThreshold = (idx / (words.length - 1)) * 0.95
            const isActive = prefersReducedMotion || scrollProgress >= wordThreshold
            const isAccent = isAccentWord(word)

            return (
              <span
                key={idx}
                className={`inline-block mr-[0.28em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? isAccent
                      ? 'text-[#D4AF37] font-semibold opacity-100 transform-none'
                      : 'text-white opacity-100 transform-none'
                    : 'text-white/25 opacity-25 translate-y-1'
                }`}
              >
                {word}
              </span>
            )
          })}
        </h2>

        {/* Supporting proof telemetry row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-white/60 font-mono">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>USDOT 253494 &middot; FMCSA Licensed Broker</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>Direct Port Drayage Access</span>
            <span className="text-[#D4AF37]">&bull;</span>
            <span>48-State Freight Corridor</span>
          </div>
        </div>
      </div>
    </section>
  )
}
