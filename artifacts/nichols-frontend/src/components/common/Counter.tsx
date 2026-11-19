import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  end: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/**
 * High-precision rolling number counter with spring deceleration.
 * Renders in tabular monospace font to prevent layout jitter.
 */
export function Counter({
  end,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1600,
  className = '',
}: CounterProps) {
  const [val, setVal] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(end)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted, end])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number | null = null
    let animId: number | null = null

    // Ease-out cubic function: 1 - Math.pow(1 - progress, 3)
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeProgress = 1 - Math.pow(1 - progress, 3.5)
      const currentVal = easeProgress * end

      setVal(currentVal)

      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      } else {
        setVal(end)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [hasStarted, end, duration])

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString()

  return (
    <span ref={containerRef} className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
