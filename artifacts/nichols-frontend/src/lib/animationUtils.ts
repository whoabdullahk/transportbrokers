/**
 * Animation Utilities
 * Provides IntersectionObserver helpers for fade-in section reveals
 */
export function setupIntersectionObservers(): IntersectionObserver[] {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return []
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-4')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  const elements = document.querySelectorAll('[data-reveal]')
  elements.forEach((el) => observer.observe(el))

  return [observer]
}

export function cleanupObservers(observers: IntersectionObserver[]): void {
  observers.forEach((obs) => obs.disconnect())
}
