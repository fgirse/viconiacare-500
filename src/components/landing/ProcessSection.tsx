'use client'

import { useTranslations } from 'next-intl'
import { Phone, ClipboardList, Home, Heart } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const STEPS = [
  {
    number: 1,
    key: 'step1',
    icon: Phone,
    color: 'bg-viconia-500',
    ctaHref: '/#termine',
  },
  {
    number: 2,
    key: 'step2',
    icon: ClipboardList,
    color: 'bg-viconia-600',
    ctaHref: '/#termine',
  },
  {
    number: 3,
    key: 'step3',
    icon: Home,
    color: 'bg-viconia-700',
    ctaHref: null,
  },
  {
    number: 4,
    key: 'step4',
    icon: Heart,
    color: 'bg-viconia-800',
    ctaHref: null,
  },
]

export function ProcessSection() {
  const t = useTranslations('process')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ablauf" className="py-24 bg-gray-50" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-viconia-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
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
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-viconia-300 to-viconia-600 z-0" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: index * 8 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Step number & icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${step.color} text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0`}>
                      {step.number}
                    </div>
                    <div className={`${step.color} bg-opacity-10 p-2 rounded-lg`}>
                      <step.icon className="h-5 w-5 text-viconia-700" />
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {t(`steps.${step.key}.title` as any)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`steps.${step.key}.description` as any)}
                  </p>

                  {step.ctaHref && (
                    <Link href={step.ctaHref} className="mt-4 inline-block">
                      <Button size="sm" variant="outline" className="text-viconia-600 border-viconia-200 hover:bg-viconia-50">
                        Jetzt buchen →
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
