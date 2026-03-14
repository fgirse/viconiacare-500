import type { CollectionConfig } from 'payload'

export const TourPlans: CollectionConfig = {
  slug: 'tour-plans',
  admin: {
    useAsTitle: 'title',
    group: 'Tourenplanung',
    defaultColumns: ['title', 'date', 'employee', 'status'],
  },
  labels: {
    singular: { de: 'Tourenplan', en: 'Tour Plan' },
    plural: { de: 'Tourenpläne', en: 'Tour Plans' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      return ['superadmin', 'admin', 'editor'].includes(req.user.role)
    },
    create: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { de: 'Tourentitel', en: 'Tour Title' },
    },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, label: { de: 'Datum', en: 'Date' } },
        {
          name: 'employee',
          type: 'relationship',
          relationTo: 'employees',
          required: true,
          label: { de: 'Pflegekraft', en: 'Caregiver' },
        },
      ],
    },
    {
      name: 'stops',
      type: 'array',
      label: { de: 'Tourstopp / Besuche', en: 'Tour Stops / Visits' },
      fields: [
        {
          name: 'patient',
          type: 'relationship',
          relationTo: 'patients',
          required: true,
          label: { de: 'Patient', en: 'Patient' },
        },
        { name: 'plannedArrival', type: 'text', label: { de: 'Geplante Ankunft (HH:MM)', en: 'Planned Arrival (HH:MM)' } },
        { name: 'plannedDeparture', type: 'text', label: { de: 'Geplante Abfahrt (HH:MM)', en: 'Planned Departure (HH:MM)' } },
        { name: 'actualArrival', type: 'text', label: { de: 'Tatsächliche Ankunft (HH:MM)', en: 'Actual Arrival (HH:MM)' } },
        { name: 'actualDeparture', type: 'text', label: { de: 'Tatsächliche Abfahrt (HH:MM)', en: 'Actual Departure (HH:MM)' } },
        {
          name: 'servicesPlanned',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          label: { de: 'Geplante Leistungen', en: 'Planned Services' },
        },
        {
          name: 'stopStatus',
          type: 'select',
          defaultValue: 'planned',
          label: { de: 'Status', en: 'Status' },
          options: [
            { label: { de: 'Geplant', en: 'Planned' }, value: 'planned' },
            { label: { de: 'Unterwegs', en: 'En Route' }, value: 'en_route' },
            { label: { de: 'Abgeschlossen', en: 'Completed' }, value: 'completed' },
            { label: { de: 'Übersprungen', en: 'Skipped' }, value: 'skipped' },
          ],
        },
        {
          name: 'coordinates',
          type: 'group',
          label: { de: 'Koordinaten', en: 'Coordinates' },
          fields: [
            { name: 'lat', type: 'number', label: 'Latitude' },
            { name: 'lng', type: 'number', label: 'Longitude' },
          ],
        },
      ],
    },
    {
      name: 'optimizedRoute',
      type: 'json',
      label: { de: 'Optimierte Route (GeoJSON)', en: 'Optimized Route (GeoJSON)' },
      admin: { description: 'Von OpenRouteService berechnete Route' },
    },
    {
      name: 'estimatedDistance',
      type: 'number',
      label: { de: 'Gesch. Distanz (km)', en: 'Est. Distance (km)' },
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      label: { de: 'Gesch. Fahrtzeit (min)', en: 'Est. Drive Time (min)' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'planned',
      label: { de: 'Tourstatus', en: 'Tour Status' },
      options: [
        { label: { de: 'Geplant', en: 'Planned' }, value: 'planned' },
        { label: { de: 'Aktiv', en: 'Active' }, value: 'active' },
        { label: { de: 'Abgeschlossen', en: 'Completed' }, value: 'completed' },
        { label: { de: 'Storniert', en: 'Cancelled' }, value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: { de: 'Anmerkungen', en: 'Notes' } },
  ],
  timestamps: true,
}
