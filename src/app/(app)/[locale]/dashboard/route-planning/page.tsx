'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, LayoutList, Map, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import TourGanttView from '@/components/dashboard/routing/TourGanttView'

// Leaflet must be loaded client-side only (no SSR)
const TourMapView = dynamic(() => import('@/components/dashboard/routing/TourMapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg text-muted-foreground text-sm">
      Karte wird geladen…
    </div>
  ),
})

// Demo data for UI preview
const DEMO_EMPLOYEES = [
  {
    id: 'emp-1',
    name: 'Maria Schulz',
    qualification: 'registered_nurse',
    stops: [
      { id: 's1', patientName: 'A. Müller', plannedArrival: '07:30', plannedDeparture: '08:15', status: 'completed' as const, services: ['M1', 'M2'], address: 'Musterstr. 1', lat: 51.5, lng: 10.4 },
      { id: 's2', patientName: 'B. Schmidt', plannedArrival: '08:45', plannedDeparture: '09:30', status: 'completed' as const, services: ['M1'], address: 'Hauptstr. 5', lat: 51.52, lng: 10.42 },
      { id: 's3', patientName: 'C. Weber', plannedArrival: '10:00', plannedDeparture: '10:45', status: 'arrived' as const, services: ['HKP'], address: 'Lindenweg 3', lat: 51.48, lng: 10.38 },
      { id: 's4', patientName: 'D. Fischer', plannedArrival: '11:30', plannedDeparture: '12:00', status: 'planned' as const, services: ['M4'], address: 'Parkstr. 7', lat: 51.51, lng: 10.44 },
    ],
  },
  {
    id: 'emp-2',
    name: 'Klaus Bauer',
    qualification: 'care_assistant',
    stops: [
      { id: 's5', patientName: 'E. Hoffmann', plannedArrival: '07:00', plannedDeparture: '07:45', status: 'completed' as const, services: ['M1', 'M4'], address: 'Gartenweg 2', lat: 51.49, lng: 10.41 },
      { id: 's6', patientName: 'F. Wagner', plannedArrival: '08:15', plannedDeparture: '09:00', status: 'completed' as const, services: ['M2'], address: 'Birkenallee 10', lat: 51.505, lng: 10.39 },
      { id: 's7', patientName: 'G. Becker', plannedArrival: '09:30', plannedDeparture: '10:15', status: 'planned' as const, services: ['M5'], address: 'Rosenweg 4', lat: 51.515, lng: 10.43 },
    ],
  },
  {
    id: 'emp-3',
    name: 'Petra Klein',
    qualification: 'auxiliary',
    stops: [
      { id: 's8', patientName: 'H. Zimmermann', plannedArrival: '14:00', plannedDeparture: '15:00', status: 'planned' as const, services: ['M4'], address: 'Tulpenweg 8', lat: 51.495, lng: 10.35 },
      { id: 's9', patientName: 'I. Braun', plannedArrival: '15:30', plannedDeparture: '16:15', status: 'planned' as const, services: ['M1', 'M5'], address: 'Ahornstr. 12', lat: 51.485, lng: 10.37 },
    ],
  },
]

const DEMO_MAP_STOPS = DEMO_EMPLOYEES.flatMap((e) => e.stops)

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

function displayDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

export default function RoutePlanningPage() {
  const [view, setView] = useState<'gantt' | 'map' | 'split'>('split')
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))

  function shiftDate(days: number) {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + days)
    setSelectedDate(formatDate(d))
  }

  const totalStops = DEMO_EMPLOYEES.reduce((s, e) => s + e.stops.length, 0)
  const completedStops = DEMO_MAP_STOPS.filter((s) => s.status === 'completed').length
  const inProgressStops = DEMO_MAP_STOPS.filter((s) => s.status === 'arrived').length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tourenplanung</h2>
          <p className="text-muted-foreground text-sm">Tagesübersicht aller Pflegerouten – Gantt & Karte</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Route optimieren
          </Button>
        </div>
      </div>

      {/* Date picker + KPIs */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
          <button onClick={() => shiftDate(-1)} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <Calendar className="h-4 w-4 text-viconia-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm font-medium bg-transparent focus:outline-none"
          />
          <button onClick={() => shiftDate(1)} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2 text-sm">
          <span className="bg-white border rounded px-2.5 py-1 shadow-sm">
            <span className="font-bold">{DEMO_EMPLOYEES.length}</span> <span className="text-muted-foreground">Mitarbeiter</span>
          </span>
          <span className="bg-white border rounded px-2.5 py-1 shadow-sm">
            <span className="font-bold">{totalStops}</span> <span className="text-muted-foreground">Besuche</span>
          </span>
          <span className="bg-viconia-50 border-viconia-200 border rounded px-2.5 py-1 shadow-sm">
            <span className="font-bold text-viconia-700">{completedStops}</span> <span className="text-viconia-600">erledigt</span>
          </span>
          {inProgressStops > 0 && (
            <span className="bg-blue-50 border-blue-200 border rounded px-2.5 py-1 shadow-sm">
              <span className="font-bold text-blue-700">{inProgressStops}</span> <span className="text-blue-600">vor Ort</span>
            </span>
          )}
        </div>

        {/* View toggle */}
        <div className="ml-auto flex bg-white border rounded-lg overflow-hidden shadow-sm">
          {[
            { key: 'gantt', label: 'Gantt', icon: LayoutList },
            { key: 'split', label: 'Geteilt', icon: MapPin },
            { key: 'map', label: 'Karte', icon: Map },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setView(key as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                view === key ? 'bg-viconia-600 text-white' : 'text-muted-foreground hover:bg-gray-50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Date label */}
      <p className="text-sm text-muted-foreground">{displayDate(selectedDate)}</p>

      {/* Main content area */}
      {view === 'split' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Tourverlauf</CardTitle></CardHeader>
            <CardContent>
              <TourGanttView date={selectedDate} employees={DEMO_EMPLOYEES} />
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0 bg-white overflow-hidden">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Kartenansicht</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div style={{ height: 420 }}>
                <TourMapView stops={DEMO_MAP_STOPS} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {view === 'gantt' && (
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader><CardTitle className="text-base">Tourverlauf – {displayDate(selectedDate)}</CardTitle></CardHeader>
          <CardContent>
            <TourGanttView date={selectedDate} employees={DEMO_EMPLOYEES} />
          </CardContent>
        </Card>
      )}

      {view === 'map' && (
        <Card className="shadow-sm border-0 bg-white overflow-hidden">
          <CardHeader><CardTitle className="text-base">Kartenansicht – {displayDate(selectedDate)}</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div style={{ height: 600 }}>
              <TourMapView stops={DEMO_MAP_STOPS} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stop detail list */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader><CardTitle className="text-sm font-semibold">Besuchsliste</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {['#', 'Patient', 'Adresse', 'Geplant', 'Mitarbeiter', 'Leistungen', 'Status'].map((h) => (
                    <th key={h} className="py-3 px-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_EMPLOYEES.flatMap((emp, ei) =>
                  emp.stops.map((stop, si) => {
                    const statusColors = {
                      planned: 'bg-gray-100 text-gray-600',
                      arrived: 'bg-blue-100 text-blue-700',
                      completed: 'bg-green-100 text-green-700',
                      skipped: 'bg-red-100 text-red-600',
                    }
                    const statusLabels = {
                      planned: 'Geplant',
                      arrived: 'Vor Ort',
                      completed: 'Erledigt',
                      skipped: 'Übersprungen',
                    }
                    return (
                      <tr key={stop.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3 text-muted-foreground">{si + 1}</td>
                        <td className="py-3 px-3 font-medium">{stop.patientName}</td>
                        <td className="py-3 px-3 text-muted-foreground text-xs">{stop.address}</td>
                        <td className="py-3 px-3 font-mono text-xs">{stop.plannedArrival} – {stop.plannedDeparture}</td>
                        <td className="py-3 px-3">{emp.name}</td>
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1">
                            {stop.services.map((s) => (
                              <span key={s} className="bg-viconia-50 text-viconia-700 text-[10px] px-1.5 py-0.5 rounded">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColors[stop.status]}`}>
                            {statusLabels[stop.status]}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ORS info */}
      <div className="text-xs text-muted-foreground bg-gray-50 rounded-lg p-3">
        Routenoptimierung via{' '}
        <strong>OpenRouteService</strong> (Vroom-Algorithmus). 
        Konfigurieren Sie <code className="bg-gray-100 px-1 rounded">ORS_API_KEY</code> in Ihrer <code className="bg-gray-100 px-1 rounded">.env.local</code>.
        Kartendaten © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-viconia-600">OpenStreetMap</a> contributors.
      </div>
    </div>
  )
}
