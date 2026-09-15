/**
 * Feature Type Definitions
 * Defines the structure for feature cards in the horizontal scroll section
 */

export interface Feature {
  id: string
  title: string
  description?: string
  image?: string
  order: number
}

/**
 * Validation function for Feature objects
 */
export function validateFeature(feature: Partial<Feature>): feature is Feature {
  return (
    typeof feature.id === 'string' &&
    feature.id.length > 0 &&
    typeof feature.title === 'string' &&
    feature.title.length > 0 &&
    typeof feature.order === 'number' &&
    feature.order > 0 &&
    (feature.description === undefined || typeof feature.description === 'string') &&
    (feature.image === undefined || typeof feature.image === 'string')
  )
}
