import type { CollectionConfig } from 'payload'

/**
 * Pflegebesuche / Leistungsnachweise
 * Bildet die tatsächlich erbrachten Pflegeleistungen ab – Grundlage für die Abrechnung.
 */
export const CareVisits: CollectionConfig = {
  slug: 'care-visits',
  admin: {
    useAsTitle: 'visitDate',
    group: 'Pflegemanagement',
    defaultColumns: ['visitDate', 'patient', 'employee', 'status', 'totalPoints'],
  },
  labels: {
    singular: { de: 'Pflegebesuch', en: 'Care Visit' },
    plural: { de: 'Pflegebesuche', en: 'Care Visits' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (['superadmin', 'admin', 'editor'].includes(req.user.role)) return true
      return { linkedUser: { equals: req.user.id } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => req.user?.role !== undefined &&
      ['superadmin', 'admin'].includes(req.user.role),
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'patient',
          type: 'relationship',
          relationTo: 'patients',
          required: true,
          label: { de: 'Patient', en: 'Patient' },
        },
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
      type: 'row',
      fields: [
        { name: 'visitDate', type: 'date', required: true, label: { de: 'Besuchsdatum', en: 'Visit Date' } },
        { name: 'startTime', type: 'text', label: { de: 'Beginn (HH:MM)', en: 'Start (HH:MM)' } },
        { name: 'endTime', type: 'text', label: { de: 'Ende (HH:MM)', en: 'End (HH:MM)' } },
      ],
    },
    {
      name: 'performedServices',
      type: 'array',
      required: true,
      label: { de: 'Erbrachte Leistungen', en: 'Performed Services' },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          label: { de: 'Leistung', en: 'Service' },
        },
        { name: 'quantity', type: 'number', defaultValue: 1, label: { de: 'Anzahl', en: 'Quantity' } },
        { name: 'notes', type: 'text', label: { de: 'Anmerkung', en: 'Notes' } },
      ],
    },
    { name: 'totalPoints', type: 'number', label: { de: 'Gesamtpunkte/-minuten', en: 'Total Points' } },
    { name: 'totalAmount', type: 'number', label: { de: 'Gesamtbetrag (€)', en: 'Total Amount (€)' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'planned',
      label: { de: 'Status', en: 'Status' },
      options: [
        { label: { de: 'Geplant', en: 'Planned' }, value: 'planned' },
        { label: { de: 'Durchgeführt', en: 'Completed' }, value: 'completed' },
        { label: { de: 'Abgebrochen', en: 'Cancelled' }, value: 'cancelled' },
        { label: { de: 'Abgerechnet', en: 'Billed' }, value: 'billed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'signature', type: 'text', label: { de: 'Unterschrift (Base64)', en: 'Signature (Base64)' } },
    { name: 'careNotes', type: 'richText', label: { de: 'Pflegepflegebericht', en: 'Care Report' } },
    { name: 'linkedUser', type: 'relationship', relationTo: 'users', admin: { hidden: true } },
  ],
  timestamps: true,
}
