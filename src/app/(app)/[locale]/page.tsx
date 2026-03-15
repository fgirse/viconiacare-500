import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { Gallery27 }   from '@/components/gallery27';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { AppointmentsSection } from '@/components/landing/AppointmentsSection';

export default async function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AppointmentsSection />
      <TestimonialsSection />
      <Gallery27 />
      <ContactSection />
    </>
  )
}
