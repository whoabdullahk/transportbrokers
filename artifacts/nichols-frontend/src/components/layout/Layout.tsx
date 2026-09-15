import type { ReactNode } from 'react'
import { Navigation, type NavLink } from './Navigation'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  /**
   * Optional background color override
   * Defaults to brand-black for dark theme
   */
  backgroundColor?: 'white' | 'beige' | 'gray-50' | 'gray-100' | 'brand-black'
  /**
   * Optional flag to disable container width constraints on main content
   * Useful for full-width sections like heroes and full-page images
   */
  fullWidth?: boolean
  /**
   * Optional custom navigation links
   * If not provided, uses default navigation links
   */
  navLinks?: NavLink[]
  /**
   * Optional flag to hide navigation
   * Useful for specific pages like 404 or splash screens
   */
  hideNavigation?: boolean
  /**
   * Optional flag to hide footer
   */
  hideFooter?: boolean
}

export function Layout({ 
  children, 
  backgroundColor = 'white',
  fullWidth = false,
  navLinks,
  hideNavigation = false,
  hideFooter = false
}: LayoutProps) {
  // Map background color prop to Tailwind classes
  const bgColorClass = {
    'white': 'bg-white',
    'beige': 'bg-beige',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100',
    'brand-black': 'bg-brand-black'
  }[backgroundColor]

  return (
    <div className={`min-h-screen flex flex-col ${bgColorClass}`}>
      {/* Navigation Component - sticky at top */}
      {!hideNavigation && <Navigation links={navLinks} />}
      
      <main className="flex-1 w-full">
        {fullWidth ? (
          // Full-width content without container constraints
          // Used for hero sections, full-page images, etc.
          <div className="w-full">
            {children}
          </div>
        ) : (
          // Constrained content with responsive container widths
          // Uses Tailwind's container utility with custom breakpoints
          // Container applies:
          // - Mobile: 100% width with 1rem (16px) horizontal padding
          // - md (768px+): max-w-768px with 2rem (32px) padding
          // - lg (1024px+): max-w-1024px with 2rem (32px) padding
          // - xl (1440px+): max-w-1280px with 2rem (32px) padding
          <div className="container mx-auto px-4 md:px-8 lg:px-8 xl:px-8 w-full">
            {children}
          </div>
        )}
      </main>
      
      {/* Footer Component */}
      {!hideFooter && <Footer />}
    </div>
  )
}
