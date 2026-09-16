# Requirements Document: Nichols Transportation Frontend Redesign

## Overview

This document specifies the requirements for redesigning the Nichols Transportation website frontend to match the provided screenshot specifications. The requirements are derived from the design document and ensure the implementation delivers a modern, high-performance, accessible logistics platform.

## Functional Requirements

### FR-1: Hero Section with Statistics

**Priority**: High

**Description**: The website shall display a primary hero section featuring an aerial container yard background image, company description, and three key statistics.

**Acceptance Criteria**:
- AC-1.1: Hero section displays full-viewport height on initial load
- AC-1.2: Background image shows aerial container yard with proper contrast overlay
- AC-1.3: Three statistics are displayed: "500+", "97%", and "24/7" with corresponding labels
- AC-1.4: Company title "Nichols Transportation" is prominently displayed
- AC-1.5: Description text is readable with proper contrast against background
- AC-1.6: Section is responsive across mobile, tablet, and desktop breakpoints

### FR-2: Hero CTA Section

**Priority**: High

**Description**: The website shall display a secondary hero section with desert highway truck imagery and a prominent call-to-action button.

**Acceptance Criteria**:
- AC-2.1: Section displays "LOGISTICS THAT MOVE WITH PRECISION" heading in large, bold typography
- AC-2.2: Background image shows truck on desert highway
- AC-2.3: "Request a Consultation" CTA button is prominently displayed
- AC-2.4: CTA button navigates to contact page or contact form on click
- AC-2.5: Button has hover state with visual feedback
- AC-2.6: Section maintains high contrast for accessibility

### FR-3: Our Solution Section

**Priority**: Medium

**Description**: The website shall display a large-format section explaining transportation and carrier support solutions.

**Acceptance Criteria**:
- AC-3.1: Section displays "Our Solution" as oversized heading
- AC-3.2: Multi-paragraph description of services is displayed
- AC-3.3: Typography scales responsively across breakpoints
- AC-3.4: Proper whitespace and readability is maintained
- AC-3.5: Section follows design system spacing guidelines

### FR-4: Services Grid

**Priority**: High

**Description**: The website shall display 8 service cards in a responsive grid layout with specific background colors for each service.

**Acceptance Criteria**:
- AC-4.1: Grid displays exactly 8 service cards
- AC-4.2: Services are displayed in this order: Dedicated Freight Lanes, Trailer Rental Program, TWIC Card Assistance, Insurance Assistance, Factoring Registration, Specialized Permit Loads, Permit Application Support, DOT Compliance Support
- AC-4.3: Background colors are applied correctly:
  - Dedicated Freight Lanes: lime green (#84CC16)
  - Trailer Rental Program: beige (#F5F5DC)
  - TWIC Card Assistance: black (#000000)
  - Insurance Assistance: light gray (#F3F4F6)
  - Factoring Registration: black (#000000)
  - Specialized Permit Loads: lime green (#84CC16)
  - Permit Application Support: light gray (#F3F4F6)
  - DOT Compliance Support: black (#000000)
- AC-4.4: Text color adapts to background (light text on black, dark text on lime/beige/gray)
- AC-4.5: Grid is responsive: 1 column on mobile, 2 columns on tablet, 3-4 columns on desktop
- AC-4.6: Cards have hover states with visual feedback
- AC-4.7: Each card is clickable and navigates to corresponding service detail page

### FR-5: Horizontal Features Scroll

**Priority**: Medium

**Description**: The website shall display a horizontal scrolling section showcasing key service features.

**Acceptance Criteria**:
- AC-5.1: Section displays 4 feature cards: "Insurance Compliance", "Factoring Support", "Moving Carriers Forward", "Dedicated Lanes"
- AC-5.2: Cards scroll horizontally on user interaction
- AC-5.3: Smooth scroll behavior is implemented
- AC-5.4: Navigation arrows are provided for desktop users
- AC-5.5: Touch gestures work on mobile devices
- AC-5.6: Scroll position can be navigated left and right
- AC-5.7: Scroll indicators show current position (optional)

### FR-6: Stats Section

**Priority**: High

**Description**: The website shall display a large-format statistics section highlighting loads dispatched.

**Acceptance Criteria**:
- AC-6.1: Primary statistic "10K+" is displayed in large lime green typography
- AC-6.2: "LOADS DISPATCHED" label is shown below the statistic
- AC-6.3: Carrier network description is displayed
- AC-6.4: White truck image is overlaid or displayed alongside stats
- AC-6.5: Visual hierarchy emphasizes the primary statistic
- AC-6.6: Section is responsive and maintains impact across breakpoints

### FR-7: FAQ Section

**Priority**: Medium

**Description**: The website shall display an accordion-style FAQ section with expandable/collapsible questions.

**Acceptance Criteria**:
- AC-7.1: FAQ section displays multiple questions in accordion format
- AC-7.2: Questions can be expanded by clicking
- AC-7.3: Answers are revealed with smooth animation
- AC-7.4: Multiple FAQs can be open simultaneously
- AC-7.5: Keyboard navigation is supported (Tab, Enter, Space)
- AC-7.6: ARIA attributes ensure screen reader accessibility
- AC-7.7: Visual indicators show expanded/collapsed state

### FR-8: Full-Page Image Section

**Priority**: Low

**Description**: The website shall display a full-page immersive section featuring a trailer truck on foggy highway.

**Acceptance Criteria**:
- AC-8.1: Section displays full-viewport height
- AC-8.2: Image shows trailer truck on foggy highway
- AC-8.3: Image covers entire section without distortion
- AC-8.4: Optional overlay is applied for contrast
- AC-8.5: Image loads efficiently (lazy loading below fold)

### FR-9: CTA Section

**Priority**: High

**Description**: The website shall display a prominent call-to-action section encouraging users to get started.

**Acceptance Criteria**:
- AC-9.1: Section displays dark background (black or dark gray)
- AC-9.2: Headline reads "Ready to haul more freight with a broker that has your back?"
- AC-9.3: "Get Started Today" button is prominently displayed
- AC-9.4: Button has lime green background (#84CC16) with hover effects
- AC-9.5: CTA button navigates to contact page
- AC-9.6: Section is centered and visually impactful

### FR-10: Footer

**Priority**: High

**Description**: The website shall display a comprehensive footer with sitemap, contact information, and social media links.

**Acceptance Criteria**:
- AC-10.1: Sitemap section includes links: Home, About Us, Carrier Services, Insurance Solutions, Permits and Certificates, Contact Us
- AC-10.2: Quick Links section is displayed
- AC-10.3: Track & Support section is displayed
- AC-10.4: Contact information is displayed:
  - Email: brandon@nicholstransportation.com
  - Email: billing@nicholstransportation.com
  - Address: 111 Pecan Row Ln, Alexandria LA 71303
  - Phone numbers
- AC-10.5: Social media icons are displayed with links
- AC-10.6: Large "NICHOLS" branding text is displayed at bottom
- AC-10.7: Footer is responsive with stacked columns on mobile
- AC-10.8: All links are functional and navigate to correct pages

### FR-11: Contact Form

**Priority**: High

**Description**: The website shall provide a contact form for user inquiries and consultation requests.

**Acceptance Criteria**:
- AC-11.1: Form includes fields: Full Name (required), Email (required), Phone (optional), Company (optional), Message (required)
- AC-11.2: Real-time validation is performed on all fields
- AC-11.3: Error messages are displayed for invalid inputs
- AC-11.4: Email field validates proper email format
- AC-11.5: Phone field validates proper phone format if provided
- AC-11.6: Name must be at least 2 characters
- AC-11.7: Message must be at least 10 characters
- AC-11.8: Submit button is disabled while submitting
- AC-11.9: Success message is shown after successful submission
- AC-11.10: Error message is shown if submission fails
- AC-11.11: Form resets after successful submission

### FR-12: Navigation

**Priority**: High

**Description**: The website shall provide a navigation menu for accessing all major sections and pages.

**Acceptance Criteria**:
- AC-12.1: Navigation menu is fixed or sticky at top of page
- AC-12.2: Menu includes links to: Home, About, Services, Contact, Track
- AC-12.3: Mobile hamburger menu is displayed on small screens
- AC-12.4: Active page is highlighted in navigation
- AC-12.5: Navigation has smooth scroll behavior for anchor links
- AC-12.6: Logo/brand is clickable and navigates to home page

### FR-13: Routing

**Priority**: High

**Description**: The website shall implement client-side routing for single-page application behavior.

**Acceptance Criteria**:
- AC-13.1: All page transitions occur without full page reload
- AC-13.2: Browser back/forward buttons work correctly
- AC-13.3: URLs update properly on navigation
- AC-13.4: Direct URL access loads correct page
- AC-13.5: 404 page is shown for invalid routes

## Non-Functional Requirements

### NFR-1: Performance

**Priority**: High

**Description**: The website shall load and render efficiently across all devices and network conditions.

**Acceptance Criteria**:
- AC-1.1: Initial page load completes in < 3 seconds on 3G network
- AC-1.2: First Contentful Paint (FCP) < 1.8 seconds
- AC-1.3: Largest Contentful Paint (LCP) < 2.5 seconds
- AC-1.4: Time to Interactive (TTI) < 3.8 seconds
- AC-1.5: JavaScript bundle size < 200KB gzipped
- AC-1.6: CSS bundle size < 50KB gzipped
- AC-1.7: Images are optimized and lazy-loaded below the fold
- AC-1.8: Lighthouse performance score ≥ 90

### NFR-2: Accessibility

**Priority**: High

**Description**: The website shall be accessible to users with disabilities and meet WCAG 2.1 Level AA standards.

**Acceptance Criteria**:
- AC-2.1: All interactive elements are keyboard accessible
- AC-2.2: Proper ARIA labels are applied to all components
- AC-2.3: Color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- AC-2.4: All images have descriptive alt text
- AC-2.5: Form inputs have associated labels
- AC-2.6: Focus indicators are visible on all interactive elements
- AC-2.7: Screen readers can navigate all content
- AC-2.8: Heading hierarchy is semantic and logical
- AC-2.9: Skip links are provided for main navigation
- AC-2.10: Lighthouse accessibility score ≥ 95

### NFR-3: Responsive Design

**Priority**: High

**Description**: The website shall provide optimal viewing experience across all device sizes.

**Acceptance Criteria**:
- AC-3.1: Layout adapts to mobile (< 768px), tablet (768px-1024px), desktop (1024px-1440px), and wide (> 1440px) breakpoints
- AC-3.2: Touch targets are at least 44x44px on mobile devices
- AC-3.3: Text is readable without horizontal scrolling
- AC-3.4: Images scale appropriately at all breakpoints
- AC-3.5: Navigation collapses to hamburger menu on mobile
- AC-3.6: Grid layouts adjust column count based on screen size
- AC-3.7: No horizontal overflow on any breakpoint

### NFR-4: Browser Compatibility

**Priority**: High

**Description**: The website shall function correctly across all major modern browsers.

**Acceptance Criteria**:
- AC-4.1: Website works in Chrome (last 2 versions)
- AC-4.2: Website works in Firefox (last 2 versions)
- AC-4.3: Website works in Safari (last 2 versions)
- AC-4.4: Website works in Edge (last 2 versions)
- AC-4.5: Graceful degradation for unsupported features
- AC-4.6: Polyfills included for critical APIs if needed

### NFR-5: SEO Optimization

**Priority**: Medium

**Description**: The website shall be optimized for search engine visibility and ranking.

**Acceptance Criteria**:
- AC-5.1: All pages have unique, descriptive title tags
- AC-5.2: All pages have meta descriptions (150-160 characters)
- AC-5.3: Semantic HTML5 elements are used throughout
- AC-5.4: Open Graph tags are included for social sharing
- AC-5.5: Structured data (JSON-LD) is implemented where applicable
- AC-5.6: Sitemap.xml is generated and accessible
- AC-5.7: Robots.txt is properly configured

### NFR-6: Security

**Priority**: High

**Description**: The website shall implement security best practices to protect user data and prevent attacks.

**Acceptance Criteria**:
- AC-6.1: All API calls use HTTPS
- AC-6.2: Form inputs are sanitized before submission
- AC-6.3: XSS protection is implemented (React's built-in + CSP headers)
- AC-6.4: CSRF tokens are used for form submissions
- AC-6.5: Content Security Policy headers are configured
- AC-6.6: No sensitive data is stored in localStorage
- AC-6.7: API endpoints implement rate limiting

### NFR-7: Maintainability

**Priority**: Medium

**Description**: The codebase shall be maintainable, well-documented, and follow best practices.

**Acceptance Criteria**:
- AC-7.1: Components are modular and reusable
- AC-7.2: Code follows consistent naming conventions
- AC-7.3: TypeScript is used for type safety
- AC-7.4: PropTypes or TypeScript interfaces are defined for all components
- AC-7.5: Utility functions are documented with JSDoc comments
- AC-7.6: Complex logic includes inline comments
- AC-7.7: README includes setup and development instructions
- AC-7.8: ESLint and Prettier are configured and used

### NFR-8: Testing

**Priority**: Medium

**Description**: The website shall have comprehensive test coverage to ensure reliability.

**Acceptance Criteria**:
- AC-8.1: Unit tests cover ≥ 80% of utility functions
- AC-8.2: Component render tests exist for all major components
- AC-8.3: Integration tests cover critical user flows
- AC-8.4: Accessibility tests are automated (axe-core or similar)
- AC-8.5: Visual regression tests are implemented (optional)
- AC-8.6: All tests pass in CI/CD pipeline

### NFR-9: Animation Performance

**Priority**: Medium

**Description**: Animations shall be smooth and performant without causing jank or layout shifts.

**Acceptance Criteria**:
- AC-9.1: Animations use CSS transforms instead of layout properties
- AC-9.2: Frame rate maintains ≥ 60fps during animations
- AC-9.3: Intersection observers trigger animations efficiently
- AC-9.4: Reduced motion preferences are respected (prefers-reduced-motion)
- AC-9.5: No Cumulative Layout Shift (CLS) > 0.1
- AC-9.6: will-change property is used judiciously

### NFR-10: Code Quality

**Priority**: Medium

**Description**: The codebase shall maintain high quality standards through automated tooling.

**Acceptance Criteria**:
- AC-10.1: ESLint runs without errors
- AC-10.2: TypeScript strict mode is enabled
- AC-10.3: No console.log statements in production builds
- AC-10.4: Prettier formats all code consistently
- AC-10.5: Unused imports are removed
- AC-10.6: Dead code is eliminated in production builds

## Constraints

### Technical Constraints

1. **Tech Stack**: Must use existing React + TypeScript + Vite + Tailwind CSS + shadcn/ui stack
2. **Browser Support**: Must support last 2 versions of major browsers (Chrome, Firefox, Safari, Edge)
3. **Mobile-First**: Design and development must follow mobile-first approach
4. **No Breaking Changes**: Must maintain existing API contracts and data structures

### Design Constraints

1. **Color Scheme**: Must use lime green (#84CC16) and black (#000000) as primary brand colors
2. **Typography**: Must maintain consistent font hierarchy and sizing across all sections
3. **Spacing**: Must follow 8px grid system for consistent spacing
4. **Image Quality**: All images must be high-resolution and optimized for web

### Business Constraints

1. **Content**: All existing content and functionality must be preserved
2. **Navigation**: Current URL structure should remain unchanged where possible
3. **SEO**: Must not lose existing search engine rankings during redesign
4. **Timeline**: Implementation should be completed in phases to minimize disruption

### Accessibility Constraints

1. **WCAG Compliance**: Must meet WCAG 2.1 Level AA standards
2. **Screen Readers**: Must be fully navigable by screen readers
3. **Keyboard Navigation**: All functionality must be accessible via keyboard
4. **Color Contrast**: All text must meet minimum contrast ratios

## Assumptions

1. All content (text, images) will be provided by the client or content team
2. API endpoints for form submission already exist or will be created separately
3. Hosting infrastructure can support modern SPA deployment
4. Users have modern browsers with JavaScript enabled
5. Images will be provided in high resolution and can be optimized during build
6. Social media accounts and links will be provided by the client
7. FAQ content will be provided or can be carried over from existing site
8. Analytics and tracking will be configured separately

## Dependencies

### External Dependencies

1. **React 18+**: Core UI library
2. **TypeScript 5+**: Type safety and developer experience
3. **Vite 5+**: Build tool and dev server
4. **Tailwind CSS 4+**: Utility-first CSS framework
5. **shadcn/ui**: Component library built on Radix UI
6. **Wouter 3+**: Lightweight routing library
7. **React Hook Form 7+**: Form state management
8. **Zod**: Schema validation
9. **Framer Motion**: Animation library
10. **Lucide React**: Icon library

### Internal Dependencies

1. **API Client**: Existing API client for form submissions
2. **Asset Storage**: Image hosting solution or CDN
3. **Design System**: Existing Tailwind configuration and theme
4. **Build Pipeline**: CI/CD pipeline for deployment

### Development Dependencies

1. **Vitest**: Testing framework
2. **React Testing Library**: Component testing
3. **Fast-check**: Property-based testing
4. **ESLint**: Code linting
5. **Prettier**: Code formatting
6. **TypeScript Compiler**: Type checking

## Success Metrics

### User Experience Metrics

1. **Bounce Rate**: Reduce bounce rate by 20% compared to old design
2. **Time on Site**: Increase average time on site by 30%
3. **Conversion Rate**: Increase form submission rate by 25%
4. **Mobile Engagement**: Increase mobile user engagement by 40%

### Technical Metrics

1. **Lighthouse Score**: Maintain ≥ 90 performance, ≥ 95 accessibility, ≥ 90 SEO
2. **Core Web Vitals**: Pass all Core Web Vitals thresholds
3. **Load Time**: Reduce initial load time by 40%
4. **Bundle Size**: Reduce JavaScript bundle size by 30%

### Business Metrics

1. **Lead Generation**: Increase contact form submissions by 30%
2. **User Retention**: Increase returning visitor rate by 25%
3. **SEO Rankings**: Maintain or improve search rankings for target keywords
4. **Mobile Traffic**: Increase mobile traffic by 35%

## Risks and Mitigations

### Risk 1: Performance Degradation

**Description**: Large images and animations could slow down page load times.

**Impact**: High

**Likelihood**: Medium

**Mitigation**:
- Implement aggressive image optimization and lazy loading
- Use modern image formats (WebP, AVIF)
- Monitor bundle sizes and implement code splitting
- Conduct performance testing on various devices and networks

### Risk 2: Accessibility Non-Compliance

**Description**: Complex animations and custom components may introduce accessibility issues.

**Impact**: High

**Likelihood**: Medium

**Mitigation**:
- Use accessible component library (shadcn/ui built on Radix UI)
- Conduct automated accessibility testing with axe-core
- Perform manual testing with screen readers
- Include accessibility review in PR process

### Risk 3: Browser Compatibility Issues

**Description**: Modern CSS and JavaScript features may not work in older browsers.

**Impact**: Medium

**Likelihood**: Low

**Mitigation**:
- Test on all target browsers during development
- Implement feature detection and graceful degradation
- Use autoprefixer for CSS compatibility
- Include necessary polyfills for older browsers

### Risk 4: Content Migration Issues

**Description**: Existing content may not fit new design layout.

**Impact**: Medium

**Likelihood**: Medium

**Mitigation**:
- Audit existing content early in project
- Work with content team to adapt content to new design
- Build flexible components that handle varying content lengths
- Implement content guidelines for future updates

### Risk 5: Third-Party Dependency Vulnerabilities

**Description**: Dependencies may have security vulnerabilities or become unmaintained.

**Impact**: Medium

**Likelihood**: Medium

**Mitigation**:
- Regularly audit dependencies with npm audit
- Keep dependencies updated to latest stable versions
- Monitor dependency health and community activity
- Have fallback plans for critical dependencies

## Acceptance Criteria Summary

The Nichols Transportation frontend redesign will be considered complete and acceptable when:

1. All functional requirements (FR-1 through FR-13) are implemented and tested
2. All non-functional requirements (NFR-1 through NFR-10) meet specified thresholds
3. All constraints are respected and documented exceptions are approved
4. Lighthouse scores meet minimum thresholds (Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90)
5. All automated tests pass (unit, integration, accessibility)
6. Manual testing confirms functionality across target browsers and devices
7. Code review is completed and approved by tech lead
8. Design review is completed and approved by design lead
9. Accessibility audit is completed by accessibility specialist
10. Performance testing confirms load times meet requirements
11. Security review confirms no vulnerabilities
12. Documentation is complete (README, component docs, deployment guide)
13. Staging deployment is successful and approved by stakeholders
14. Production deployment plan is reviewed and approved

## Out of Scope

The following items are explicitly out of scope for this redesign project:

1. Backend API development or modifications
2. Content creation or copywriting
3. Photography or custom illustration
4. Video production
5. Email template design
6. Marketing automation setup
7. CRM integration
8. Payment gateway integration
9. Multi-language support
10. User authentication/authorization system
11. Admin dashboard or CMS
12. Mobile native applications
13. Progressive Web App (PWA) features
14. Real-time tracking system implementation (UI only)
15. Analytics implementation (tracking events only, not setup)

These items may be addressed in future phases or separate projects.
