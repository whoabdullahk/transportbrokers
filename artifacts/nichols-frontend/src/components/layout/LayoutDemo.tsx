import { Layout } from './Layout'

/**
 * Layout Demo Component
 * 
 * This component demonstrates the Layout component across different
 * configurations and breakpoints. Used for visual testing and documentation.
 */
export function LayoutDemo() {
  return (
    <div className="space-y-16">
      {/* Demo 1: Default Layout */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Default Layout (Constrained Container)</h2>
        <Layout>
          <div className="bg-lime-500 p-8 text-black text-center">
            <h3 className="text-2xl font-bold mb-4">Constrained Container</h3>
            <p className="mb-4">
              This content is constrained by the responsive container width.
            </p>
            <div className="bg-white/20 p-4 rounded">
              <p className="text-sm">
                Mobile: Full width with 1rem padding (16px)<br />
                Tablet (md): max-w-768px with 2rem padding (32px)<br />
                Desktop (lg): max-w-1024px with 2rem padding (32px)<br />
                Wide (xl): max-w-1280px with 2rem padding (32px)
              </p>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 2: Full-Width Layout */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Full-Width Layout</h2>
        <Layout fullWidth>
          <div className="bg-black p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Full-Width Content</h3>
            <p className="mb-4">
              This content spans the full width of the viewport, perfect for hero sections.
            </p>
            <div className="bg-white/10 p-4 rounded inline-block">
              <p className="text-sm">
                Used for: Hero sections, Full-page images, Edge-to-edge content
              </p>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 3: Beige Background */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Beige Background</h2>
        <Layout backgroundColor="beige">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">Beige Background Variant</h3>
            <p className="mb-4">
              This layout uses the beige accent color (#F5F5DC) as background.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold mb-2">Card 1</h4>
                <p className="text-gray-600">Content with white background on beige layout.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold mb-2">Card 2</h4>
                <p className="text-gray-600">Demonstrates contrast with beige background.</p>
              </div>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 4: Gray Background */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Gray-50 Background</h2>
        <Layout backgroundColor="gray-50">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">Gray Background Variant</h3>
            <p className="mb-4 text-gray-700">
              This layout uses a light gray background for subtle differentiation.
            </p>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Service Card</h4>
              <p className="text-gray-600">
                White cards on gray background provide excellent visual hierarchy.
              </p>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 5: 8px Grid System Demo */}
      <section>
        <h2 className="text-3xl font-bold mb-4">8px Grid System Spacing</h2>
        <Layout>
          <div className="p-8 bg-gray-100">
            <h3 className="text-2xl font-bold mb-6">Spacing Scale</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-lime-500"></div>
                <span>2px - spacing-1 (0.125rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-lime-500"></div>
                <span>4px - spacing-2 (0.25rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-8 bg-lime-500"></div>
                <span>8px - spacing-3 (0.5rem) - Base Unit</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-8 bg-lime-500"></div>
                <span>12px - spacing-4 (0.75rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-8 bg-lime-500"></div>
                <span>16px - spacing-5 (1rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-8 bg-lime-500"></div>
                <span>24px - spacing-6 (1.5rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-lime-500"></div>
                <span>32px - spacing-8 (2rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-8 bg-lime-500"></div>
                <span>40px - spacing-10 (2.5rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-lime-500"></div>
                <span>48px - spacing-12 (3rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-8 bg-lime-500"></div>
                <span>64px - spacing-16 (4rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-8 bg-lime-500"></div>
                <span>80px - spacing-20 (5rem)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-8 bg-lime-500"></div>
                <span>96px - spacing-24 (6rem)</span>
              </div>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 6: Responsive Breakpoints */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Responsive Breakpoints</h2>
        <Layout>
          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-bold mb-4">Active Breakpoint Indicator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="bg-lime-500 p-6 text-black rounded-lg block md:hidden">
                <h4 className="font-bold">Mobile</h4>
                <p className="text-sm">{'< 768px'}</p>
              </div>
              <div className="bg-lime-500 p-6 text-black rounded-lg hidden md:block lg:hidden">
                <h4 className="font-bold">Tablet (md)</h4>
                <p className="text-sm">768px - 1024px</p>
              </div>
              <div className="bg-lime-500 p-6 text-black rounded-lg hidden lg:block xl:hidden">
                <h4 className="font-bold">Desktop (lg)</h4>
                <p className="text-sm">1024px - 1440px</p>
              </div>
              <div className="bg-lime-500 p-6 text-black rounded-lg hidden xl:block">
                <h4 className="font-bold">Wide (xl)</h4>
                <p className="text-sm">{'>= 1440px'}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Current Container Behavior:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li className="block md:hidden">Mobile: Full width, 16px padding</li>
                <li className="hidden md:block lg:hidden">Tablet: 768px max-width, 32px padding</li>
                <li className="hidden lg:block xl:hidden">Desktop: 1024px max-width, 32px padding</li>
                <li className="hidden xl:block">Wide: 1280px max-width, 32px padding</li>
              </ul>
            </div>
          </div>
        </Layout>
      </section>

      {/* Demo 7: Color Scheme Reference */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Brand Color Scheme</h2>
        <Layout>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">Design System Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 bg-lime-500 rounded-lg mb-2"></div>
                <h4 className="font-bold">Lime Green</h4>
                <p className="text-sm text-gray-600">#84CC16</p>
                <p className="text-xs text-gray-500">Primary Brand</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-black rounded-lg mb-2"></div>
                <h4 className="font-bold">Black</h4>
                <p className="text-sm text-gray-600">#000000</p>
                <p className="text-xs text-gray-500">Secondary Brand</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-beige rounded-lg mb-2 border"></div>
                <h4 className="font-bold">Beige</h4>
                <p className="text-sm text-gray-600">#F5F5DC</p>
                <p className="text-xs text-gray-500">Accent Color</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-gray-50 rounded-lg mb-2 border"></div>
                <h4 className="font-bold">Gray-50</h4>
                <p className="text-sm text-gray-600">Light Gray</p>
                <p className="text-xs text-gray-500">Neutral Background</p>
              </div>
            </div>
          </div>
        </Layout>
      </section>
    </div>
  )
}
