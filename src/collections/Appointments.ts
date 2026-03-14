import type { CollectionConfig } from 'payload'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'title',
    group: 'Pflegemanagement',
    defaultColumns: ['title', 'appointmentType', 'scheduledAt', 'status'],
  },
  labels: {
    singular: { de: 'Termin', en: 'Appointment' },
    plural: { de: 'Termine', en: 'Appointments' },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true, // Public — from cal.com webhook
    update: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { de: 'Titel', en: 'Title' },
    },
    {
      name: 'appointmentType',
      type: 'select',
      required: true,
      label: { de: 'Terminart', en: 'Appointment Type' },
      options: [
        { label: { de: 'Ersttelefonat', en: 'Initial Phone Call' }, value: 'initial_call' },
        { label: { de: 'Bedarfsanalyse-Interview', en: 'Needs Assessment Interview' }, value: 'needs_assessment' },
        { label: { de: 'Hausbesuch', en: 'Home Visit' }, value: 'home_visit' },
        { label: { de: 'Pflegebeginn', en: 'Care Start' }, value: 'care_start' },
        { label: { de: 'Folgebesuch', en: 'Follow-up' }, value: 'follow_up' },
      ],
    },
    {
      name: 'scheduledAt',
      type: 'date',
      required: true,
      label: { de: 'Terminzeitpunkt', en: 'Scheduled At' },
    },
    {
      name: 'duration',
      type: 'number',
      label: { de: 'Dauer (Minuten)', en: 'Duration (Minutes)' },
    },
    {
      name: 'contactName',
      type: 'text',
      label: { de: 'Kontaktperson', en: 'Contact Person' },
    },
    { name: 'contactEmail', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
    { name: 'contactPhone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
    {
      name: 'calEventId',
      type: 'text',
      label: { de: 'Cal.com Event-ID', en: 'Cal.com Event ID' },
      admin: { readOnly: true },
    },
    {
      name: 'calBookingUid',
      type: 'text',
      label: { de: 'Cal.com Booking UID', en: 'Cal.com Booking UID' },
      admin: { readOnly: true },
    },
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      label: { de: 'Patient', en: 'Patient' },
    },
    {
      name: 'assignedEmployee',
      type: 'relationship',
      relationTo: 'employees',
      label: { de: 'Zugeordnete Pflegekraft', en: 'Assigned Caregiver' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'confirmed',
      label: { de: 'Status', en: 'Status' },
      options: [
        { label: { de: 'Bestätigt', en: 'Confirmed' }, value: 'confirmed' },
        { label: { de: 'Ausstehend', en: 'Pending' }, value: 'pending' },
        { label: { de: 'Storniert', en: 'Cancelled' }, value: 'cancelled' },
        { label: { de: 'Abgeschlossen', en: 'Completed' }, value: 'completed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: { de: 'Notizen', en: 'Notes' } },
  ],
  timestamps: true,
}
