/**
 * Property-Based Testing Helpers
 * Provides generators and utilities for fast-check property tests
 */

import * as fc from 'fast-check'
import type { ServiceColor, TextTheme } from '../types/services.js'
import type { ContactSource } from '../types/contact.js'

/**
 * Generator for ServiceColor type
 */
export const serviceColorArbitrary = (): fc.Arbitrary<ServiceColor> => {
  return fc.constantFrom<ServiceColor>('lime', 'beige', 'black', 'gray')
}

/**
 * Generator for TextTheme type
 */
export const textThemeArbitrary = (): fc.Arbitrary<TextTheme> => {
  return fc.constantFrom<TextTheme>('light', 'dark')
}

/**
 * Generator for ContactSource type
 */
export const contactSourceArbitrary = (): fc.Arbitrary<ContactSource> => {
  return fc.constantFrom<ContactSource>('hero', 'cta', 'contact-page')
}

/**
 * Generator for valid service titles
 */
export const serviceTitleArbitrary = (): fc.Arbitrary<string> => {
  return fc.constantFrom(
    'Dedicated Freight Lanes',
    'Trailer Rental Program',
    'TWIC Card Assistance',
    'Insurance Assistance',
    'Factoring Registration',
    'Specialized Permit Loads',
    'Permit Application Support',
    'DOT Compliance Support'
  )
}

/**
 * Generator for scroll direction
 */
export const scrollDirectionArbitrary = () => {
  return fc.constantFrom<'left' | 'right'>('left', 'right')
}

/**
 * Generator for valid scroll container properties
 */
export const scrollContainerPropsArbitrary = () => {
  return fc.record({
    scrollLeft: fc.nat({ max: 1000 }),
    scrollWidth: fc.integer({ min: 500, max: 5000 }),
    clientWidth: fc.integer({ min: 300, max: 2000 }),
  })
}

/**
 * Generator for valid email addresses
 */
export const emailArbitrary = (): fc.Arbitrary<string> => {
  return fc.emailAddress()
}

/**
 * Generator for valid phone numbers
 */
export const phoneArbitrary = (): fc.Arbitrary<string> => {
  return fc.oneof(
    fc.constant('555-123-4567'),
    fc.constant('(555) 123-4567'),
    fc.constant('555 123 4567'),
    fc.constant('5551234567'),
    fc.constant('+1 555 123 4567')
  )
}

/**
 * Generator for valid contact form data
 */
export const contactFormDataArbitrary = () => {
  return fc.record({
    fullName: fc.string({ minLength: 2, maxLength: 100 }),
    email: emailArbitrary(),
    phone: fc.option(phoneArbitrary(), { nil: undefined }),
    company: fc.option(fc.string({ maxLength: 100 }), { nil: undefined }),
    message: fc.string({ minLength: 10, maxLength: 2000 }),
    source: contactSourceArbitrary(),
    timestamp: fc.date(),
  })
}

/**
 * Generator for FAQ IDs
 */
export const faqIdArbitrary = (): fc.Arbitrary<string> => {
  return fc.string({ minLength: 1, maxLength: 20 })
}

/**
 * Generator for arrays of FAQ IDs
 */
export const faqIdArrayArbitrary = (): fc.Arbitrary<string[]> => {
  return fc.array(faqIdArbitrary(), { maxLength: 10 })
}
