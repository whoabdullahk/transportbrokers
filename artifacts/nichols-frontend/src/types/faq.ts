/**
 * FAQ Type Definitions
 * Defines the structure for frequently asked questions in the accordion section
 */

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

/**
 * Validation function for FAQ objects
 */
export function validateFAQ(faq: Partial<FAQ>): faq is FAQ {
  return (
    typeof faq.id === 'string' &&
    faq.id.length > 0 &&
    typeof faq.question === 'string' &&
    faq.question.length >= 5 &&
    faq.question.length <= 500 &&
    typeof faq.answer === 'string' &&
    faq.answer.length >= 10 &&
    faq.answer.length <= 5000 &&
    typeof faq.order === 'number' &&
    faq.order > 0 &&
    (faq.category === undefined || typeof faq.category === 'string')
  )
}
