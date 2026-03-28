import Intro from '@/components/landing/HeroSection5';


import  HeroSection6 from '@/components/landing/HeroSection6';
import ServicesSection  from '@/components/landing/ServicesSection';
import HowItWorksSection from '@/components/landing/HowItWorks';
import { Gallery27 }   from '@/components/gallery27';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import  ContactSection  from '@/components/landing/ContactSection';
import { AppointmentsSection } from '@/components/landing/AppointmentsSection';



export default async function LandingPage() {
  return (
  
    <>    

    <Intro/>
      <HeroSection6 />
      <ServicesSection />
      <HowItWorksSection />
      <AppointmentsSection />
      <TestimonialsSection />
      <Gallery27 />
      <ContactSection />
    </>
  )
}
