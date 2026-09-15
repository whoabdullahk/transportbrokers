import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import type { ContactFormData, ContactFormValues } from '../../types/contact'
import { submitContactForm } from '../../lib/contactUtils'

export interface ContactFormProps {
  source?: 'hero' | 'cta' | 'contact-page'
  onSuccess?: () => void
}

export function ContactForm({
  source = 'contact-page',
  onSuccess,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormValues, string>> = {}

    if (!values.fullName || values.fullName.trim().length < 2) {
      errs.fullName = 'Full Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email || !emailRegex.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address'
    }

    if (values.phone && values.phone.trim().length > 0) {
      const digitsOnly = values.phone.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        errs.phone = 'Phone number must contain at least 10 digits'
      }
    }

    if (!values.message || values.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    const formData: ContactFormData = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone || undefined,
      company: values.company || undefined,
      message: values.message,
      source,
      timestamp: new Date(),
    }

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setStatusMessage({ type: 'success', text: result.message })
        setValues({ fullName: '', email: '', phone: '', company: '', message: '' })
        onSuccess?.()
      } else {
        setStatusMessage({ type: 'error', text: result.message })
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      id="contact"
      data-testid="contact-form-container"
      className="bg-brand-surface rounded-2xl border border-white/15 shadow-2xl p-8 sm:p-12 max-w-2xl mx-auto text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center space-x-2 text-lime-400 font-mono font-bold uppercase text-xs tracking-widest mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Priority Dispatch Intake</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
          Request A Consultation
        </h3>
        <p className="text-sm sm:text-base text-gray-400 mt-2 font-light leading-relaxed">
          Connect directly with TBI logistics managers for dedicated freight rates, trailer leases, and carrier onboarding.
        </p>
      </div>

      {statusMessage && (
        <div
          role="alert"
          className={`p-4 rounded-xl mb-6 flex items-start space-x-3 text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'bg-lime-500/15 text-lime-300 border border-lime-500/30'
              : 'bg-red-500/15 text-red-300 border border-red-500/30'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-lime-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
            Full Name <span className="text-lime-400">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={values.fullName}
            onChange={handleChange}
            placeholder="John Smith"
            className={`w-full px-4 py-3.5 rounded-lg bg-brand-charcoal border text-sm sm:text-base text-white placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 ${
              errors.fullName ? 'border-red-500 bg-red-950/20' : 'border-white/15 hover:border-white/30'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs font-mono text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
              Email Address <span className="text-lime-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange}
              placeholder="john@carrierfleet.com"
              className={`w-full px-4 py-3.5 rounded-lg bg-brand-charcoal border text-sm sm:text-base text-white placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.email ? 'border-red-500 bg-red-950/20' : 'border-white/15 hover:border-white/30'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-mono text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              placeholder="(443) 000-0000"
              className={`w-full px-4 py-3.5 rounded-lg bg-brand-charcoal border text-sm sm:text-base text-white placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.phone ? 'border-red-500 bg-red-950/20' : 'border-white/15 hover:border-white/30'
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs font-mono text-red-400">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
            Company / Carrier Fleet Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={handleChange}
            placeholder="Apex Freight Logistics LLC"
            className="w-full px-4 py-3.5 rounded-lg bg-brand-charcoal border border-white/15 hover:border-white/30 text-sm sm:text-base text-white placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
            Message / Requirements <span className="text-lime-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={values.message}
            onChange={handleChange}
            placeholder="Specify your equipment types (Dry Van, Reefer, Flatbed), preferred freight corridors, or service requests..."
            className={`w-full px-4 py-3.5 rounded-lg bg-brand-charcoal border text-sm sm:text-base text-white placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 ${
              errors.message ? 'border-red-500 bg-red-950/20' : 'border-white/15 hover:border-white/30'
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-mono text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-8 py-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-lime-500/25 focus:outline-none focus:ring-4 focus:ring-lime-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Request</span>
              <Send className="ml-2 h-4 w-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

