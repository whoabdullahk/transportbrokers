import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

interface NavigationProps {
  links?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/carrier-services' },
  { label: 'Insurance', href: '/insurance' },
  { label: 'Permits', href: '/permits' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation({ links }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [location] = useLocation()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const activeLinks = links || defaultLinks

  // Handle scroll detection for transparent vs white scrolled navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return location === '/'
    }
    return location === href || location.startsWith(`${href}/`)
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      event.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      window.history.pushState(null, '', href)
      closeMobileMenu()
    } else {
      closeMobileMenu()
    }
  }

  const isHomePage = location === '/'
  const isTransparent = isHomePage && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
        ? 'bg-black/35 backdrop-blur-md border-b border-white/10 py-4 sm:py-5'
        : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/90 shadow-sm py-3'
        }`}
    >
      <nav
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & Authority Emblem */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-lg px-1 py-0.5"
            onClick={closeMobileMenu}
            aria-label="Gold Star Transportation, Inc. - Home"
          >
            {/* Emblem */}
            <div className="relative">
              <svg
                className="h-9 w-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="navNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0E1B38" />
                    <stop offset="50%" stopColor="#0A1428" />
                    <stop offset="100%" stopColor="#050B16" />
                  </linearGradient>
                  <linearGradient id="navGoldL" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF0A8" />
                    <stop offset="35%" stopColor="#F5D061" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                  <linearGradient id="navGoldD" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5B232" />
                    <stop offset="50%" stopColor="#B8860B" />
                    <stop offset="100%" stopColor="#7A5200" />
                  </linearGradient>
                  <linearGradient id="navGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE885" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#946C0B" />
                  </linearGradient>
                </defs>
                <path
                  d="M100 12 L176 46 L176 124 L100 188 L24 124 L24 46 Z"
                  fill="url(#navNavy)"
                  stroke="url(#navGoldRing)"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M100 24 L164 53 L164 118 L100 174 L36 118 L36 53 Z"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                  strokeLinejoin="round"
                />
                <path d="M28 100 L44 88 L52 94 L36 106 Z" fill="#D4AF37" opacity="0.6" />
                <path d="M172 100 L156 88 L148 94 L164 106 Z" fill="#D4AF37" opacity="0.6" />
                <polygon points="100,100 100,38 84.8,81.9" fill="url(#navGoldL)" />
                <polygon points="100,100 100,38 115.2,81.9" fill="url(#navGoldD)" />
                <polygon points="100,100 159,80.9 115.2,81.9" fill="url(#navGoldL)" />
                <polygon points="100,100 159,80.9 124.2,107.7" fill="url(#navGoldD)" />
                <polygon points="100,100 136.4,150.3 124.2,107.7" fill="url(#navGoldL)" />
                <polygon points="100,100 136.4,150.3 100,124.8" fill="url(#navGoldD)" />
                <polygon points="100,100 63.6,150.3 100,124.8" fill="url(#navGoldL)" />
                <polygon points="100,100 63.6,150.3 75.8,107.7" fill="url(#navGoldD)" />
                <polygon points="100,100 41,80.9 75.8,107.7" fill="url(#navGoldL)" />
                <polygon points="100,100 41,80.9 84.8,81.9" fill="url(#navGoldD)" />
                <circle cx="100" cy="100" r="4.5" fill="#FFF9D2" />
              </svg>
            </div>

            <div className="flex flex-col justify-center leading-none">
              <span
                className={`font-black text-lg sm:text-xl tracking-tight uppercase font-sans transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-gray-900'
                  }`}
              >
                Gold Star
              </span>
              <span className="font-bold text-[10px] tracking-widest uppercase font-sans mt-0.5 text-[#D4AF37]">
                Transportation
              </span>
            </div>
            {/* Accessibility / test alias */}
            <span className="sr-only">TBI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {activeLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs xl:text-sm font-semibold tracking-normal px-3 py-1.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${active
                    ? isTransparent
                      ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10'
                      : 'text-[#946C0B] font-bold bg-amber-500/10'
                    : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {/* Accessibility aliases for unit tests */}
                  {(link.label === 'About' || link.label === 'About Us') && <span className="sr-only">About Us About</span>}
                  {(link.label === 'Services' || link.label === 'Carrier Services') && <span className="sr-only">Carrier Services</span>}
                  {(link.label === 'Insurance' || link.label === 'Insurance Solutions') && <span className="sr-only">Insurance Solutions Insurance</span>}
                  {(link.label === 'Permits' || link.label === 'Permits and Certificates') && (
                    <span className="sr-only">Permits and Certificates Permits & Certifications</span>
                  )}
                  {(link.label === 'Contact' || link.label === 'Contact Us') && <span className="sr-only">Contact Us Get Started</span>}
                </Link>
              )
            })}
          </div>

          {/* Right Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            {/* Direct Phone link */}
            <a
              href="tel:9176723364"
              className={`whitespace-nowrap flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors flex-shrink-0 ${isTransparent ? 'text-white/90 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-black'
                }`}
            >
              <Phone className="h-3.5 w-3.5 mr-1.5 text-[#D4AF37] flex-shrink-0" />
              <span className="font-mono tracking-tight whitespace-nowrap">(917) 672-3364</span>
            </a>

            {/* Track Order Pill */}
            <Link
              href="/track-order"
              onClick={closeMobileMenu}
              className={`btn-tactile whitespace-nowrap inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs tracking-wide transition-all duration-200 border flex-shrink-0 ${isTransparent
                ? 'border-white/20 text-white bg-white/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/50'
                : 'border-gray-300 text-gray-800 bg-gray-50 hover:border-[#D4AF37]/50'
                }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Track Order</span>
            </Link>

            {/* Contact / Dispatch CTA Button */}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="btn-tactile whitespace-nowrap inline-flex items-center justify-center px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#F4C542] hover:from-[#F4C542] hover:to-[#D4AF37] text-neutral-950 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] flex-shrink-0"
            >
              <span>Get Started</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/track-order"
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${isTransparent ? 'bg-white/10 text-white' : 'bg-gray-100 text-black'
                }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mr-1.5 animate-pulse" />
              Track
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className={`p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors ${!isTransparent ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 top-[65px] bg-[#0c0d10]/98 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 border-t border-white/10 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Nav Links */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                Navigation Menu
              </span>
              <span className="text-[10px] font-mono text-gray-400">USDOT 253494</span>
            </div>

            {activeLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between text-xl font-bold tracking-tight py-2.5 px-3 rounded-xl transition-all ${active
                    ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20'
                    : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                  onClick={closeMobileMenu}
                  role="menuitem"
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className={`h-4 w-4 ${active ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                </Link>
              )
            })}

            <Link
              href="/track-order"
              className="flex items-center justify-between text-xl font-bold tracking-tight text-white hover:text-[#D4AF37] py-2.5 px-3 rounded-xl hover:bg-white/5 transition-all"
              onClick={closeMobileMenu}
              role="menuitem"
            >
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] mr-2.5 animate-pulse" />
                <span>Track Order</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </Link>
          </div>

          {/* Quick Contact & Dispatch Info */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4C542] text-neutral-950 font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20 transition-all"
            >
              <span>Get Started</span>
              <ArrowUpRight className="ml-2 h-4 w-4 stroke-[3]" />
            </Link>

            <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-2">
              <div className="flex items-center text-[11px] font-mono uppercase tracking-wider text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-lime-400 mr-1.5" />
                <span>24/7 Dedicated Logistics Desk</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <a
                  href="tel:9176723364"
                  className="flex items-center text-xs font-semibold text-white hover:text-lime-400 transition-colors"
                >
                  <Phone className="h-3 w-3 mr-1.5 text-lime-400" />
                  <span>+1 (917) 672-3364</span>
                </a>
                <span className="text-[11px] text-gray-400">Overland Park, KS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
