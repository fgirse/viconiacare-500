'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Euro, Plus, FileText, Filter, Download, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'

type BillingStatus = 'draft' | 'submitted' | 'verified' | 'paid' | 'rejected'

const STATUS_CONFIG: Record<BillingStatus, { label: string; variant: string; icon: React.ElementType }> = {
  draft: { label: 'Entwurf', variant: 'secondary', icon: Clock },
  submitted: { label: 'Eingereicht', variant: 'outline', icon: FileText },
  verified: { label: 'Geprüft', variant: 'success', icon: CheckCircle },
  paid: { label: 'Bezahlt', variant: 'success', icon: CheckCircle },
  rejected: { label: 'Abgelehnt', variant: 'destructive', icon: XCircle },
}

const STATUS_COLORS: Record<BillingStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  submitted: 'bg-blue-100 text-blue-700',
  verified: 'bg-viconia-100 text-viconia-700',
  paid: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

// SGB XI Leistungsmodule (example data for demonstration)
const SGB11_MODULES = [
  { key: 'M1', label: 'Modul 1 – Körperpflege', description: 'Waschen, Baden, Duschen, Zahnpflege, Rasieren, Hautpflege' },
  { key: 'M2', label: 'Modul 2 – Ernährung', description: 'Mundgerechte Zubereitung, Mundgerechtes Aufteilen, Eingabe von Speisen' },
  { key: 'M3', label: 'Modul 3 – Mobilität', description: 'Aufstehen/Zubettgehen, An-/Auskleiden, Gehen, Treppensteigen' },
  { key: 'M4', label: 'Modul 4 – Hauswirtschaft', description: 'Einkaufen, Kochen, Reinigen der Wohnung, Spülen, Wechseln von Bettwäsche' },
  { key: 'M5', label: 'Modul 5 – Betreuung', description: 'Beschäftigung, Begleitung bei Arztbesuchen, soziale Betreuung' },
  { key: 'HKP', label: 'Behandlungspflege (SGB V)', description: 'Wundversorgung, Medikamentengabe, Injektionen, Katheter, Verbandswechsel' },
]

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'new' | 'visits'>('overview')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leistungserfassung &amp; Abrechnung</h2>
          <p className="text-muted-foreground">SGB XI &amp; SGB V – konforme Pflegeabrechnung</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Neue Abrechnung
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { key: 'overview', label: 'Übersicht' },
          { key: 'visits', label: 'Pflegebesuche' },
          { key: 'new', label: 'SGB-Leistungen' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-viconia-600 text-viconia-700'
                : 'border-transparent text-muted-foreground hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <BillingOverview />}
      {activeTab === 'visits' && <CareVisitsTable />}
      {activeTab === 'new' && <SGBServicesReference modules={SGB11_MODULES} />}
    </div>
  )
}

function BillingOverview() {
  const stats = [
    { label: 'Offene Abrechnungen', value: '—', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Eingereicht (GKV)', value: '—', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Bezahlt (Monat)', value: '— €', icon: CheckCircle, color: 'text-viconia-600', bg: 'bg-viconia-50' },
    { label: 'Abgelehnt', value: '—', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ]

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm border-0 bg-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <div className={`${s.bg} p-1.5 rounded`}><s.icon className={`h-3.5 w-3.5 ${s.color}`} /></div>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing table placeholder */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Abrechnungen</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Exportieren
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {['Rechnungsnr.', 'Patient', 'Zeitraum', 'Betrag', 'Typ', 'Status', 'Aktionen'].map((h) => (
                    <th key={h} className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    Keine Abrechnungen vorhanden.<br />
                    <span className="text-xs">Verbinden Sie die Datenbank und legen Sie Patienten an.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function CareVisitsTable() {
  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Pflegebesuche / Leistungsnachweise</CardTitle>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Besuch erfassen
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {['Datum', 'Patient', 'Pflegekraft', 'Leistungen', 'Punkte', 'Betrag (€)', 'Status'].map((h) => (
                  <th key={h} className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                  Keine Pflegebesuche erfasst
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function SGBServicesReference({ modules }: { modules: typeof SGB11_MODULES }) {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm border-0 bg-viconia-50 border-viconia-100">
        <CardContent className="p-5">
          <h3 className="font-bold text-viconia-900 mb-1">Abrechnungsgrundlagen</h3>
          <p className="text-sm text-viconia-800">
            Alle Leistungen werden gemäß dem Rahmenvertrag nach § 75 SGB XI sowie der Richtlinie 
            der Spitzenverbände der Pflegekassen abgerechnet. Die Abrechnung erfolgt direkt mit 
            dem jeweiligen Kostenträger (Pflegekasse / Krankenkasse).
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.key} className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{module.label}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono shrink-0 ${
                  module.key === 'HKP' ? 'bg-blue-100 text-blue-700' : 'bg-viconia-100 text-viconia-700'
                }`}>
                  {module.key === 'HKP' ? 'SGB V' : 'SGB XI'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{module.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader><CardTitle className="text-base">Leistungskatalog verwalten</CardTitle></CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Pflegen Sie die konkreten Leistungsschlüssel, Punktwerte und Preise im Payload CMS Admin-Panel.
          </div>
          <Button asChild variant="outline" size="sm">
            <a href="/admin/collections/services">Zum Leistungskatalog →</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
