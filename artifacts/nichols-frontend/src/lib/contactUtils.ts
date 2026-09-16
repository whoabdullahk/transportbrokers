import type { ContactFormData, SubmissionResult } from '../types/contact'
import { validateContactForm, sanitizeFormData } from '../types/contact'

/**
 * Submit contact form to API
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<SubmissionResult> {
  if (!validateContactForm(formData)) {
    return {
      success: false,
      message: 'Validation failed. Please check your form entries.',
    }
  }

  try {
    const sanitizedData = sanitizeFormData(formData)

    // Match @workspace/api-server CreateLeadBody schema
    const payload = {
      fullName: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone || '330-756-7732',
      companyName: sanitizedData.company || undefined,
      subject: `Inquiry from ${sanitizedData.source || 'Website'}`,
      serviceInterested: sanitizedData.message.includes('[Service Needed:')
        ? sanitizedData.message.split('\n')[0].replace(/\[Service Needed:\s*|\]/g, '').trim()
        : 'Dedicated Freight Lanes',
      message: sanitizedData.message,
    }

    const baseUrl = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${baseUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      throw new Error(`HTTP ${response.status}: ${errText || response.statusText}`)
    }

    return {
      success: true,
      message: 'Your request has been submitted. Our team will contact you shortly.',
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: 'Submission failed. Please try again or call us directly.',
    }
  }
}
