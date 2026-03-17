'use client'

import Link from 'next/link'
import Image from 'next/image'
import Graffity from '../../../public/Assets/Images/Graffity03.png';
import CTA from '../../../public/Assets/SVG/kalenderbutton.svg';
import Logo from '../../../public/Assets/SVG/ViconiaLogoQueroBG.svg';
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Phone, Shield, Star, Heart } from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'framer-motion'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/Assets/SVG/Herobg.svg')] bg-cover bg-center opacity-10" />
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-viconia-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-viconia-400/20 blur-3xl" />

      {/* Logo – mobile/tablet only, top-right, uppermost layer */}
      <div className="lg:hidden absolute p-8 top-6 right-4 z-20 rounded-xl pointer-events-none bg-stone-200">
        <Image src={Logo} alt="ViconiaCare Logo" width={160} height={60} className="w-96 sm:w-96 object-contain" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text content */}
          <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className=' flex flex-row justify-between relative -top-20 lg:top-[-2vw] lg:right-[4vw] ' >
                <Image id="graffity"src={Graffity} alt="Graffity" width={800} height={300} className='relative size-36 w-[40vw] left-2 sm:size-60 lg:w-[50vw] rotate-[-15deg] sm:-top-30 md:w-[50vw]  md:-top-32 lg:-top-20 lg:left-[-12vw] z-20'  />
                 <Image src={CTA} alt="Termin Button" width={400} height={300} className=' relative z-10 size-24 top-[6vh] sm:size-36 lg:size-80 rotate-[-15deg] sm:-top-20 md:top-20 lg:left-[-12vw] lg:-top-24'  />
            </div>
            <Badge className="mb-6 bg-viconia-500/20 text-[#252928] border border-viconia-400/30 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-1" />
              {t('badge')}
            </Badge>
          
            <h1 className="text-yellow-400 text-4xl sm:text-5xl xl:text-6xl font-black leading-tight mb-6">
              {t('headline')}
            </h1>

            <p className="text-lg sm:text-xl text-[#252928] leading-relaxed mb-8 max-w-lg">
              {t('subline')}
            </p>

            {/* Stats */}
            <div className="z-50 *:flex flex-wrap gap-8 mb-10">
              {[
                { value: '500+', label: 'Patienten betreut' },
                { value: '98%', label: 'Weiterempfehlung' },
                { value: '10+', label: 'Jahre Erfahrung' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-base py-1 px-2 font-black text-[#252928] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-yellow-600 text-[#252928] hover:bg-yellow-400/50 shadow-lg">
                <Link href="/termine">
                  <Phone className="h-5 w-5" />
                  {t('cta_primary')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-teal/90 text-[#252928] hover:bg-yellow-400/50 backdrop-blur-sm">
                <Link href="/#leistungen">
                  {t('cta_secondary')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </m.div>

          {/* Card visual */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className='flex flex-col z-10 items-center justify-center'>
             <Image src={Logo} alt="Hero Card" width={400} height={300} className="size-36 px-5 py-5 rounded-xl shadow-xl sm:size-60 lg:w-full lg:h-full object-cover bg-stone-200" />
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-viconia-500 text-white rounded-xl px-4 py-2 shadow-lg text-sm font-semibold">
                Pflegegrad 1–5
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-viconia-800 font-bold text-2xl">24/7</div>
                <div className="text-gray-600 text-xs">Notfall-Erreichbarkeit</div>
              </div>
            </div>
          </m.div>
          </LazyMotion>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full fill-background">
          <path d="M0,60 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 Z" />
        </svg>
      </div>
    </section>
  )
}
