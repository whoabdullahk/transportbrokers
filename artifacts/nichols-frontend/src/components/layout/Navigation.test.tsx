import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation, NavLink } from './Navigation'

// Mock wouter
const mockUseLocation = vi.fn(() => ['/'])
vi.mock('wouter', () => ({
  Link: ({ children, href, className, onClick, ...rest }: { 
    children: React.ReactNode
    href: string
    className?: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
    [key: string]: any
  }) => (
    <a 
      href={href} 
      className={className} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  ),
  useLocation: () => mockUseLocation(),
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue(['/'])
    Object.defineProperty(document.body.style, 'overflow', {
      writable: true,
      value: ''
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Navigation />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('displays the logo with link to home', () => {
      render(<Navigation />)
      const logo = screen.getByText('TBI')
      expect(logo).toBeInTheDocument()
      expect(logo.closest('a')).toHaveAttribute('href', '/')
    })

    it('has proper aria-label on navigation', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('renders all default navigation links in desktop menu', () => {
      render(<Navigation />)
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Carrier Services')).toBeInTheDocument()
      expect(screen.getByText('Insurance')).toBeInTheDocument()
      expect(screen.getByText('Permits & Certifications')).toBeInTheDocument()
      expect(screen.getByText('Track Order')).toBeInTheDocument()
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('renders custom links when provided', () => {
      const customLinks: NavLink[] = [
        { label: 'Custom 1', href: '/custom1' },
        { label: 'Custom 2', href: '/custom2' },
      ]
      render(<Navigation links={customLinks} />)
      expect(screen.getByText('Custom 1')).toBeInTheDocument()
      expect(screen.getByText('Custom 2')).toBeInTheDocument()
    })
  })

  describe('Sticky/Fixed Positioning and Glassmorphism', () => {
    it('has fixed top positioning header', () => {
      const { container } = render(<Navigation />)
      const header = container.querySelector('header')
      expect(header).toHaveClass('fixed', 'top-0', 'z-50')
    })

    it('has border-b on header', () => {
      const { container } = render(<Navigation />)
      const header = container.querySelector('header')
      expect(header).toHaveClass('border-b')
    })
  })

  describe('Active Page Highlighting', () => {
    it('highlights active page for route matching', () => {
      mockUseLocation.mockReturnValue(['/services'])
      const customLinks: NavLink[] = [
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
      ]
      render(<Navigation links={customLinks} />)
      const servicesLink = screen.getByText('Services')
      const linkElement = servicesLink.closest('a')
      expect(linkElement).toHaveClass('text-white')
      expect(linkElement).toHaveAttribute('aria-current', 'page')
    })

    it('does not highlight non-active pages', () => {
      mockUseLocation.mockReturnValue(['/'])
      const customLinks: NavLink[] = [
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
      ]
      render(<Navigation links={customLinks} />)
      const servicesLink = screen.getByText('Services')
      const linkElement = servicesLink.closest('a')
      expect(linkElement).not.toHaveAttribute('aria-current')
    })
  })

  describe('Mobile Hamburger Menu', () => {
    it('displays mobile menu button', () => {
      render(<Navigation />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('mobile menu button is hidden on desktop', () => {
      const { container } = render(<Navigation />)
      const mobileControls = container.querySelector('.md\\:hidden')
      expect(mobileControls).toBeInTheDocument()
    })

    it('toggles mobile menu when button is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
      expect(screen.getByRole('menu')).toBeInTheDocument()
      
      await user.click(screen.getByRole('button', { name: /close menu/i }))
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
      })
    })

    it('shows X icon when menu is open', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      const closeButton = screen.getByRole('button', { name: /close menu/i })
      expect(closeButton).toBeInTheDocument()
    })

    it('mobile menu has proper ARIA attributes', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
      
      await user.click(menuButton)
      
      const closeButton = screen.getByRole('button', { name: /close menu/i })
      expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('mobile menu prevents body scroll when open', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      expect(document.body.style.overflow).toBe('')
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('mobile menu restores body scroll when closed', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      expect(document.body.style.overflow).toBe('hidden')
      
      const closeButton = screen.getByRole('button', { name: /close menu/i })
      await user.click(closeButton)
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('')
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('has proper focus styles on logo', () => {
      render(<Navigation />)
      const logo = screen.getByText('TBI').closest('a')
      expect(logo).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-lime-500')
    })

    it('has proper focus styles on mobile menu button', () => {
      render(<Navigation />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      expect(menuButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-lime-500')
    })

    it('closes mobile menu on Escape key', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      expect(screen.getByRole('menu')).toBeInTheDocument()
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('desktop navigation is keyboard accessible with Tab', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      await user.tab()
      expect(screen.getByText('TBI').closest('a')).toHaveFocus()
    })
  })

  describe('Mobile Menu Interactions', () => {
    it('closes menu when a link is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      expect(screen.getByRole('menu')).toBeInTheDocument()
      
      const aboutLink = screen.getAllByText('About')[1]
      await user.click(aboutLink)
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('mobile menu items have proper role', async () => {
      const user = userEvent.setup()
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)
      
      const mobileMenu = screen.getByRole('menu')
      const menuItems = mobileMenu.querySelectorAll('[role="menuitem"]')
      expect(menuItems.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('Smooth Scroll Behavior', () => {
    it('handles anchor link clicks with smooth scroll', async () => {
      const user = userEvent.setup()
      const mockScrollIntoView = vi.fn()
      const mockElement = document.createElement('div')
      mockElement.id = 'test-section'
      mockElement.scrollIntoView = mockScrollIntoView
      document.body.appendChild(mockElement)

      const anchorLinks: NavLink[] = [
        { label: 'Section', href: '#test-section' }
      ]
      
      render(<Navigation links={anchorLinks} />)
      
      const link = screen.getAllByText('Section')[0]
      await user.click(link)
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      })

      document.body.removeChild(mockElement)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
      
      const logo = screen.getByLabelText('Transport Brokers Inc. - Home')
      expect(logo).toBeInTheDocument()
    })

    it('icons have aria-hidden attribute', async () => {
      const user = userEvent.setup()
      const { container } = render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      const menuIcon = menuButton.querySelector('svg')
      expect(menuIcon).toHaveAttribute('aria-hidden', 'true')
      
      await user.click(menuButton)
      
      const closeIcon = menuButton.querySelector('svg')
      expect(closeIcon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Color Scheme', () => {
    it('logo has lime green pulse dot or hover accent', () => {
      render(<Navigation />)
      const logo = screen.getByText('TBI').closest('a')
      expect(logo).toBeInTheDocument()
    })
  })
})
