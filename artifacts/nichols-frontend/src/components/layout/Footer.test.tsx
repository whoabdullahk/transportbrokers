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
    expect(screen.getByText('brandontaylor@goldstartranposrtationinc.com')).toBeInTheDocument()
  })

  it('displays address information', () => {
    render(<Footer />)
    expect(screen.getByText(/9424 REEDS ROAD/)).toBeInTheDocument()
    expect(screen.getByText(/OVERLAND PARK, KS 66207/)).toBeInTheDocument()
  })

  it('displays phone numbers when provided', () => {
    render(<Footer />)
    expect(screen.getByText('+1 (917) 672-3364')).toBeInTheDocument()
  })

  it('email links have proper mailto href', () => {
    render(<Footer />)
    const emailLink = screen.getByText('brandontaylor@goldstartranposrtationinc.com')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:brandontaylor@goldstartranposrtationinc.com')
  })

  it('displays social media icons', () => {
    render(<Footer />)
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

  it('displays large branding text', () => {
    render(<Footer />)
    const brandingElements = screen.getAllByText('GOLD STAR')
    expect(brandingElements.length).toBeGreaterThan(0)
  })

  it('displays copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}.*All rights reserved`))).toBeInTheDocument()
  })

  it('has dark background color', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-[#0a0a0a]')
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
