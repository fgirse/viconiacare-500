'use client'

import { useTranslations } from 'next-intl'
import { Phone, ClipboardList, Home, Heart } from 'lucide-react'
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const STEPS = [
  {
    number: 1,
    key: 'step1',
    icon: Phone,
    ctaHref: '/#termine',
  },
  {
    number: 2,
    key: 'step2',
    icon: ClipboardList,
    ctaHref: '/#termine',
  },
  {
    number: 3,
    key: 'step3',
    icon: Home,
    ctaHref: null,
  },
  {
    number: 4,
    key: 'step4',
    icon: Heart,
    ctaHref: null,
  },
]

export function ProcessSection() {
  const t = useTranslations('process')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ablauf" className="py-24 bg-stone-300" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider mb-2 inline-block" style={{ color: '#fecc00' }}>
            In 4 Schritten
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Stair-step layout */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 z-0"
            style={{ background: 'linear-gradient(to right, #fecc00aa, #fecc00)' }}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <LazyMotion key={step.key} features={domAnimation}>
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: index * 8 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                    {/* Step number & icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 text-stone-900"
                        style={{ backgroundColor: '#fecc00' }}
                      >
                        {step.number}
                      </div>
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: '#fecc0020' }}
                      >
                        <step.icon className="h-5 w-5" style={{ color: '#fecc00' }} />
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {t(`steps.${step.key}.title` as any)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`steps.${step.key}.description` as any)}
                    </p>

                    {step.ctaHref && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-4 border-stone-400 hover:bg-stone-100"
                        style={{ color: '#fecc00', borderColor: '#fecc0080' }}
                      >
                        <Link href={step.ctaHref}>
                          Jetzt buchen →
                        </Link>
                      </Button>
                    )}
                  </div>
                </m.div>
              </LazyMotion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
