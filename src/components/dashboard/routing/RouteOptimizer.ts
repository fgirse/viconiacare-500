/**
 * OpenRouteService route optimization helper.
 * Uses the /optimization endpoint (Vroom) for multi-vehicle tour planning.
 */

interface ORSWaypoint {
  id: number
  name: string
  location: [number, number]  // [lng, lat]
  service?: number            // estimated service duration in seconds
  time_windows?: [[number, number]]  // unix timestamps
}

interface ORSVehicle {
  id: number
  profile: 'driving-car' | 'cycling-regular' | 'foot-walking'
  start: [number, number]
  end?: [number, number]
  capacity?: number[]
  time_window?: [number, number]
}

interface OptimizationResult {
  routes: {
    vehicleId: number
    steps: {
      type: 'start' | 'job' | 'end'
      jobId?: number
      arrival: number
      departure: number
      location: [number, number]
    }[]
    distance: number
    duration: number
  }[]
  unassigned: number[]
}

/**
 * Calls OpenRouteService /optimization endpoint.
 * Requires ORS_API_KEY environment variable (server-side only).
 */
export async function optimizeTours(
  vehicles: ORSVehicle[],
  waypoints: ORSWaypoint[]
): Promise<OptimizationResult | null> {
  const apiKey = process.env.ORS_API_KEY
  if (!apiKey) {
    console.error('ORS_API_KEY not configured')
    return null
  }

  const jobs = waypoints.map((wp) => ({
    id: wp.id,
    description: wp.name,
    location: wp.location,
    service: wp.service ?? 1800,
    ...(wp.time_windows ? { time_windows: wp.time_windows } : {}),
  }))

  const body = {
    jobs,
    vehicles: vehicles.map((v) => ({
      id: v.id,
      profile: v.profile,
      start: v.start,
      ...(v.end ? { end: v.end } : {}),
      ...(v.time_window ? { time_window: v.time_window } : {}),
    })),
  }

  try {
    const res = await fetch('https://api.openrouteservice.org/optimization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('ORS optimization error:', res.status, err)
      return null
    }

    const data = await res.json()

    return {
      routes: data.routes.map((r: any) => ({
        vehicleId: r.vehicle,
        steps: r.steps.map((s: any) => ({
          type: s.type,
          jobId: s.job,
          arrival: s.arrival,
          departure: s.departure,
          location: s.location,
        })),
        distance: r.distance,
        duration: r.duration,
      })),
      unassigned: data.unassigned?.map((u: any) => u.id) ?? [],
    }
  } catch (err) {
    console.error('ORS optimization request failed:', err)
    return null
  }
}

/**
 * Fetches a driving route geometry from ORS Directions API.
 * Returns a GeoJSON LineString of the route.
 */
export async function getRouteGeometry(
  coordinates: [number, number][]  // [lng, lat] pairs
): Promise<GeoJSON.LineString | null> {
  const apiKey = process.env.ORS_API_KEY
  if (!apiKey || coordinates.length < 2) return null

  try {
    const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify({ coordinates }),
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.features?.[0]?.geometry ?? null
  } catch {
    return null
  }
}
