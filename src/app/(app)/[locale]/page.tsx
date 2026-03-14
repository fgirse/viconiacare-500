import { HeroSection } from '@/components/landing/HeroSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { TeamSection } from '@/components/landing/TeamSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { AppointmentsSection } from '@/components/landing/AppointmentsSection'

export default async function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AppointmentsSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
