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
} from 'lucide-react'

const CAL_NAMESPACE = process.env.NEXT_PUBLIC_CAL_NAMESPACE ?? 'viconiacare'
const CAL_ERSTGESPRAECH =
  process.env.NEXT_PUBLIC_CAL_LINK_ERSTGESPRAECH ?? `${CAL_NAMESPACE}/ersttelefonat`
const CAL_BEDARFSANALYSE =
  process.env.NEXT_PUBLIC_CAL_LINK_BEDARFSANALYSE ?? `${CAL_NAMESPACE}/bedarfsanalyse`

const APPOINTMENTS = [
  {
    step: '01',
    stepLabel: 'Schritt 1',
    icon: Phone,
    accentClass: 'bg-viconia-500',
    borderClass: 'border-t-viconia-400',
    badgeClass: 'bg-viconia-500/20 text-viconia-300 border-viconia-500/30',
    title: 'Ersttelefonat',
    description:
      'Kostenloses, unverbindliches Telefonat. Wir hören zu, beantworten Ihre Fragen und klären erste Möglichkeiten der Unterstützung.',
    meta: [
      { icon: Clock, label: 'ca. 15–20 Min.' },
      { icon: Phone, label: 'Telefonisch' },
      { icon: Gift, label: 'Kostenlos' },
    ],
    ctaKey: 'initial_call' as const,
    ctaHref: `https://cal.com/${CAL_ERSTGESPRAECH}`,
    ctaVariant: 'default' as const,
    ctaClass: 'bg-viconia-500 hover:bg-viconia-400 text-white shadow-lg shadow-viconia-900/50',
    featured: false,
  },
  {
    step: '02',
    stepLabel: 'Schritt 2',
    icon: ClipboardList,
    accentClass: 'bg-red-400',
    borderClass: 'border-t-yellow-400',
    badgeClass: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    title: 'Bedarfsanalyse-Interview',
    description:
      'Detailliertes Interview mit unserer Pflegefachkraft. Wir ermitteln Ihren individuellen Bedarf und erstellen einen ersten Pflegeplan.',
    meta: [
      { icon: Clock, label: 'ca. 30–45 Min.' },
      { icon: Video, label: 'Video oder Telefon' },
      { icon: Gift, label: 'Kostenlos' },
    ],
    ctaKey: 'needs_assessment' as const,
    ctaHref: `https://cal.com/${CAL_BEDARFSANALYSE}`,
    ctaVariant: 'default' as const,
    ctaClass:
      'bg-yellow-400 hover:bg-yellow-300 text-viconia-950 font-semibold shadow-lg shadow-yellow-900/20',
    featured: true,
  },
]

const TRUST_ITEMS = [
  { icon: Gift, label: 'Kostenfrei' },
  { icon: CheckCircle2, label: 'Keine Bindung' },
  { icon: PhoneCall, label: 'Sofort erreichbar' },
]

export function AppointmentsSection() {
  const t = useTranslations('appointments')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="termine" className="relative py-28 overflow-hidden bg-viconia-950">
      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-viconia-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-yellow-500/10 blur-[100px]" />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 0h1v40H0zm40 0h1v40h-1zM0 0v1h40V0zm0 40v1h40v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        <LazyMotion features={domAnimation}>
          {/* Header */}
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-viconia-500/30 bg-viconia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-viconia-300 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-viconia-400 animate-pulse" />
              Kostenlos &amp; Unverbindlich
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-lg text-viconia-200 max-w-xl mx-auto leading-relaxed">
              {t('subheading')}
            </p>
          </m.div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {APPOINTMENTS.map((appt, i) => (
              <m.div
                key={appt.step}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className={`group relative flex flex-col rounded-2xl border-t-4 ${appt.borderClass} bg-white/[0.07] backdrop-blur-md border border-white/10 p-8 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 ${appt.featured ? 'ring-1 ring-yellow-400/30' : ''}`}
              >
                {/* Featured badge */}
                {appt.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-yellow-400 text-viconia-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-md">
                    Empfohlen
                  </span>
                )}

                {/* Step badge + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${appt.badgeClass}`}
                  >
                    {appt.stepLabel}
                  </span>
                  <div
                    className={`h-12 w-12 rounded-xl ${appt.accentClass} flex items-center justify-center shadow-lg`}
                  >
                    <appt.icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{appt.title}</h3>

                {/* Description */}
                <p className="text-sm text-viconia-200 leading-relaxed mb-6 flex-1">
                  {appt.description}
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {appt.meta.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-viconia-200 border border-white/10"
                    >
                      <Icon className="h-3 w-3 shrink-0 text-viconia-300" />
                      {label}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild className={`w-full gap-2 ${appt.ctaClass}`}>
                  <a href={appt.ctaHref} target="_blank" rel="noopener noreferrer">
                    <appt.icon className="h-4 w-4" />
                    {t(appt.ctaKey)}
                    <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-70" />
                  </a>
                </Button>
              </m.div>
            ))}
          </div>

          {/* Trust strip */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-viconia-300">
                  <Icon className="h-4 w-4 text-viconia-400 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </m.div>

          {/* Direct call fallback */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.58 }}
            className="mt-10 text-center"
          >
            <p className="text-viconia-400 text-sm mb-3">Lieber direkt anrufen?</p>
            <Button
              asChild
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/10 gap-2 border border-white/10"
            >
              <a href="tel:+4930123456789">
                <PhoneCall className="h-4 w-4 text-viconia-400" />
                +49 30 123 456 789
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            </Button>
            <p className="text-viconia-600 text-xs mt-3">Notfall: 24/7 erreichbar</p>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  )
}
