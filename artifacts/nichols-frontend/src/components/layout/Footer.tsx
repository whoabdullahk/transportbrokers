import { Link } from 'wouter'
import { Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'

// SVG icons for social media
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

interface FooterLink {
  label: string
  href: string
}

interface ContactInfo {
  emails: string[]
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  phones?: string[]
}

interface SocialLink {
  platform: string
  url: string
  icon: 'facebook' | 'twitter' | 'linkedin' | 'instagram'
}

interface FooterProps {
  sitemap?: FooterLink[]
  quickLinks?: FooterLink[]
  trackSupport?: FooterLink[]
  contactInfo?: ContactInfo
  socialLinks?: SocialLink[]
}

const defaultSitemap: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Carrier Services', href: '/carrier-services' },
  { label: 'Insurance Solutions', href: '/insurance' },
  { label: 'Permits and Certificates', href: '/permits' },
  { label: 'Contact Us', href: '/contact' },
]

const defaultQuickLinks: FooterLink[] = [
  { label: 'Request Quote', href: '/contact' },
  { label: 'Our Team', href: '/about' },
  { label: 'Careers', href: '/contact' },
  { label: 'Admin Portal', href: 'http://localhost:5173' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const defaultTrackSupport: FooterLink[] = [
  { label: 'Track Shipment', href: '/track-order' },
  { label: 'Support Center', href: '/contact' },
  { label: 'FAQs', href: '/about#faq' },
  { label: 'Documentation', href: '/permits' },
]

const defaultContactInfo: ContactInfo = {
  emails: ['info@transportbrokersinc.com', 'billing@transportbrokersinc.com'],
  address: {
    street: '111 Pecan Row Ln',
    city: 'Alexandria',
    state: 'LA',
    zip: '71303',
  },
  phones: [
    '(443) 560-0311',
    '(443) 560-0542',
    '(318) 555-0123',
    '(318) 555-0124',
  ],
}

const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/transportbrokersinc', icon: 'facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/transportbrokersinc', icon: 'twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/transportbrokersinc', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com/transportbrokersinc', icon: 'instagram' },
]

const getSocialIcon = (icon: string) => {
  const iconClass = 'h-4 w-4'
  switch (icon) {
    case 'facebook':
      return <Facebook className={iconClass} />
    case 'twitter':
      return <Twitter className={iconClass} />
    case 'linkedin':
      return <Linkedin className={iconClass} />
    case 'instagram':
      return <Instagram className={iconClass} />
    default:
      return null
  }
}

export function Footer({
  sitemap = defaultSitemap,
  quickLinks = defaultQuickLinks,
  trackSupport = defaultTrackSupport,
  contactInfo = defaultContactInfo,
  socialLinks = defaultSocialLinks,
}: FooterProps = {}) {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/5 relative overflow-hidden">
      {/* Top Regulatory Header Strip */}
      <div className="border-b border-white/8 py-3.5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-2">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            <span className="text-white font-bold tracking-wide">TRANSPORT BROKERS INC.</span>
            <span className="text-gray-500">• USDOT #2212598 • MC-172356</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-400">OPERATING STATUS: ACTIVE</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-500 font-semibold">48-STATE CORRIDOR NETWORK</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Sitemap Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Sitemap
            </h3>
            <ul className="space-y-2.5">
              {sitemap.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Track & Support Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Track & Support
            </h3>
            <ul className="space-y-2.5">
              {trackSupport.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Contact Us
            </h3>
            <div className="space-y-3.5 text-sm">
              {/* Emails */}
              <div className="space-y-1.5">
                {contactInfo.emails.map((email) => (
                  <div key={email} className="flex items-start space-x-2.5">
                    <Mail className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <a 
                      href={`mailto:${email}`}
                      className="text-gray-400 hover:text-white transition-colors text-xs font-mono break-all font-medium"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>

              {/* Physical Address */}
              <div className="flex items-start space-x-2.5 pt-1">
                <MapPin className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <address className="text-gray-400 text-xs font-mono not-italic leading-relaxed">
                  {contactInfo.address.street}<br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                </address>
              </div>

              {/* Phones */}
              {contactInfo.phones && contactInfo.phones.length > 0 && (
                <div className="space-y-1 pt-1">
                  {contactInfo.phones.map((phone) => (
                    <div key={phone} className="flex items-start space-x-2.5">
                      <Phone className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <a 
                        href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                        className="text-gray-400 hover:text-white transition-colors text-xs font-mono font-medium"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Social & Legal Area */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-gray-400 hover:text-black hover:bg-amber-400 transition-all border border-white/10"
                aria-label={`Visit our ${social.platform} page`}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} Transport Brokers Inc. All rights reserved. Commercial Carrier Services.
          </p>
        </div>
      </div>

      {/* Giant TBI Watermark Branding Text — dark on dark like Nichols */}
      <div className="py-8 md:py-14 border-t border-white/5 select-none overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl sm:text-8xl md:text-[9rem] lg:text-[12rem] font-black text-white/[0.04] tracking-widest leading-none font-mono uppercase">
            TBI
          </h2>
        </div>
      </div>
    </footer>
  )
}

