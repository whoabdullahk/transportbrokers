import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'

export function Privacy() {
  return (
    <div className="bg-brand-black text-white selection:bg-lime-500 selection:text-black min-h-screen">
      <section className="pt-32 pb-20 border-b border-white/10 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono text-lime-400 hover:text-lime-300 uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            <span>Return to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-sm text-gray-400 font-mono">
            Transport Brokers Inc. • Effective Date: January 1, 2025
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-gray-300 leading-relaxed font-light">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            1. Information We Collect
          </h2>
          <p>
            Transport Brokers Inc. collects information necessary to coordinate interstate freight transportation, carrier credential verification, load tracking, and accounting settlement. This includes carrier company information, DOT/MC numbers, certificates of insurance, driver contact phone numbers, and load reference documents.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            2. Operational Use of Data
          </h2>
          <p>
            Data submitted through our digital dispatch tools or intake forms is strictly utilized for commercial logistics coordination, dispatch check calls, safety compliance audits, and billing. We do not sell, rent, or distribute carrier or shipper operational data to third-party marketing entities.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            3. Regulatory Disclosures
          </h2>
          <p>
            Information may be disclosed to the Federal Motor Carrier Safety Administration (FMCSA), state departments of transportation, or law enforcement entities when required by federal law, safety audits, or insurance claim investigations.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            4. Contact Our Compliance Office
          </h2>
          <p>
            For inquiries regarding privacy, data retention, or carrier files, contact our Alexandria office:
          </p>
          <div className="p-4 rounded-lg bg-brand-surface border border-white/10 text-xs font-mono space-y-1 text-gray-300">
            <div>Transport Brokers Inc.</div>
            <div>111 Pecan Row Ln, Alexandria, LA 71303</div>
            <div>Email: billing@TBItransportation.com</div>
            <div>Direct: (443) 560-0311</div>
          </div>
        </div>
      </section>
    </div>
  )
}
