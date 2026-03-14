import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, HeartPulse, Users, Home, RefreshCw, Moon } from 'lucide-react'

const SERVICE_ITEMS = [
  { key: 'grundpflege', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  { key: 'behandlungspflege', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'betreuung', icon: Users, color: 'text-violet-500', bg: 'bg-violet-50' },
  { key: 'hauswirtschaft', icon: Home, color: 'text-amber-500', bg: 'bg-amber-50' },
  { key: 'verhinderung', icon: RefreshCw, color: 'text-teal-500', bg: 'bg-teal-50' },
  { key: 'nacht', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
] as const

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section id="leistungen" className="py-24 bg-background">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-viconia-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            SGB XI &amp; SGB V
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ITEMS.map(({ key, icon: Icon, color, bg }) => (
            <Card
              key={key}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${bg} mb-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`items.${key}.title` as any)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`items.${key}.description` as any)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SGB Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-viconia-50 border border-viconia-100 p-6">
            <h3 className="font-bold text-viconia-900 mb-2">SGB XI – Pflegeversicherung</h3>
            <p className="text-sm text-viconia-800">
              Häusliche Pflegeleistungen für Versicherte mit Pflegegrad 1–5. Wir rechnen direkt
              mit Ihrer Pflegekasse ab – Sie haben keinen Aufwand.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
            <h3 className="font-bold text-blue-900 mb-2">SGB V – Häusliche Krankenpflege (HKP)</h3>
            <p className="text-sm text-blue-800">
              Ärztlich verordnete Behandlungspflege – z.B. Wundversorgung, Injektionen,
              Medikamentengabe. Verordnung durch Ihren Hausarzt reicht aus.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
