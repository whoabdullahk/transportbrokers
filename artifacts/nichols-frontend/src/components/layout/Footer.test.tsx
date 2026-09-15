import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

// Mock wouter
vi.mock('wouter', () => ({
  Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('displays Sitemap section with links', () => {
    render(<Footer />)
    expect(screen.getByText('Sitemap')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Carrier Services')).toBeInTheDocument()
    expect(screen.getByText('Insurance Solutions')).toBeInTheDocument()
    expect(screen.getByText('Permits and Certificates')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument()
  })

  it('displays Quick Links section', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByText('Request Quote')).toBeInTheDocument()
    expect(screen.getByText('Our Team')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })

  it('displays Track & Support section', () => {
    render(<Footer />)
    expect(screen.getByText('Track & Support')).toBeInTheDocument()
    expect(screen.getByText('Track Shipment')).toBeInTheDocument()
    expect(screen.getByText('Support Center')).toBeInTheDocument()
    expect(screen.getByText('FAQs')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
  })

  it('displays Contact Us section with email addresses', () => {
    render(<Footer />)
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
    expect(screen.getByText('brandon@TBItransportation.com')).toBeInTheDocument()
    expect(screen.getByText('billing@TBItransportation.com')).toBeInTheDocument()
  })

  it('displays address information', () => {
    render(<Footer />)
    expect(screen.getByText(/111 Pecan Row Ln/)).toBeInTheDocument()
    expect(screen.getByText(/Alexandria, LA 71303/)).toBeInTheDocument()
  })

  it('displays phone numbers when provided', () => {
    render(<Footer />)
    expect(screen.getByText('(318) 555-0123')).toBeInTheDocument()
    expect(screen.getByText('(318) 555-0124')).toBeInTheDocument()
  })

  it('email links have proper mailto href', () => {
    render(<Footer />)
    const emailLink = screen.getByText('brandon@TBItransportation.com')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:brandon@TBItransportation.com')
  })

  it('displays social media icons', () => {
    render(<Footer />)
    // Check for aria-labels on social links
    expect(screen.getByLabelText(/Visit our Facebook page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Visit our Twitter page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Visit our LinkedIn page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Visit our Instagram page/i)).toBeInTheDocument()
  })

  it('social media links open in new tab', () => {
    render(<Footer />)
    const facebookLink = screen.getByLabelText(/Visit our Facebook page/i)
    expect(facebookLink).toHaveAttribute('target', '_blank')
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays large TBI branding text', () => {
    render(<Footer />)
    // Get all TBI text elements (there might be multiple)
    const TBIElements = screen.getAllByText('TBI')
    // Should have at least one (the large branding at bottom)
    expect(TBIElements.length).toBeGreaterThan(0)
  })

  it('displays copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}.*All rights reserved`))).toBeInTheDocument()
  })

  it('has dark background color', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-black', 'text-white')
  })

  it('renders custom sitemap links when provided', () => {
    const customSitemap = [
      { label: 'Custom Link 1', href: '/custom1' },
      { label: 'Custom Link 2', href: '/custom2' },
    ]
    render(<Footer sitemap={customSitemap} />)
    expect(screen.getByText('Custom Link 1')).toBeInTheDocument()
    expect(screen.getByText('Custom Link 2')).toBeInTheDocument()
  })

  it('implements responsive grid layout', () => {
    const { container } = render(<Footer />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  })
})
