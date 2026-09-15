/**
 * Service Type Definitions
 * Defines the structure for service offerings displayed in the services grid
 */

export type ServiceColor = 'lime' | 'beige' | 'black' | 'gray'

export type TextTheme = 'light' | 'dark'

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  backgroundColor: ServiceColor
  textTheme: TextTheme
  link: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Validation function for Service objects
 */
export function validateService(service: Partial<Service>): service is Service {
  return (
    typeof service.id === 'string' &&
    service.id.length > 0 &&
    typeof service.title === 'string' &&
    service.title.length >= 3 &&
    service.title.length <= 100 &&
    typeof service.description === 'string' &&
    service.description.length >= 10 &&
    service.description.length <= 500 &&
    typeof service.backgroundColor === 'string' &&
    ['lime', 'beige', 'black', 'gray'].includes(service.backgroundColor) &&
    typeof service.textTheme === 'string' &&
    ['light', 'dark'].includes(service.textTheme) &&
    typeof service.link === 'string' &&
    service.link.length > 0
  )
}
