'use client'

import { useTranslations } from 'next-intl'
import { Phone, ClipboardList, Home, Heart } from 'lucide-react'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const STEPS = [
  { number: 1, key: 'step1', icon: Phone,          ctaHref: '/#termine' },
  { number: 2, key: 'step2', icon: ClipboardList,  ctaHref: '/#termine' },
  { number: 3, key: 'step3', icon: Home,            ctaHref: null },
  { number: 4, key: 'step4', icon: Heart,           ctaHref: null },
]

export function ProcessSection() {
  const t   = useTranslations('process')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="ablauf"
      className="relative py-24 overflow-hidden bg-teal-700/70"
      ref={ref}
    >
      {/* Subtle radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(254,204,0,0.07) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(254,204,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        {/* ── Header ── */}
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-16"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.22em] mb-4 px-4 py-1.5 rounded-full"
              style={{
                color: '#fecc00',
                background: 'rgba(254,204,0,0.1)',
                border: '1px solid rgba(254,204,0,0.25)',
              }}
            >
              In 4 Schritten
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {t('heading')}
            </h2>

            <p className="text-lg text-white/55 max-w-2xl mx-auto">
              {t('subheading')}
            </p>
          </m.div>

          {/* ── Steps grid ── */}
          <div className="relative">
            {/* Desktop connector line */}
            <div
              className="hidden lg:block absolute top-[2.85rem] left-[13%] right-[13%] h-px z-0"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(254,204,0,0.6) 20%, rgba(254,204,0,0.6) 80%, transparent)',
              }}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                return (
                  <m.div
                    key={step.key}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.13 }}
                    className="relative z-10 group"
                  >
                    {/* Ghost step number */}
                    <span
                      className="pointer-events-none select-none absolute -top-3 -right-1 text-[8rem] font-black leading-none"
                      style={{ color: 'rgba(254,204,0,0.06)' }}
                      aria-hidden
                    >
                      {step.number}
                    </span>

                    {/* Card */}
                    <div
                      className="relative h-full flex flex-col rounded-2xl p-6 transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.border =
                          '1px solid rgba(254,204,0,0.45)'
                        ;(e.currentTarget as HTMLDivElement).style.background =
                          'rgba(255,255,255,0.06)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                          '0 0 24px rgba(254,204,0,0.08), 0 1px 3px rgba(0,0,0,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.border =
                          '1px solid rgba(255,255,255,0.08)'
                        ;(e.currentTarget as HTMLDivElement).style.background =
                          'rgba(255,255,255,0.04)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                          '0 1px 3px rgba(0,0,0,0.4)'
                      }}
                    >
                      {/* Step number badge */}
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center font-black text-base shrink-0 text-stone-950"
                          style={{ backgroundColor: '#fecc00' }}
                        >
                          {step.number}
                        </div>
                        <div
                          className="h-px flex-1"
                          style={{ background: 'rgba(254,204,0,0.2)' }}
                        />
                      </div>

                      {/* Icon */}
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                        style={{
                          background: 'rgba(254,204,0,0.1)',
                          border: '1px solid rgba(254,204,0,0.2)',
                        }}
                      >
                        <Icon className="h-6 w-6" style={{ color: '#fecc00' }} />
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-white text-lg mb-2 leading-snug">
                        {t(`steps.${step.key}.title` as any)}
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed flex-1">
                        {t(`steps.${step.key}.description` as any)}
                      </p>

                      {/* CTA */}
                      {step.ctaHref && (
                        <Button
                          asChild
                          size="sm"
                          className="mt-5 font-semibold text-stone-950 hover:opacity-90 transition-opacity self-start"
                          style={{ backgroundColor: '#fecc00', border: 'none' }}
                        >
                          <Link href={step.ctaHref}>Jetzt buchen →</Link>
                        </Button>
                      )}
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </LazyMotion>
      </div>
    </section>
  )
}
