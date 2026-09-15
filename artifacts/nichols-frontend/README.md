# Nichols Transportation Frontend

Modern, high-performance website for Nichols Transportation built with React, TypeScript, Vite, and Tailwind CSS 4.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Wouter 3** - Lightweight routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vitest** - Unit testing framework
- **Fast-check** - Property-based testing

## 📁 Project Structure

```
nichols-frontend/
├── public/
│   ├── images/
│   │   ├── hero/          # Hero section backgrounds
│   │   ├── features/      # Feature card images
│   │   └── services/      # Service-related images
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   ├── test/             # Test utilities and setup
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         # Global styles with Tailwind
├── vitest.config.ts      # Test configuration
├── vite.config.ts        # Build configuration
└── package.json
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## 🎨 Design System

### Colors

- **Lime Green**: `#84CC16` - Primary brand color
- **Black**: `#000000` - Secondary brand color
- **Beige**: `#F5F5DC` - Service card background
- **Gray Scale**: `gray-50` through `gray-900`

### Typography

- **Font Family**: System UI stack
- **Headings**: Bold, tight line-height
- **Body**: Regular weight, comfortable line-height (1.6)

### Spacing

8px grid system for consistent spacing:
- `spacing-3`: 8px
- `spacing-6`: 24px
- `spacing-12`: 48px
- `spacing-24`: 96px

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Wide**: > 1440px

## 🧪 Testing

### Unit Tests

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

Test files are located next to their source files with `.test.ts` or `.test.tsx` extension.

### Property-Based Tests

Property-based tests use `fast-check` library and are located in the same test files with clear `PBT:` prefixes.

## 🏗️ Architecture

### Component Structure

- **Layout Components**: Navigation, Footer, Layout wrapper
- **Section Components**: Hero, Services Grid, FAQ, CTA, etc.
- **UI Components**: Buttons, Cards, Accordions (shadcn/ui)
- **Utility Components**: Reusable smaller components

### State Management

- **Local State**: React useState and useReducer
- **Form State**: React Hook Form
- **URL State**: Wouter routing

### Data Flow

1. Data defined in data files (services, FAQs, features)
2. Loaded by custom hooks or imported directly
3. Passed as props to components
4. Rendered with appropriate styling and interactions

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

Outputs optimized static files to `dist/` directory.

### Build Optimization

- Code splitting by route
- CSS purging via Tailwind
- Image optimization
- Tree shaking for unused code

### Deployment

The built application is a static site that can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting provider

## 🔒 Security

- Input sanitization for forms
- XSS prevention via React's built-in escaping
- CSRF protection for form submissions
- Content Security Policy headers (configure in hosting)

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels where appropriate

## 📊 Performance

### Targets

- Lighthouse Performance: ≥ 90
- Lighthouse Accessibility: ≥ 95
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s

### Optimization Techniques

- Lazy loading for below-fold images
- Code splitting for routes
- Efficient animations using CSS transforms
- Reduced motion support
- Optimized bundle size

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Run linter and fix any issues
5. Submit pull request with clear description

## 📄 License

Copyright © 2024 Nichols Transportation. All rights reserved.

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 5173
npx kill-port 5173
```

**Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Clear TypeScript cache
rm -rf node_modules/.tmp
```

## 📞 Support

For issues or questions, contact the development team.
