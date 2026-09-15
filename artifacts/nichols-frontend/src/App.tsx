import { Switch, Route } from 'wouter'
import { Layout, ScrollToTop } from './components/layout'
import {
  Home,
  About,
  CarrierServices,
  Insurance,
  Permits,
  TrackOrder,
  Contact,
  Privacy,
} from './pages'

export function App() {
  return (
    <Layout fullWidth backgroundColor="white">
      <ScrollToTop />
      <Switch>
        {/* / - Homepage */}
        <Route path="/" component={Home} />

        {/* /about - About TBI */}
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
    </Layout>
  )
}

export default App
