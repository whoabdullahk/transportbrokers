import type { FooterLink, ContactInfo, SocialLink } from '../types/footer'

export const defaultSitemap: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Carrier Services', href: '/carrier-services' },
  { label: 'Insurance Solutions', href: '/insurance' },
  { label: 'Permits and Certificates', href: '/permits' },
  { label: 'Contact Us', href: '/contact' },
]

export const defaultQuickLinks: FooterLink[] = [
  { label: 'Request Quote', href: '/contact' },
  { label: 'Our Team', href: '/about' },
  { label: 'Careers', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export const defaultTrackSupport: FooterLink[] = [
  { label: 'Track Shipment', href: '/track-order' },
  { label: 'Support Center', href: '/contact' },
  { label: 'FAQs', href: '/about#faq' },
  { label: 'Documentation', href: '/permits' },
]

export const defaultContactInfo: ContactInfo = {
  emails: ['brandon@TBItransportation.com', 'billing@TBItransportation.com'],
  address: {
    street: '111 Pecan Row Ln',
    city: 'Alexandria',
    state: 'LA',
    zip: '71303',
  },
  phones: ['(318) 555-0123', '(318) 555-0124'],
}

export const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/TBItransportation', icon: 'facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/TBItrans', icon: 'twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/TBItransportation', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com/TBItransportation', icon: 'instagram' },
]
