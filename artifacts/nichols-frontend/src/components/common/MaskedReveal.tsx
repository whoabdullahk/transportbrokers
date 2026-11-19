import { useEffect, useRef, useState, type ReactNode } from 'react'

interface MaskedRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  threshold?: number
}

/**
 * Split-text masked reveal component.
 * Content slides up from an overflow-hidden container upon entering viewport.
 * Standard Awwwards editorial curtain-reveal pattern.
 */
export function MaskedReveal({
  children,
  delay = 0,
  className = '',
  threshold = 0.15,
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true)
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
          opacity: isVisible ? 1 : 0.2,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
