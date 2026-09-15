import { useState } from 'react'
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Send, Loader2, AlertCircle } from 'lucide-react'
import { submitContactForm } from '../../lib/contactUtils'

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceNeeded: 'Dedicated Freight Lanes',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full Name must be at least 2 characters'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid business email'
    }
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '')
      if (digits.length < 10) {
        errs.phone = 'Phone must contain at least 10 digits'
      }
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide details of at least 10 characters'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      const fullMessage = `[Service Needed: ${formData.serviceNeeded}]\n${formData.message}`
      const res = await submitContactForm({
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
        source: 'contact-page',
        timestamp: new Date(),
      })

      if (res.success) {
        setSubmissionStatus({
          type: 'success',
          message: 'Thank you for reaching out. An Alexandria logistics manager will contact you shortly.',
        })
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          serviceNeeded: 'Dedicated Freight Lanes',
          message: '',
        })
      } else {
        setSubmissionStatus({
          type: 'error',
          message: res.message || 'Submission failed. Please call our direct line at (443) 560-0311.',
        })
      }
    } catch {
      setSubmissionStatus({
        type: 'error',
        message: 'Network issue. Please call our direct line at (443) 560-0311.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white text-gray-900 selection:bg-lime-500 selection:text-black">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-16 border-b border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-gray-800 uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
              <ShieldCheck className="h-4 w-4 text-gray-700" />
              <span>Direct Operations & Dispatch Desk</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Get Started with TBI.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
              Connect with our Alexandria operations center to request a freight quote, initiate carrier onboarding, or coordinate specialized equipment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT & FORM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Company Information, Verified Credentials & Real Facility Photo */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-gray-500 tracking-widest font-semibold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                  Headquarters & Verification
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
                  Transport Brokers Inc.
                </h2>
                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  Direct dispatch lines, licensed motor brokerage authority, and verified freight coordination desk.
                </p>
              </div>

              {/* Verified Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex items-start space-x-4 shadow-sm">
                  <div className="p-3 rounded-lg bg-lime-100 text-gray-900 border border-lime-300 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Direct Phone Channels</div>
                    <a href="tel:4435600311" className="block text-base font-bold text-gray-900 hover:text-black transition-colors">
                      (443) 560-0311 <span className="text-xs text-gray-500 font-normal font-mono">— Primary Operations</span>
                    </a>
                    <a href="tel:4435600542" className="block text-sm font-semibold text-gray-700 hover:text-black transition-colors">
                      (443) 560-0542 <span className="text-xs text-gray-500 font-normal font-mono">— Secondary Dispatch</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex items-start space-x-4 shadow-sm">
                  <div className="p-3 rounded-lg bg-lime-100 text-gray-900 border border-lime-300 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Email Inquiries</div>
                    <a href="mailto:brandon@TBItransportation.com" className="block text-sm font-bold text-gray-900 hover:text-black transition-colors">
                      brandon@TBItransportation.com
                    </a>
                    <a href="mailto:billing@TBItransportation.com" className="block text-sm font-semibold text-gray-700 hover:text-black transition-colors">
                      billing@TBItransportation.com
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 flex items-start space-x-4 shadow-sm">
                  <div className="p-3 rounded-lg bg-lime-100 text-gray-900 border border-lime-300 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase text-gray-500 font-semibold">Operating Terminal & Office</div>
                    <div className="text-sm font-bold text-gray-900">
                      111 Pecan Row Ln
                    </div>
                    <div className="text-xs text-gray-600">
                      Alexandria, LA 71303
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Photography Card: Alexandria Terminal & Operations */}
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="relative h-44 w-full">
                  <img
                    src="/images/services/fleet-warehouse.jpg"
                    alt="TBI Regional Operations & Logistics Dispatch Center"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-mono uppercase text-lime-400 font-bold">Alexandria Logistics Center</div>
                    <div className="text-xs text-gray-200">Active regional dispatch & carrier terminal operations</div>
                  </div>
                </div>
              </div>

              {/* Regulatory Box */}
              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 space-y-3 shadow-sm">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-gray-800 font-bold">
                  <ShieldCheck className="h-4 w-4 text-gray-900" />
                  <span>Federal Operating Authority</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-1">
                  <div>
                    <div className="text-gray-500 font-semibold">USDOT NUMBER</div>
                    <div className="text-gray-900 font-bold text-base">2212598</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold">MC NUMBER</div>
                    <div className="text-gray-900 font-bold text-base">MC-172356</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 pt-1 font-normal">
                  Active authorized freight brokerage operating in full compliance with FMCSA safety mandates.
                </div>
              </div>
            </div>

            {/* Right Column: High-Conversion Light Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Complete the form below and an Alexandria logistics specialist will respond within 30 minutes.
                  </p>
                </div>

                {submissionStatus && (
                  <div
                    className={`p-4 rounded-lg flex items-start space-x-3 text-xs ${
                      submissionStatus.type === 'success'
                        ? 'bg-lime-50 border border-lime-300 text-gray-900'
                        : 'bg-red-50 border border-red-300 text-red-700'
                    }`}
                  >
                    {submissionStatus.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-lime-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                    )}
                    <span className="font-medium">{submissionStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                      />
                      {errors.fullName && <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Logistics Fleet LLC"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                      />
                      {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                      />
                      {errors.phone && <p className="text-xs text-red-600 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service Needed */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                      Service Needed *
                    </label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                    >
                      <option value="Dedicated Freight Lanes">Dedicated Freight Lanes</option>
                      <option value="Trailer Rental Program">Trailer Rental Program</option>
                      <option value="TWIC Card Assistance">TWIC Card Assistance</option>
                      <option value="Insurance Assistance">Insurance Assistance</option>
                      <option value="Factoring Registration">Factoring Registration</option>
                      <option value="Specialized Permit Loads">Specialized Permit Loads</option>
                      <option value="Permit Application Support">Permit Application Support</option>
                      <option value="DOT Compliance Support">DOT Compliance Support</option>
                      <option value="General Freight Inquiry">General Freight Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-gray-700 font-semibold">
                      Message / Load Details *
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify lane requirements, equipment type (dry van, reefer, flatbed), or questions..."
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
                    />
                    {errors.message && <p className="text-xs text-red-600 font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2 text-lime-400" />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send className="ml-2 h-4 w-4 text-lime-400" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
