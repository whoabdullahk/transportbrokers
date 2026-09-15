/**
 * FAQ Utilities
 * Handles accordion item toggle state
 */
export function toggleFAQ(faqId: string, currentOpenIds: string[]): string[] {
  if (!faqId) return currentOpenIds

  const isCurrentlyOpen = currentOpenIds.includes(faqId)

  if (isCurrentlyOpen) {
    return currentOpenIds.filter((id) => id !== faqId)
  } else {
    return [...currentOpenIds, faqId]
  }
}
