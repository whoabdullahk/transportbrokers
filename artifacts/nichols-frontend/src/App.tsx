import { lazy, Suspense } from 'react'
import { Switch, Route } from 'wouter'
import { Layout, ScrollToTop } from './components/layout'
import { Home } from './pages/Home/Home'

// Statically import Home so landing page renders instantly (0ms delay)
// Lazy load all secondary routes so initial bundle is minimal
const About = lazy(() => import('./pages/About/About').then((m) => ({ default: m.About })))
const CarrierServices = lazy(() =>
  import('./pages/CarrierServices/CarrierServices').then((m) => ({ default: m.CarrierServices })),
)
const Insurance = lazy(() =>
  import('./pages/Insurance/Insurance').then((m) => ({ default: m.Insurance })),
)
const Permits = lazy(() =>
  import('./pages/Permits/Permits').then((m) => ({ default: m.Permits })),
)
const TrackOrder = lazy(() =>
  import('./pages/TrackOrder/TrackOrder').then((m) => ({ default: m.TrackOrder })),
)
const Contact = lazy(() =>
  import('./pages/Contact/Contact').then((m) => ({ default: m.Contact })),
)
const Privacy = lazy(() =>
  import('./pages/Privacy/Privacy').then((m) => ({ default: m.Privacy })),
)

function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 bg-brand-black" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-500/20 border-t-lime-500" />
      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Loading...</span>
    </div>
  )
}

export function App() {
  return (
    <Layout fullWidth backgroundColor="white">
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Switch>
          {/* / - Homepage (statically loaded for instant first paint) */}
          <Route path="/" component={Home} />

          {/* /about - About Gold Star Transportation, Inc. */}
          <Route path="/about" component={About} />

          {/* /carrier-services - Carrier Services */}
          <Route path="/carrier-services" component={CarrierServices} />

          {/* /insurance - Insurance Services */}
          <Route path="/insurance" component={Insurance} />

          {/* /permits - Permits & Certifications */}
          <Route path="/permits" component={Permits} />

          {/* /track-order - Track Order */}
          <Route path="/track-order" component={TrackOrder} />

          {/* /contact - Contact / Get Started */}
          <Route path="/contact" component={Contact} />

          {/* /admin - Admin Portal Redirect */}
          <Route path="/admin">
            {() => {
              if (typeof window !== 'undefined') {
                window.location.href = 'http://localhost:5173/'
              }
              return (
                <div className="pt-32 pb-20 text-center">
                  <p className="text-sm font-mono text-gray-600">Redirecting to Admin Portal...</p>
                </div>
              )
            }}
          </Route>

          {/* /privacy - Privacy Policy */}
          <Route path="/privacy" component={Privacy} />

          {/* Fallback to Home for unknown paths */}
          <Route component={Home} />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
