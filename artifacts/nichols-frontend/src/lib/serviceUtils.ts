import type { Service, ServiceColor, TextTheme } from '../types/services'
import { servicesData } from '../data/services'

/**
 * Service Card Style Mapping
 * Maps service title to background color and text theme per design spec
 */
export function getServiceCardStyle(serviceTitle: string): {
  backgroundColor: ServiceColor
  textTheme: TextTheme
} {
  const normalizedTitle = serviceTitle.toLowerCase().trim()

  const colorMap: Record<string, { backgroundColor: ServiceColor; textTheme: TextTheme }> = {
    'dedicated freight lanes': { backgroundColor: 'lime', textTheme: 'dark' },
    'trailer rental program': { backgroundColor: 'beige', textTheme: 'dark' },
    'twic card assistance': { backgroundColor: 'black', textTheme: 'light' },
    'insurance assistance': { backgroundColor: 'gray', textTheme: 'dark' },
    'factoring registration': { backgroundColor: 'black', textTheme: 'light' },
    'specialized permit loads': { backgroundColor: 'lime', textTheme: 'dark' },
    'permit application support': { backgroundColor: 'gray', textTheme: 'dark' },
    'dot compliance support': { backgroundColor: 'black', textTheme: 'light' },
  }

  return colorMap[normalizedTitle] || { backgroundColor: 'gray', textTheme: 'dark' }
}

/**
 * Get CSS background class for ServiceColor
 */
export function getServiceBackgroundClass(color: ServiceColor): string {
  switch (color) {
    case 'lime':
      return 'bg-lime-500'
    case 'beige':
      return 'bg-[#F5F5DC]'
    case 'black':
      return 'bg-black'
    case 'gray':
      return 'bg-gray-100'
    default:
      return 'bg-gray-100'
  }
}

/**
 * Load services data asynchronously
 */
export async function loadServicesData(): Promise<Service[]> {
  return servicesData
}
