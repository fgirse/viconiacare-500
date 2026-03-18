'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Phone,
  ClipboardList,
  ExternalLink,
  Clock,
  Video,
  Gift,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const CAL_NAMESPACE      = process.env.NEXT_PUBLIC_CAL_NAMESPACE ?? 'viconiacare'
const CAL_ERSTGESPRAECH  = process.env.NEXT_PUBLIC_CAL_LINK_ERSTGESPRAECH  ?? `${CAL_NAMESPACE}/ersttelefonat`
const CAL_BEDARFSANALYSE = process.env.NEXT_PUBLIC_CAL_LINK_BEDARFSANALYSE ?? `${CAL_NAMESPACE}/bedarfsanalyse`

const APPOINTMENTS = [
  {
    step: '01',
    stepLabel: 'Schritt 1',
    icon: Phone,
    title: 'Ersttelefonat',
    description:
      'Kostenloses, unverbindliches Telefonat. Wir hören zu, beantworten Ihre Fragen und klären erste Möglichkeiten der Unterstützung.',
    meta: [
      { icon: Clock, label: 'ca. 15–20 Min.' },
      { icon: Phone, label: 'Telefonisch' },
      { icon: Gift,  label: 'Kostenlos' },
    ],
    ctaKey: 'initial_call' as const,
    ctaHref: `https://cal.com/${CAL_ERSTGESPRAECH}`,
    featured: false,
  },
  {
    step: '02',
    stepLabel: 'Schritt 2',
    icon: ClipboardList,
    title: 'Bedarfsanalyse-Interview',
    description:
      'Detailliertes Interview mit unserer Pflegefachkraft. Wir ermitteln Ihren individuellen Bedarf und erstellen einen ersten Pflegeplan.',
    meta: [
      { icon: Clock,  label: 'ca. 30–45 Min.' },
      { icon: Video,  label: 'Video oder Telefon' },
      { icon: Gift,   label: 'Kostenlos' },
    ],
    ctaKey: 'needs_assessment' as const,
    ctaHref: `https://cal.com/${CAL_BEDARFSANALYSE}`,
    featured: true,
  },
]

const TRUST_ITEMS = [
  { icon: Gift,         label: 'Kostenfrei' },
  { icon: CheckCircle2, label: 'Keine Bindung' },
  { icon: PhoneCall,    label: 'Sofort erreichbar' },
]

export function AppointmentsSection() {
  const t   = useTranslations('appointments')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="termine" className="relative py-28 overflow-hidden bg-stone-500" ref={ref}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 15% 45%, rgba(254,204,0,0.07) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 55% 55% at 85% 55%, rgba(254,204,0,0.05) 0%, transparent 70%)',
        }}
      />
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.2' fill='%23ffffff'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container relative z-10">
        <LazyMotion features={domAnimation}>

          {/* Header */}
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] mb-4 px-4 py-1.5 rounded-full"
              style={{
                color: '#fecc00',
                background: 'rgba(254,204,0,0.1)',
                border: '1px solid rgba(254,204,0,0.25)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#fecc00' }}
              />
              Kostenlos &amp; Unverbindlich
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
              {t('subheading')}
            </p>
          </m.div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {APPOINTMENTS.map((appt, i) => {
              const Icon = appt.icon
              return (
                <m.div
                  key={appt.step}
                  initial={{ opacity: 0, y: 36 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}
                  className="relative group"
                >
                  {/* Empfohlen badge */}
                  {appt.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-lg"
                        style={{ backgroundColor: '#fecc00', color: '#0c0c0c' }}
                      >
                        <Sparkles className="h-3 w-3" />
                        Empfohlen
                      </span>
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className="h-full flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: appt.featured ? 'rgba(254,204,0,0.05)' : 'rgba(255,255,255,0.04)',
                      border: appt.featured
                        ? '1px solid rgba(254,204,0,0.3)'
                        : '1px solid rgba(255,255,255,0.08)',
                      borderTop: appt.featured ? '4px solid #fecc00' : undefined,
                      boxShadow: appt.featured ? '0 0 40px rgba(254,204,0,0.07)' : 'none',
                    }}
                  >
                    {/* Step label + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                          color: '#fecc00',
                          background: 'rgba(254,204,0,0.1)',
                          border: '1px solid rgba(254,204,0,0.2)',
                        }}
                      >
                        {appt.stepLabel}
                      </span>
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: '#fecc00' }}
                      >
                        <Icon className="h-5 w-5 text-stone-950" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">{appt.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">
                      {appt.description}
                    </p>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {appt.meta.map(({ icon: MetaIcon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/60"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.09)',
                          }}
                        >
                          <MetaIcon className="h-3 w-3 shrink-0" style={{ color: '#fecc00' }} />
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      asChild
                      className="w-full gap-2 font-semibold hover:opacity-90 transition-opacity"
                      style={
                        appt.featured
                          ? { backgroundColor: '#fecc00', color: '#0c0c0c', border: 'none' }
                          : {
                              background: 'rgba(254,204,0,0.08)',
                              color: '#fecc00',
                              border: '1px solid rgba(254,204,0,0.28)',
                            }
                      }
                    >
                      <a href={appt.ctaHref} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-4 w-4" />
                        {t(appt.ctaKey)}
                        <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-70" />
                      </a>
                    </Button>
                  </div>
                </m.div>
              )
            })}
          </div>

          {/* Trust strip */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="mt-12 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-white/50">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: '#fecc00' }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </m.div>

          {/* Phone fallback */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.58 }}
            className="mt-8 text-center"
          >
            <p className="text-white/35 text-sm mb-3">Lieber direkt anrufen?</p>
            <Button
              asChild
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/8 gap-2"
              style={{ border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <a href="tel:+4930123456789">
                <PhoneCall className="h-4 w-4" style={{ color: '#fecc00' }} />
                +49 30 123 456 789
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </a>
            </Button>
            <p className="text-white/25 text-xs mt-3">Notfall: 24/7 erreichbar</p>
          </m.div>

        </LazyMotion>
      </div>
    </section>
  )
}
