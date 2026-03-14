'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Euro, Clock, Plus, Search, ChevronDown, ChevronRight, Phone, Mail } from 'lucide-react'

type Qualification = 'registered_nurse' | 'care_assistant' | 'auxiliary' | 'domestic_helper'

interface Employee {
  id: string
  firstName: string
  lastName: string
  qualification: Qualification
  employmentType: 'full_time' | 'part_time' | 'mini_job'
  weeklyHours: number
  compensationGroup: string
  phone: string
  email: string
  status: 'active' | 'sick' | 'vacation' | 'inactive'
  assignedPatients: number
}

const QUAL_LABELS: Record<Qualification, string> = {
  registered_nurse: 'Pflegefachkraft',
  care_assistant: 'Pflegeassistenz',
  auxiliary: 'Pflegehelferin',
  domestic_helper: 'Hauswirtschaft',
}

const EMPLOYMENT_LABELS = {
  full_time: 'Vollzeit',
  part_time: 'Teilzeit',
  mini_job: 'Minijob',
}

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  sick: 'bg-red-100 text-red-700',
  vacation: 'bg-amber-100 text-amber-700',
  inactive: 'bg-gray-100 text-gray-500',
}

const STATUS_LABELS = {
  active: 'Aktiv',
  sick: 'Krank',
  vacation: 'Urlaub',
  inactive: 'Inaktiv',
}

// Demo employees
const DEMO_EMPLOYEES: Employee[] = [
  { id: 'e1', firstName: 'Maria', lastName: 'Schulz', qualification: 'registered_nurse', employmentType: 'full_time', weeklyHours: 40, compensationGroup: 'TVöD P8', phone: '+49 151 11223344', email: 'schulz@viconiacare.de', status: 'active', assignedPatients: 12 },
  { id: 'e2', firstName: 'Klaus', lastName: 'Bauer', qualification: 'care_assistant', employmentType: 'full_time', weeklyHours: 38.5, compensationGroup: 'TVöD P6', phone: '+49 152 22334455', email: 'bauer@viconiacare.de', status: 'active', assignedPatients: 9 },
  { id: 'e3', firstName: 'Petra', lastName: 'Klein', qualification: 'auxiliary', employmentType: 'part_time', weeklyHours: 20, compensationGroup: 'TVöD P4', phone: '+49 160 33445566', email: 'klein@viconiacare.de', status: 'vacation', assignedPatients: 6 },
  { id: 'e4', firstName: 'Hans', lastName: 'Hoffmann', qualification: 'domestic_helper', employmentType: 'mini_job', weeklyHours: 10, compensationGroup: 'HW-Tarif', phone: '+49 170 44556677', email: 'hoffmann@viconiacare.de', status: 'active', assignedPatients: 4 },
  { id: 'e5', firstName: 'Fatima', lastName: 'Al-Rashid', qualification: 'registered_nurse', employmentType: 'full_time', weeklyHours: 40, compensationGroup: 'TVöD P8', phone: '+49 175 55667788', email: 'alrashid@viconiacare.de', status: 'sick', assignedPatients: 10 },
]

export default function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [qualFilter, setQualFilter] = useState<Qualification | 'all'>('all')
  const [activeTab, setActiveTab] = useState<'list' | 'payroll'>('list')
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)

  const filtered = DEMO_EMPLOYEES.filter((e) => {
    const name = `${e.firstName} ${e.lastName}`.toLowerCase()
    if (search && !name.includes(search.toLowerCase())) return false
    if (qualFilter !== 'all' && e.qualification !== qualFilter) return false
    return true
  })

  const stats = {
    total: DEMO_EMPLOYEES.length,
    active: DEMO_EMPLOYEES.filter((e) => e.status === 'active').length,
    sick: DEMO_EMPLOYEES.filter((e) => e.status === 'sick').length,
    vacation: DEMO_EMPLOYEES.filter((e) => e.status === 'vacation').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mitarbeiterverwaltung</h2>
          <p className="text-muted-foreground text-sm">Personalübersicht, Qualifikationen und Lohnabrechnung</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Mitarbeiter anlegen
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Mitarbeiter gesamt', value: stats.total, color: 'text-gray-800', bg: 'bg-gray-50' },
          { label: 'Aktiv', value: stats.active, color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Krank', value: stats.sick, color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'Urlaub', value: stats.vacation, color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map((s) => (
          <Card key={s.label} className={`shadow-sm border-0 ${s.bg}`}>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[{ key: 'list', label: 'Mitarbeiterliste' }, { key: 'payroll', label: 'Lohnabrechnung' }].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === t.key ? 'border-viconia-600 text-viconia-700' : 'border-transparent text-muted-foreground hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Mitarbeiter suchen…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-viconia-500 w-56"
              />
            </div>
            <select
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value as any)}
              className="text-sm border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-viconia-500"
            >
              <option value="all">Alle Qualifikationen</option>
              {Object.entries(QUAL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {/* Employee list */}
          <div className="space-y-2">
            {filtered.map((emp) => (
              <Card key={emp.id} className="shadow-sm border-0 bg-white overflow-hidden">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedEmployee(expandedEmployee === emp.id ? null : emp.id)}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-viconia-100 text-viconia-700 font-bold flex items-center justify-center text-sm shrink-0">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{emp.firstName} {emp.lastName}</div>
                    <div className="text-xs text-muted-foreground">
                      {QUAL_LABELS[emp.qualification]} · {EMPLOYMENT_LABELS[emp.employmentType]} ({emp.weeklyHours}h/Woche) · {emp.compensationGroup}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">{emp.assignedPatients} Patienten</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[emp.status]}`}>
                      {STATUS_LABELS[emp.status]}
                    </span>
                    {expandedEmployee === emp.id
                      ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    }
                  </div>
                </div>

                {/* Expandable details */}
                {expandedEmployee === emp.id && (
                  <div className="border-t px-4 py-4 bg-gray-50 grid sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1.5">Kontakt</div>
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" /> {emp.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {emp.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1.5">Beschäftigung</div>
                      <div className="text-sm space-y-1">
                        <div>{EMPLOYMENT_LABELS[emp.employmentType]} · {emp.weeklyHours}h/Woche</div>
                        <div className="text-muted-foreground">{emp.compensationGroup}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start sm:justify-end">
                      <Button size="sm" variant="outline">Bearbeiten</Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/admin/collections/employees`}>CMS</a>
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Keine Mitarbeiter gefunden.
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'payroll' && <PayrollPanel employees={DEMO_EMPLOYEES} />}
    </div>
  )
}

function PayrollPanel({ employees }: { employees: Employee[] }) {
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Abrechnungsmonat</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-viconia-500"
          />
        </div>
        <div className="mt-5">
          <Button variant="outline" size="sm">Alle Lohnzettel generieren</Button>
        </div>
      </div>

      <Card className="shadow-sm border-0 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {['Mitarbeiter', 'Qualifikation', 'Std. (Plan)', 'Std. (Ist)', 'Bruttolohn', 'Abzüge', 'Nettolohn', 'Status'].map((h) => (
                    <th key={h} className="py-3 px-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  // Rough hourly rate estimates by group
                  const hourlyRates: Record<Qualification, number> = {
                    registered_nurse: 22.5,
                    care_assistant: 17.5,
                    auxiliary: 14.5,
                    domestic_helper: 13.0,
                  }
                  const rate = hourlyRates[emp.qualification]
                  const plannedHours = (emp.weeklyHours * 52) / 12
                  const gross = plannedHours * rate
                  // Simplified German social contributions: ~40% total deductions for demo
                  const deductions = gross * 0.20  // employee share ~20%
                  const net = gross - deductions

                  return (
                    <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 font-medium">{emp.firstName} {emp.lastName}</td>
                      <td className="py-3 px-3 text-muted-foreground text-xs">{QUAL_LABELS[emp.qualification]}</td>
                      <td className="py-3 px-3 font-mono">{plannedHours.toFixed(1)}</td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">—</td>
                      <td className="py-3 px-3 font-mono">{gross.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                      <td className="py-3 px-3 font-mono text-red-600">−{deductions.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                      <td className="py-3 px-3 font-bold text-viconia-700 font-mono">{net.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Offen</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t bg-gray-50">
                  <td colSpan={4} className="py-3 px-3 font-semibold">Gesamt</td>
                  <td className="py-3 px-3 font-bold font-mono">
                    {employees.reduce((sum, emp) => {
                      const rates = { registered_nurse: 22.5, care_assistant: 17.5, auxiliary: 14.5, domestic_helper: 13.0 }
                      return sum + (emp.weeklyHours * 52 / 12) * rates[emp.qualification]
                    }, 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-xs text-muted-foreground">* Richtwerte; Abzüge gem. individueller Steuerklasse</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg p-3">
        <strong>Hinweis:</strong> Die angezeigten Beträge sind Näherungswerte auf Basis von Stundensätzen. 
        Für die rechtssichere Abrechnung pflegen Sie bitte die exakten Stundennachweise im CMS unter{' '}
        <a href="/admin/collections/payroll-records" className="underline">Lohnabrechnungen</a> und nutzen Sie 
        ein zertifiziertes Lohnabrechnungssystem (DATEV, Lexware o.ä.).
      </div>
    </div>
  )
}
