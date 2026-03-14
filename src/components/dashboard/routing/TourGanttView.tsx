'use client'

import { useMemo } from 'react'

interface Stop {
  id: string
  patientName: string
  plannedArrival: string  // 'HH:mm'
  plannedDeparture: string
  actualArrival?: string
  actualDeparture?: string
  status: 'planned' | 'arrived' | 'completed' | 'skipped'
  services: string[]
}

interface Employee {
  id: string
  name: string
  qualification: string
  stops: Stop[]
}

interface TourGanttProps {
  date: string  // 'YYYY-MM-DD'
  employees: Employee[]
}

const STATUS_COLORS = {
  planned: { bg: 'bg-gray-200', text: 'text-gray-700', border: 'border-gray-300' },
  arrived: { bg: 'bg-blue-200', text: 'text-blue-800', border: 'border-blue-400' },
  completed: { bg: 'bg-viconia-200', text: 'text-viconia-800', border: 'border-viconia-400' },
  skipped: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
}

const QUAL_LABELS: Record<string, string> = {
  registered_nurse: 'ex. Pflegefachkraft',
  care_assistant: 'Pflegeassistenz',
  auxiliary: 'Pflegehelferin',
  domestic_helper: 'Hauswirtschaft',
}

// Convert 'HH:mm' to minutes since midnight
function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// Convert minutes to pixel position (timeline: 06:00 – 22:00 = 960 minutes = 100%)
const TIMELINE_START = 6 * 60  // 06:00
const TIMELINE_END = 22 * 60   // 22:00
const TIMELINE_RANGE = TIMELINE_END - TIMELINE_START

function minutesToPercent(minutes: number) {
  return ((minutes - TIMELINE_START) / TIMELINE_RANGE) * 100
}

function durationToPercent(start: string, end: string) {
  const s = toMinutes(start)
  let e = toMinutes(end)
  if (e <= s) e = s + 30  // minimum 30-min block
  return ((e - s) / TIMELINE_RANGE) * 100
}

export default function TourGanttView({ date, employees }: TourGanttProps) {
  const hours = useMemo(() => {
    const h = []
    for (let i = 6; i <= 22; i++) h.push(i)
    return h
  }, [])

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        Keine Tourendaten für diesen Tag vorhanden.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Time axis header */}
        <div className="flex mb-1 pl-40">
          {hours.map((h) => (
            <div
              key={h}
              className="flex-1 text-xs text-muted-foreground font-mono text-center border-l border-gray-200 py-1"
            >
              {String(h).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Employee rows */}
        {employees.map((emp) => (
          <div key={emp.id} className="flex items-center mb-2 group">
            {/* Employee label */}
            <div className="w-40 shrink-0 pr-3 text-right">
              <div className="text-xs font-semibold text-gray-800 truncate">{emp.name}</div>
              <div className="text-[10px] text-muted-foreground">{QUAL_LABELS[emp.qualification] ?? emp.qualification}</div>
            </div>

            {/* Timeline track */}
            <div className="relative flex-1 h-12 bg-gray-50 rounded border border-gray-200">
              {/* Hour grid lines */}
              {hours.slice(1).map((h) => (
                <div
                  key={h}
                  className="absolute top-0 bottom-0 w-px bg-gray-200"
                  style={{ left: `${minutesToPercent(h * 60)}%` }}
                />
              ))}

              {/* Stop blocks */}
              {emp.stops.map((stop) => {
                const col = STATUS_COLORS[stop.status]
                const left = minutesToPercent(toMinutes(stop.plannedArrival))
                const width = durationToPercent(stop.plannedArrival, stop.plannedDeparture)
                return (
                  <div
                    key={stop.id}
                    title={`${stop.patientName}\n${stop.plannedArrival}–${stop.plannedDeparture}\n${stop.services.join(', ')}`}
                    className={`absolute top-1 bottom-1 rounded ${col.bg} ${col.border} border cursor-pointer hover:brightness-95 transition-all flex items-center overflow-hidden px-1.5`}
                    style={{ left: `${left}%`, width: `${Math.max(width, 1)}%`, minWidth: 4 }}
                  >
                    <span className={`text-[10px] font-medium ${col.text} truncate whitespace-nowrap`}>
                      {stop.patientName}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex gap-4 mt-3 pl-40 text-[11px] text-muted-foreground">
          {Object.entries(STATUS_COLORS).map(([key, col]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className={`inline-block w-3 h-3 rounded ${col.bg} border ${col.border}`} />
              {key === 'planned' ? 'Geplant' : key === 'arrived' ? 'Vor Ort' : key === 'completed' ? 'Erledigt' : 'Übersprungen'}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
