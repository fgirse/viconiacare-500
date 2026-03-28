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
    <section id="termine" className="relative py-28 overflow-hidden bg-[#e4e6f4]" ref={ref}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 15% 45%, rgba(13,148,136,0.09) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 55% 55% at 85% 55%, rgba(13,148,136,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.2' fill='%231c1917'/%3E%3C/svg%3E\")",
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
                color: '#0f766e',
                background: 'rgba(13,148,136,0.12)',
                border: '1px solid rgba(13,148,136,0.30)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#0d9488' }}
              />
              Kostenlos &amp; Unverbindlich
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-800 mb-5 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-lg text-stone-600 max-w-xl mx-auto leading-relaxed">
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
                        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-md"
                        style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
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
                      background: appt.featured ? 'rgba(13,148,136,0.07)' : 'rgba(255,255,255,0.6)',
                      border: appt.featured
                        ? '1px solid rgba(13,148,136,0.30)'
                        : '1px solid rgba(0,0,0,0.07)',
                      borderTop: appt.featured ? '4px solid #0d9488' : undefined,
                      boxShadow: appt.featured
                        ? '0 0 40px rgba(13,148,136,0.08)'
                        : '0 2px 12px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Step label + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                          color: '#0f766e',
                          background: 'rgba(13,148,136,0.12)',
                          border: '1px solid rgba(13,148,136,0.25)',
                        }}
                      >
                        {appt.stepLabel}
                      </span>
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: '#0d9488' }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-stone-800 mb-3">{appt.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1">
                      {appt.description}
                    </p>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {appt.meta.map(({ icon: MetaIcon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-stone-600"
                          style={{
                            background: 'rgba(0,0,0,0.05)',
                            border: '1px solid rgba(0,0,0,0.08)',
                          }}
                        >
                          <MetaIcon className="h-3 w-3 shrink-0" style={{ color: '#0d9488' }} />
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
                          ? { backgroundColor: '#0d9488', color: '#ffffff', border: 'none' }
                          : {
                              background: 'rgba(13,148,136,0.12)',
                              color: '#0f766e',
                              border: '1px solid rgba(13,148,136,0.30)',
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
                <div key={label} className="flex items-center gap-2 text-sm text-stone-600">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: '#0d9488' }} />
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
            <p className="text-stone-500 text-sm mb-3">Lieber direkt anrufen?</p>
            <Button
              asChild
              variant="ghost"
              className="text-stone-800 hover:text-stone-900 hover:bg-stone-800/8 gap-2"
              style={{ border: '1px solid rgba(0,0,0,0.10)' }}
            >
              <a href="tel:+4930123456789">
                <PhoneCall className="h-4 w-4" style={{ color: '#0d9488' }} />
                +49 30 123 456 789
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </a>
            </Button>
            <p className="text-stone-400 text-xs mt-3">Notfall: 24/7 erreichbar</p>
          </m.div>

        </LazyMotion>
      </div>
    </section>
  )
}
