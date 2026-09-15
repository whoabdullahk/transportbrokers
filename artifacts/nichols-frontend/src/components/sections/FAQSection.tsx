import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '../../types/faq'
import { faqsData } from '../../data/faqs'
import { toggleFAQ } from '../../lib/faqUtils'

export interface FAQSectionProps {
  faqs?: FAQ[]
  defaultOpen?: string[]
}

export function FAQSection({
  faqs = faqsData,
  defaultOpen = ['faq-1'],
}: FAQSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen)

  const handleToggle = (id: string) => {
    setOpenIds(toggleFAQ(id, openIds))
  }

  return (
    <section 
      id="faq"
      aria-label="Frequently Asked Questions Section"
      className="py-24 lg:py-32 bg-white text-gray-900 border-b border-gray-200 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-lime-700 font-mono font-bold uppercase text-xs tracking-widest">
            <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
            <span>Carrier Operations & Support</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 leading-none">
            Frequently Asked <span className="text-lime-700">Questions.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            Essential operational insights regarding carrier qualification, dedicated lane agreements, payment cycles, and equipment compliance.
          </p>
        </div>

        {/* Editorial Minimal Border Accordion */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id)

            return (
              <div
                key={faq.id}
                data-testid={`faq-item-${faq.id}`}
                className="transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full py-8 flex items-start justify-between text-left focus:outline-none focus-visible:text-lime-700 transition-colors"
                >
                  <div className="flex items-start space-x-4 sm:space-x-6 pr-4">
                    <span className="text-xs font-mono font-bold text-lime-700 mt-1.5 flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-lime-700 transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-2 rounded-full border transition-all flex-shrink-0 ${
                    isOpen 
                      ? 'bg-lime-500 text-black border-lime-500 rotate-180' 
                      : 'bg-gray-100 text-gray-700 border-gray-200 group-hover:bg-gray-200 group-hover:text-black'
                  }`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className="pb-8 pl-8 sm:pl-12 pr-6 text-base sm:text-lg text-gray-600 font-normal leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Help Footer */}
        <div className="mt-12 text-center text-sm font-mono text-gray-600">
          Have an unlisted compliance or freight inquiry?{' '}
          <a href="/contact" className="text-black font-bold underline hover:text-lime-700 transition-colors">
            Contact 24/7 Dispatch Desk →
          </a>
        </div>

      </div>
    </section>
  )
}

