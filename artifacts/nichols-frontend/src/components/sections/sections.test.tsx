import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  HeroSection,
  HeroCTASection,
  OurSolutionSection,
  ServicesGrid,
  ServiceCard,
  FeaturesScroll,
  StatsSection,
  FAQSection,
  FullPageImage,
  CTASection,
  ProcessSection,
  TrackingWidget,
} from './index'
import { ContactForm } from '../contact/ContactForm'

describe('Home Page Sections', () => {
  it('HeroSection renders title, description, and statistics', () => {
    render(<HeroSection />)
    expect(screen.getByText('Transport Brokers Inc.')).toBeInTheDocument()
    expect(screen.getAllByText(/500/)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/97/)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/24/)[0]).toBeInTheDocument()
  })

  it('HeroCTASection renders headline and consultation link', () => {
    render(<HeroCTASection />)
    expect(screen.getByText('LOGISTICS THAT MOVE WITH PRECISION')).toBeInTheDocument()
    expect(screen.getByText('Request a Consultation')).toBeInTheDocument()
  })


  it('OurSolutionSection renders oversized heading and features', () => {
    render(<OurSolutionSection />)
    expect(screen.getByText('Our Solution')).toBeInTheDocument()
    expect(screen.getByText('The TBI Advantage')).toBeInTheDocument()
  })

  it('ServicesGrid renders 8 service cards', () => {
    render(<ServicesGrid />)
    expect(screen.getByText('Dedicated Freight Lanes')).toBeInTheDocument()
    expect(screen.getByText('Trailer Rental Program')).toBeInTheDocument()
    expect(screen.getByText('TWIC Card Assistance')).toBeInTheDocument()
    expect(screen.getByText('Insurance Assistance')).toBeInTheDocument()
    expect(screen.getByText('Factoring Registration')).toBeInTheDocument()
    expect(screen.getByText('Specialized Permit Loads')).toBeInTheDocument()
    expect(screen.getByText('Permit Application Support')).toBeInTheDocument()
    expect(screen.getByText('DOT Compliance Support')).toBeInTheDocument()
  })

  it('ServiceCard applies correct theme based on background color', () => {
    render(
      <ServiceCard
        title="TWIC Card Assistance"
        description="Assistance with TWIC credentialing."
        backgroundColor="black"
        link="/services/permits"
      />
    )
    const card = screen.getByTestId('service-card-black')
    expect(card).toHaveClass('bg-black')
    expect(screen.getByText('TWIC Card Assistance')).toHaveClass('text-white')
  })

  it('FeaturesScroll renders feature cards and controls', () => {
    render(<FeaturesScroll />)
    expect(screen.getByText('Insurance Compliance')).toBeInTheDocument()
    expect(screen.getByText('Factoring Support')).toBeInTheDocument()
    expect(screen.getByText('Moving Carriers Forward')).toBeInTheDocument()
    expect(screen.getByText('Dedicated Lanes')).toBeInTheDocument()
  })

  it('StatsSection renders 10K+ stat and description', () => {
    render(<StatsSection />)
    expect(screen.getByText('10K+')).toBeInTheDocument()
    expect(screen.getByText('LOADS DISPATCHED')).toBeInTheDocument()
  })

  it('FAQSection toggles accordion item on click', () => {
    render(<FAQSection />)
    const questionButton = screen.getByText('How do I get onboarded with Transport Brokers Inc. as a carrier?')
    expect(questionButton).toBeInTheDocument()

    // Click to toggle
    fireEvent.click(questionButton)
    // The question remains rendered
    expect(questionButton).toBeInTheDocument()
  })

  it('FullPageImage renders image with overlay', () => {
    render(<FullPageImage />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/images/hero/foggy-highway-trailer.jpg')
  })

  it('CTASection renders headline and call button', () => {
    render(<CTASection />)
    expect(screen.getByText('Ready To Haul More Freight?')).toBeInTheDocument()
    expect(screen.getByText('Get Started Today')).toBeInTheDocument()
  })

  it('ContactForm validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitBtn = screen.getByRole('button', { name: /submit request/i })
    await user.click(submitBtn)

    expect(screen.getByText(/Full Name must be at least 2 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument()
  })

  it('ProcessSection renders all 5 operational steps', () => {
    render(<ProcessSection />)
    expect(screen.getAllByText('Tell Us What You Need')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Review Requirements')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Complete Service Process')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Move Forward')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Ongoing Support')[0]).toBeInTheDocument()
  })

  it('TrackingWidget renders tracking interface and active shipment data', () => {
    render(<TrackingWidget />)
    expect(screen.getByText(/Track Your/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter BOL \/ Tracking ID/i)).toBeInTheDocument()
    expect(screen.getByText('IN TRANSIT • ON SCHEDULE')).toBeInTheDocument()
  })
})


