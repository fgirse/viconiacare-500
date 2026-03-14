'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Phone, ClipboardList, ExternalLink } from 'lucide-react'

const CAL_NAMESPACE = process.env.NEXT_PUBLIC_CAL_NAMESPACE ?? 'viconiacare'
const CAL_ERSTGESPRAECH = process.env.NEXT_PUBLIC_CAL_LINK_ERSTGESPRAECH ?? `${CAL_NAMESPACE}/ersttelefonat`
const CAL_BEDARFSANALYSE = process.env.NEXT_PUBLIC_CAL_LINK_BEDARFSANALYSE ?? `${CAL_NAMESPACE}/bedarfsanalyse`

export function AppointmentsSection() {
  const t = useTranslations('appointments')

  return (
    <section id="termine" className="py-24 bg-viconia-900 text-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-viconia-300 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            Kostenlos &amp; Unverbindlich
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('heading')}</h2>
          <p className="text-lg text-viconia-200 max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Ersttelefonat */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-viconia-500 flex items-center justify-center mb-6">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ersttelefonat</h3>
            <p className="text-viconia-200 text-sm mb-2">
              <strong className="text-viconia-300">Schritt 1</strong> des Kennenlernen-Prozesses
            </p>
            <p className="text-viconia-200 text-sm mb-6 leading-relaxed">
              Kostenloses, unverbindliches Telefonat. Wir hören zu, beantworten Ihre Fragen
              und klären erste Möglichkeiten der Unterstützung.
            </p>
            <div className="space-y-2 text-sm text-viconia-300 mb-6">
              <div>⏱ Dauer: ca. 15–20 Minuten</div>
              <div>📞 Telefonisch</div>
              <div>🆓 Kostenlos</div>
            </div>
            <Button
              asChild
              className="w-full bg-white text-viconia-800 hover:bg-viconia-50"
            >
              <a
                href={`https://cal.com/${CAL_ERSTGESPRAECH}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                {t('initial_call')}
                <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />
              </a>
            </Button>
          </div>

          {/* Bedarfsanalyse */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-viconia-400 flex items-center justify-center mb-6">
              <ClipboardList className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Bedarfsanalyse-Interview</h3>
            <p className="text-viconia-200 text-sm mb-2">
              <strong className="text-viconia-300">Schritt 2</strong> des Kennenlernen-Prozesses
            </p>
            <p className="text-viconia-200 text-sm mb-6 leading-relaxed">
              Detailliertes Interview mit unserer Pflegefachkraft. Wir ermitteln Ihren
              individuellen Bedarf und erstellen einen ersten Pflegeplan.
            </p>
            <div className="space-y-2 text-sm text-viconia-300 mb-6">
              <div>⏱ Dauer: ca. 30–45 Minuten</div>
              <div>🎥 Video oder Telefon</div>
              <div>🆓 Kostenlos</div>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full border-white/40 text-white hover:bg-white/10"
            >
              <a
                href={`https://cal.com/${CAL_BEDARFSANALYSE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ClipboardList className="h-4 w-4" />
                {t('needs_assessment')}
                <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
