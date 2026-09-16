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
  emails: ['ethoncollins@transportbrokersinc.com'],
  address: {
    street: '67 BEACON STREET',
    city: 'BUFFALO',
    state: 'NY',
    zip: '14220',
  },
  phones: ['330-756-7732'],
}

export const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/TBItransportation', icon: 'facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/TBItrans', icon: 'twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/TBItransportation', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com/TBItransportation', icon: 'instagram' },
]
