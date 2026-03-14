'use client'

import { useEffect, useRef } from 'react'

interface Stop {
  id: string
  patientName: string
  address: string
  lat: number
  lng: number
  plannedArrival: string
  plannedDeparture: string
  status: 'planned' | 'arrived' | 'completed' | 'skipped'
}

interface TourMapProps {
  stops: Stop[]
  routeGeoJSON?: GeoJSON.LineString | null
  center?: [number, number]
  zoom?: number
}

const STATUS_COLORS = {
  planned: '#6b7280',
  arrived: '#2563eb',
  completed: '#16a34a',
  skipped: '#dc2626',
}

export default function TourMapView({ stops, routeGeoJSON, center = [51.1657, 10.4515], zoom = 10 }: TourMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return

    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, { scrollWheelZoom: true }).setView(center, zoom)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Add numbered stop markers
      stops.forEach((stop, idx) => {
        const color = STATUS_COLORS[stop.status]
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            background:${color};
            color:white;
            border-radius:50%;
            width:28px;height:28px;
            display:flex;align-items:center;justify-content:center;
            font-weight:bold;font-size:12px;
            border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
          ">${idx + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
        L.marker([stop.lat, stop.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:180px">
              <strong style="font-size:13px">${stop.patientName}</strong><br/>
              <span style="font-size:11px;color:#6b7280">${stop.address}</span><br/>
              <div style="margin-top:6px;font-size:12px">
                🕐 ${stop.plannedArrival} – ${stop.plannedDeparture}
              </div>
              <span style="
                display:inline-block;margin-top:4px;padding:1px 8px;
                border-radius:999px;font-size:11px;
                background:${color}22;color:${color};
              ">${stop.status}</span>
            </div>
          `)
      })

      // Draw optimized route if available
      if (routeGeoJSON && routeGeoJSON.coordinates.length > 0) {
        const latlngs = routeGeoJSON.coordinates.map(([lng, lat]) => [lat, lng] as [number, number])
        L.polyline(latlngs, { color: '#0d9488', weight: 4, opacity: 0.75, dashArray: '8 4' }).addTo(map)
      } else if (stops.length >= 2) {
        // Draw straight dashed lines as fallback
        const latlngs = stops.map((s) => [s.lat, s.lng] as [number, number])
        L.polyline(latlngs, { color: '#94a3b8', weight: 2, opacity: 0.5, dashArray: '5 5' }).addTo(map)
      }

      // Fit map to all stops
      if (stops.length > 0) {
        const bounds = L.latLngBounds(stops.map((s) => [s.lat, s.lng] as [number, number]))
        map.fitBounds(bounds, { padding: [40, 40] })
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', minHeight: 400, borderRadius: 8 }}
      className="z-0"
    />
  )
}
