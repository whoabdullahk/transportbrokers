/**
 * Contact Form Type Definitions
 * Defines the structure for contact form data and validation
 */

export type ContactSource = 'hero' | 'cta' | 'contact-page'

export interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  company?: string
  message: string
  source: ContactSource
  timestamp: Date
}

export interface ContactFormValues {
  fullName: string
  email: string
  phone?: string
  company?: string
  message: string
}

export interface SubmissionResult {
  success: boolean
  message: string
}

/**
 * Email validation regex
 * Validates standard email format: user@domain.tld
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Phone validation regex
 * Validates US phone numbers in various formats
 */
export const PHONE_REGEX = /^[\d\s\-\(\)\+]+$/

/**
 * Validation function for contact form data
 */
export function validateContactForm(data: Partial<ContactFormData>): boolean {
  // Validate full name
  if (!data.fullName || data.fullName.length < 2 || data.fullName.length > 100) {
    return false
  }

  // Validate email
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return false
  }

  // Validate phone if provided
  if (data.phone && data.phone.length > 0) {
    if (!PHONE_REGEX.test(data.phone) || data.phone.length < 10) {
      return false
    }
  }

  // Validate message
  if (!data.message || data.message.length < 10 || data.message.length > 2000) {
    return false
  }

  // Validate source if provided
  if (data.source && !['hero', 'cta', 'contact-page'].includes(data.source)) {
    return false
  }

  return true
}

/**
 * Sanitize form data to prevent XSS attacks
 */
export function sanitizeFormData(data: ContactFormData): ContactFormData {
  return {
    fullName: data.fullName.trim().replace(/[<>]/g, ''),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim().replace(/[<>]/g, ''),
    company: data.company?.trim().replace(/[<>]/g, ''),
    message: data.message.trim().replace(/[<>]/g, ''),
    source: data.source,
    timestamp: data.timestamp,
  }
}
