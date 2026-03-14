import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    group: 'Patientenakte',
    defaultColumns: ['title', 'patient', 'documentType', 'createdAt'],
  },
  labels: {
    singular: { de: 'Dokument', en: 'Document' },
    plural: { de: 'Dokumente', en: 'Documents' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (['superadmin', 'admin', 'editor'].includes(req.user.role)) return true
      // Patients can only read their own documents
      return {
        'patient.linkedUser': { equals: req.user.id },
      }
    },
    create: ({ req }) => !!req.user, // All authenticated users (patients upload their own documents)
    update: ({ req }) => {
      if (!req.user) return false
      if (['superadmin', 'admin'].includes(req.user.role)) return true
      // Users can only update documents they uploaded
      return { uploadedBy: { equals: req.user.id } }
    },
    delete: ({ req }) => {
      if (!req.user) return false
      return ['superadmin', 'admin'].includes(req.user.role)
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { de: 'Titel', en: 'Title' },
    },
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      required: true,
      label: { de: 'Patient', en: 'Patient' },
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      label: { de: 'Dokumententyp', en: 'Document Type' },
      options: [
        { label: { de: 'Arztbrief', en: 'Medical Letter' }, value: 'medical_letter' },
        { label: { de: 'Befundbericht', en: 'Diagnostic Report' }, value: 'diagnostic_report' },
        { label: { de: 'Krankenhaus-Entlassbrief', en: 'Hospital Discharge' }, value: 'hospital_discharge' },
        { label: { de: 'Pflegebericht', en: 'Care Report' }, value: 'care_report' },
        { label: { de: 'Rezept', en: 'Prescription' }, value: 'prescription' },
        { label: { de: 'Vollmacht / Einwilligung', en: 'Power of Attorney / Consent' }, value: 'consent' },
        { label: { de: 'Versicherungskarte', en: 'Insurance Card' }, value: 'insurance_card' },
        { label: { de: 'Pflegebescheid', en: 'Care Assessment Notice' }, value: 'care_assessment' },
        { label: { de: 'Sonstiges', en: 'Other' }, value: 'other' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { de: 'Datei', en: 'File' },
    },
    {
      name: 'documentDate',
      type: 'date',
      label: { de: 'Dokumentendatum', en: 'Document Date' },
    },
    {
      name: 'issuer',
      type: 'text',
      label: { de: 'Aussteller (Arzt / Krankenhaus)', en: 'Issuer (Doctor / Hospital)' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { de: 'Beschreibung', en: 'Description' },
    },
    {
      name: 'isConfidential',
      type: 'checkbox',
      defaultValue: false,
      label: { de: 'Vertraulich', en: 'Confidential' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      label: { de: 'Hochgeladen von', en: 'Uploaded By' },
      admin: { position: 'sidebar', readOnly: true },
      hooks: {
        beforeChange: [({ req, value }) => value ?? req.user?.id],
      },
    },
  ],
  timestamps: true,
}
