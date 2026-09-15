import type { FAQ } from '../types/faq'

export const faqsData: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I get onboarded with Transport Brokers Inc. as a carrier?',
    answer: 'Onboarding is fast and simple. Submit your MC authority certificate, current certificate of insurance (COI) naming Transport Brokers Inc. as certificate holder, and signed W-9. Our carrier relations team typically reviews and approves your packet within 2 to 4 business hours.',
    category: 'Carrier Onboarding',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'What types of freight and equipment do you support?',
    answer: 'We coordinate freight across Dry Van, Temperature-Controlled (Reefer), Flatbed, Step Deck, and Specialized Heavy-Haul / Oversized loads. We also provide trailer rental programs for operators needing additional capacity.',
    category: 'Services & Equipment',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'What are your payment terms and factoring options?',
    answer: 'We offer standard 30-day net terms, QuickPay options (next-business-day with a 2% fee), and full integration with major freight factoring companies so you get paid the moment your signed Bill of Lading (BOL) is verified.',
    category: 'Billing & Payments',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'How do you handle permits and regulatory compliance?',
    answer: 'Our dedicated permits and compliance division handles multi-state oversized/overweight route planning, temporary fuel tax filings, TWIC credential assistance for port terminals, and proactive DOT safety rating maintenance.',
    category: 'Compliance & Permits',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'Do you provide dedicated lane commitments?',
    answer: 'Yes! We establish contracted, dedicated recurring lanes for dependable carriers. Dedicated contracts provide predictable weekly mileage, steady income, and guaranteed return hauls to minimize deadhead miles.',
    category: 'Lanes & Capacity',
    order: 5,
  },
]
