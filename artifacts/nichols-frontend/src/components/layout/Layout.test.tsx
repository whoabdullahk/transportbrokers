import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Layout } from './Layout'

// Mock Navigation component
vi.mock('./Navigation', () => ({
  Navigation: ({ links }: { links?: Array<{ label: string; href: string }> }) => (
    <nav data-testid="navigation">
      {links ? `Custom Navigation: ${links.length} links` : 'Default Navigation'}
    </nav>
  )
}))

// Mock Footer component
vi.mock('./Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}))

// Mock wouter for Navigation
vi.mock('wouter', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useLocation: () => ['/'],
}))

describe('Layout Component', () => {
  describe('Navigation Integration', () => {
    it('renders Navigation component by default', () => {
      render(
        <Layout>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByText('Default Navigation')).toBeInTheDocument()
    })

    it('passes custom navLinks to Navigation', () => {
      const customLinks = [
        { label: 'Custom 1', href: '/custom1' },
        { label: 'Custom 2', href: '/custom2' }
      ]
      
      render(
        <Layout navLinks={customLinks}>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.getByText('Custom Navigation: 2 links')).toBeInTheDocument()
    })

    it('hides Navigation when hideNavigation is true', () => {
      render(
        <Layout hideNavigation>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.queryByTestId('navigation')).not.toBeInTheDocument()
    })
  })

  describe('Footer Integration', () => {
    it('renders Footer component by default', () => {
      render(
        <Layout>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('hides Footer when hideFooter is true', () => {
      render(
        <Layout hideFooter>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
    })
  })

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Layout>
          <div>Test Content</div>
        </Layout>
      )
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies default white background', () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>
      )
      
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('bg-white')
    })

    it('renders with flex column layout', () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>
      )
      
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('min-h-screen', 'flex', 'flex-col')
    })
  })

  describe('Background Color Variants', () => {
    it('applies beige background when specified', () => {
      const { container } = render(
        <Layout backgroundColor="beige">
          <div>Content</div>
        </Layout>
      )
      
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('bg-beige')
    })

    it('applies gray-50 background when specified', () => {
      const { container } = render(
        <Layout backgroundColor="gray-50">
          <div>Content</div>
        </Layout>
      )
      
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('bg-gray-50')
    })

    it('applies gray-100 background when specified', () => {
      const { container } = render(
        <Layout backgroundColor="gray-100">
          <div>Content</div>
        </Layout>
      )
      
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('bg-gray-100')
    })
  })

  describe('Container Width Handling', () => {
    it('applies container constraints by default', () => {
      render(
        <Layout>
          <div data-testid="content">Content</div>
        </Layout>
      )
      
      const content = screen.getByTestId('content')
      const containerDiv = content.parentElement as HTMLElement
      
      // Check for container utility classes
      expect(containerDiv).toHaveClass('container', 'mx-auto')
    })

    it('removes container constraints when fullWidth is true', () => {
      render(
        <Layout fullWidth>
          <div data-testid="content">Content</div>
        </Layout>
      )
      
      const content = screen.getByTestId('content')
      const wrapperDiv = content.parentElement as HTMLElement
      
      // Should have full width class
      expect(wrapperDiv).toHaveClass('w-full')
      // Should NOT have container class
      expect(wrapperDiv).not.toHaveClass('container')
    })
  })

  describe('Responsive Spacing', () => {
    it('applies responsive padding classes', () => {
      render(
        <Layout>
          <div data-testid="content">Content</div>
        </Layout>
      )
      
      const content = screen.getByTestId('content')
      const containerDiv = content.parentElement as HTMLElement
      
      // Check for responsive padding classes
      expect(containerDiv.className).toMatch(/px-4/) // mobile
      expect(containerDiv.className).toMatch(/md:px-8/) // tablet
      expect(containerDiv.className).toMatch(/lg:px-8/) // desktop
      expect(containerDiv.className).toMatch(/xl:px-8/) // wide
    })
  })

  describe('Main Content Area', () => {
    it('renders main tag with flex-1 class', () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>
      )
      
      const mainElement = container.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('flex-1', 'w-full')
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML with main element', () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>
      )
      
      const mainElement = container.querySelector('main')
      expect(mainElement?.tagName).toBe('MAIN')
    })

    it('maintains proper document structure', () => {
      const { container } = render(
        <Layout>
          <h1>Page Title</h1>
          <p>Page content</p>
        </Layout>
      )
      
      // Check that content is within main element
      const mainElement = container.querySelector('main')
      expect(mainElement).toContainElement(screen.getByRole('heading', { name: 'Page Title' }))
    })
  })

  describe('8px Grid System', () => {
    it('layout classes align with 8px grid system', () => {
      const { container } = render(
        <Layout>
          <div data-testid="content">Content</div>
        </Layout>
      )
      
      const content = screen.getByTestId('content')
      const containerDiv = content.parentElement as HTMLElement
      
      // Padding classes should use values from 8px grid:
      // px-4 = 1rem = 16px (2 * 8px)
      // md:px-8 = 2rem = 32px (4 * 8px)
      // lg:px-8 = 2rem = 32px (4 * 8px)
      // xl:px-8 = 2rem = 32px (4 * 8px)
      expect(containerDiv).toHaveClass('px-4')
      expect(containerDiv.className).toMatch(/md:px-8/)
    })
  })

  describe('Edge Cases', () => {
    it('renders with empty children', () => {
      const { container } = render(<Layout>{null}</Layout>)
      
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('renders with multiple children', () => {
      render(
        <Layout>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Layout>
      )
      
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
      expect(screen.getByText('Child 3')).toBeInTheDocument()
    })

    it('handles complex nested children', () => {
      render(
        <Layout>
          <section>
            <article>
              <h1>Title</h1>
              <p>Paragraph</p>
            </article>
          </section>
        </Layout>
      )
      
      expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
      expect(screen.getByText('Paragraph')).toBeInTheDocument()
    })
  })
})
