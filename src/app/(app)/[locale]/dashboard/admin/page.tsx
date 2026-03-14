import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Euro, MapPin, Calendar, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-muted-foreground">Übersicht über alle Kennzahlen – ViconiaCare GmbH</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Aktive Patienten', value: '—', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Insgesamt betreut' },
          { title: 'Umsatz (Monat)', value: '—', icon: Euro, color: 'text-viconia-600', bg: 'bg-viconia-50', desc: 'Akt. Monat' },
          { title: 'Touren heute', value: '—', icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Geplant heute' },
          { title: 'Termine (Woche)', value: '—', icon: Calendar, color: 'text-violet-500', bg: 'bg-violet-50', desc: 'Diese Woche' },
        ].map((kpi) => (
          <Card key={kpi.title} className="shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                <div className={`${kpi.bg} p-2 rounded-lg`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent billing */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Euro className="h-4 w-4 text-viconia-600" />
              Letzte Abrechnungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Keine Daten — verbinden Sie zuerst Ihre MongoDB-Datenbank in <code>.env.local</code>
            </div>
          </CardContent>
        </Card>

        {/* Tour overview */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              Touren heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Keine Touren geplant
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-base">Schnellzugriff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/dashboard/patient', label: 'Patient anlegen', icon: '👤' },
              { href: '/dashboard/billing', label: 'Abrechnung erstellen', icon: '📄' },
              { href: '/dashboard/route-planning', label: 'Tour planen', icon: '🗺️' },
              { href: '/admin', label: 'Payload CMS', icon: '⚙️' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl border p-4 hover:bg-viconia-50 hover:border-viconia-200 transition-colors text-sm font-medium"
              >
                <span className="text-2xl">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
