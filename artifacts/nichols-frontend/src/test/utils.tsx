/**
 * Test Utilities
 * Provides helper functions and custom render methods for testing
 */

import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

/**
 * Create a mock HTMLElement with scroll properties for testing
 */
export function createMockScrollContainer(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number
): HTMLElement {
  const element = document.createElement('div')
  
  Object.defineProperties(element, {
    scrollLeft: {
      value: scrollLeft,
      writable: true,
      configurable: true,
    },
    scrollWidth: {
      value: scrollWidth,
      writable: false,
      configurable: true,
    },
    clientWidth: {
      value: clientWidth,
      writable: false,
      configurable: true,
    },
    scrollTo: {
      value: function (options: { left: number; behavior?: string }) {
        this.scrollLeft = options.left
      },
      writable: true,
      configurable: true,
    },
  })
  
  return element
}

/**
 * Wait for a specific condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  timeout = 1000,
  interval = 50
): Promise<void> {
  const startTime = Date.now()
  
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition')
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
  }
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'
