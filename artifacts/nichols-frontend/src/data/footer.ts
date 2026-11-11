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
  emails: ['brandontaylor@goldstartranposrtationinc.com'],
  address: {
    street: '9424 REEDS ROAD',
    city: 'OVERLAND PARK',
    state: 'KS',
    zip: '66207',
  },
  phones: ['+1 (917) 672-3364'],
}

export const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/goldstartransportation', icon: 'facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/goldstartrans', icon: 'twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/goldstartransportation', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com/goldstartransportation', icon: 'instagram' },
]
