import { describe, it, expect, vi } from 'vitest'
import { getServiceCardStyle, getServiceBackgroundClass } from './serviceUtils'
import { navigateScroll } from './scrollUtils'
import { toggleFAQ } from './faqUtils'
import { getResponsiveColumns } from './responsiveUtils'
import { validateContactForm, sanitizeFormData } from '../types/contact'

describe('Service Utilities', () => {
  it('maps service titles to correct colors and text themes', () => {
    expect(getServiceCardStyle('Dedicated Freight Lanes')).toEqual({
      backgroundColor: 'lime',
      textTheme: 'dark',
    })
    expect(getServiceCardStyle('Trailer Rental Program')).toEqual({
      backgroundColor: 'beige',
      textTheme: 'dark',
    })
    expect(getServiceCardStyle('TWIC Card Assistance')).toEqual({
      backgroundColor: 'black',
      textTheme: 'light',
    })
    expect(getServiceCardStyle('Insurance Assistance')).toEqual({
      backgroundColor: 'gray',
      textTheme: 'dark',
    })
    expect(getServiceCardStyle('Factoring Registration')).toEqual({
      backgroundColor: 'black',
      textTheme: 'light',
    })
    expect(getServiceCardStyle('Specialized Permit Loads')).toEqual({
      backgroundColor: 'lime',
      textTheme: 'dark',
    })
    expect(getServiceCardStyle('Permit Application Support')).toEqual({
      backgroundColor: 'gray',
      textTheme: 'dark',
    })
    expect(getServiceCardStyle('DOT Compliance Support')).toEqual({
      backgroundColor: 'black',
      textTheme: 'light',
    })
  })

  it('defaults unknown titles to gray with dark text', () => {
    expect(getServiceCardStyle('Unknown Service')).toEqual({
      backgroundColor: 'gray',
      textTheme: 'dark',
    })
  })

  it('returns valid background CSS classes', () => {
    expect(getServiceBackgroundClass('lime')).toBe('bg-lime-500')
    expect(getServiceBackgroundClass('beige')).toBe('bg-[#F5F5DC]')
    expect(getServiceBackgroundClass('black')).toBe('bg-black')
    expect(getServiceBackgroundClass('gray')).toBe('bg-gray-100')
  })
})

describe('Scroll Utilities', () => {
  it('navigates scroll container smoothly to the right and left', () => {
    const scrollTo = vi.fn()
    const fakeContainer = {
      scrollLeft: 100,
      clientWidth: 500,
      scrollWidth: 1500,
      scrollTo,
    } as unknown as HTMLElement

    navigateScroll('right', fakeContainer)
    expect(scrollTo).toHaveBeenCalledWith({
      left: 500, // 100 + 500*0.8 = 500
      behavior: 'smooth',
    })

    navigateScroll('left', fakeContainer)
    expect(scrollTo).toHaveBeenCalledWith({
      left: 0, // max(0, 100 - 400) = 0
      behavior: 'smooth',
    })
  })

  it('handles null scroll container gracefully', () => {
    expect(() => navigateScroll('right', null)).not.toThrow()
  })
})

describe('FAQ Utilities', () => {
  it('toggles FAQ item open and closed', () => {
    let openIds = ['faq-1']
    openIds = toggleFAQ('faq-2', openIds)
    expect(openIds).toContain('faq-2')
    expect(openIds).toContain('faq-1')

    openIds = toggleFAQ('faq-1', openIds)
    expect(openIds).not.toContain('faq-1')
    expect(openIds).toContain('faq-2')
  })
})

describe('Responsive Utilities', () => {
  it('returns appropriate column counts by breakpoint string', () => {
    expect(getResponsiveColumns('mobile')).toBe(1)
    expect(getResponsiveColumns('tablet')).toBe(2)
    expect(getResponsiveColumns('desktop')).toBe(3)
    expect(getResponsiveColumns('wide')).toBe(4)
  })

  it('returns appropriate column counts by window width number', () => {
    expect(getResponsiveColumns(500)).toBe(1)
    expect(getResponsiveColumns(800)).toBe(2)
    expect(getResponsiveColumns(1200)).toBe(3)
    expect(getResponsiveColumns(1600)).toBe(4)
  })
})

describe('Contact Form Validation & Sanitization', () => {
  it('validates contact form correctly', () => {
    expect(
      validateContactForm({
        fullName: 'John Doe',
        email: 'john@example.com',
        message: 'Need freight transport services.',
      })
    ).toBe(true)

    expect(
      validateContactForm({
        fullName: 'J', // too short
        email: 'john@example.com',
        message: 'Need freight transport services.',
      })
    ).toBe(false)

    expect(
      validateContactForm({
        fullName: 'John Doe',
        email: 'invalid-email',
        message: 'Need freight transport services.',
      })
    ).toBe(false)
  })

  it('sanitizes input values against HTML/XSS', () => {
    const sanitized = sanitizeFormData({
      fullName: 'John <script>alert(1)</script>',
      email: 'JOHN@EXAMPLE.COM',
      message: 'Hello <b>world</b>',
      source: 'contact-page',
      timestamp: new Date(),
    })

    expect(sanitized.fullName).not.toContain('<')
    expect(sanitized.fullName).not.toContain('>')
    expect(sanitized.email).toBe('john@example.com')
    expect(sanitized.message).not.toContain('<')
  })
})
