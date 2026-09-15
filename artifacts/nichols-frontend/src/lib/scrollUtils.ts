/**
 * Scroll Utilities
 * Handles horizontal scroll container navigation with boundary checks
 */
export function navigateScroll(
  direction: 'left' | 'right',
  scrollContainer: HTMLElement | null
): void {
  if (!scrollContainer) return

  const currentScroll = scrollContainer.scrollLeft
  const containerWidth = scrollContainer.clientWidth
  const scrollAmount = containerWidth * 0.8 // Scroll 80% of container width

  const targetScroll =
    direction === 'right' ? currentScroll + scrollAmount : currentScroll - scrollAmount

  const maxScroll = scrollContainer.scrollWidth - containerWidth
  const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll))

  scrollContainer.scrollTo({
    left: clampedTarget,
    behavior: 'smooth',
  })
}
