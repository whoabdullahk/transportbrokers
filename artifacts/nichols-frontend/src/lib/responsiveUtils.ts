import { useState, useEffect } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide'

/**
 * Get number of grid columns based on breakpoint or window width
 */
export function getResponsiveColumns(breakpoint: Breakpoint | number): number {
  if (typeof breakpoint === 'number') {
    if (breakpoint < 768) return 1
    if (breakpoint < 1024) return 2
    if (breakpoint < 1440) return 3
    return 4
  }

  switch (breakpoint) {
    case 'mobile':
      return 1
    case 'tablet':
      return 2
    case 'desktop':
      return 3
    case 'wide':
      return 4
    default:
      return 1
  }
}

/**
 * Custom hook to detect media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query, matches])

  return matches
}
