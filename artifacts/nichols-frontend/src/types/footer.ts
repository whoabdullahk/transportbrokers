/**
 * Footer Type Definitions
 * Defines the structure for footer content including links and contact information
 */

export interface FooterLink {
  label: string
  href: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export interface ContactInfo {
  emails: string[]
  address: Address
  phones: string[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface FooterProps {
  sitemap: FooterLink[]
  quickLinks: FooterLink[]
  trackSupport: FooterLink[]
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
}
