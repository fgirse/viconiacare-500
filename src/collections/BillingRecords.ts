import type { CollectionConfig } from 'payload'

/**
 * Abrechnungsbelege gegenüber GKV / PKV / Selbstzahlern.
 * Orientiert an §105 SGB XI + HKP-Abrechnung nach SGB V.
 */
export const BillingRecords: CollectionConfig = {
  slug: 'billing-records',
  admin: {
    useAsTitle: 'invoiceNumber',
    group: 'Abrechnung',
    defaultColumns: ['invoiceNumber', 'patient', 'billingPeriodFrom', 'billingPeriodTo', 'status', 'totalAmount'],
  },
  labels: {
    singular: { de: 'Abrechnung', en: 'Billing Record' },
    plural: { de: 'Abrechnungen', en: 'Billing Records' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (['superadmin', 'admin'].includes(req.user.role)) return true
      return {
        'patient.linkedUser': { equals: req.user.id },
      }
    },
    create: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'invoiceNumber',
      type: 'text',
      required: true,
      unique: true,
      label: { de: 'Rechnungsnummer', en: 'Invoice Number' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      required: true,
      label: { de: 'Patient', en: 'Patient' },
    },
    {
      name: 'healthInsurance',
      type: 'relationship',
      relationTo: 'insurance-providers',
      label: { de: 'Empfänger (Krankenkasse)', en: 'Recipient (Insurance)' },
    },
    {
      type: 'row',
      fields: [
        { name: 'billingPeriodFrom', type: 'date', required: true, label: { de: 'Abrechnungszeitraum von', en: 'Period From' } },
        { name: 'billingPeriodTo', type: 'date', required: true, label: { de: 'Abrechnungszeitraum bis', en: 'Period To' } },
      ],
    },
    {
      name: 'billingType',
      type: 'select',
      required: true,
      label: { de: 'Abrechnungsart', en: 'Billing Type' },
      options: [
        { label: 'SGB XI – Pflegeleistungen', value: 'sgb11' },
        { label: 'SGB V – Häusliche Krankenpflege (HKP)', value: 'sgb5_hkp' },
        { label: 'SGB V – Haushaltshilfe', value: 'sgb5_hh' },
        { label: { de: 'Privat / Selbstzahler', en: 'Private / Self-pay' }, value: 'private' },
      ],
    },
    {
      name: 'careVisits',
      type: 'relationship',
      relationTo: 'care-visits',
      hasMany: true,
      label: { de: 'Enthaltene Pflegebesuche', en: 'Included Care Visits' },
    },
    {
      name: 'lineItems',
      type: 'array',
      label: { de: 'Rechnungspositionen', en: 'Line Items' },
      fields: [
        { name: 'serviceKey', type: 'text', label: { de: 'Leistungsschlüssel', en: 'Service Key' } },
        { name: 'description', type: 'text', label: { de: 'Bezeichnung', en: 'Description' } },
        { name: 'quantity', type: 'number', label: { de: 'Menge', en: 'Quantity' } },
        { name: 'unitPrice', type: 'number', label: { de: 'Einzelpreis (€)', en: 'Unit Price (€)' } },
        { name: 'totalPrice', type: 'number', label: { de: 'Gesamtpreis (€)', en: 'Total Price (€)' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'subtotal', type: 'number', label: { de: 'Zwischensumme (€)', en: 'Subtotal (€)' } },
        { name: 'vatRate', type: 'number', defaultValue: 0, label: { de: 'MwSt. (%)', en: 'VAT (%)' } },
        { name: 'totalAmount', type: 'number', label: { de: 'Gesamtbetrag (€)', en: 'Total Amount (€)' } },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      label: { de: 'Status', en: 'Status' },
      options: [
        { label: { de: 'Entwurf', en: 'Draft' }, value: 'draft' },
        { label: { de: 'Eingereicht', en: 'Submitted' }, value: 'submitted' },
        { label: { de: 'Geprüft', en: 'Verified' }, value: 'verified' },
        { label: { de: 'Bezahlt', en: 'Paid' }, value: 'paid' },
        { label: { de: 'Abgelehnt', en: 'Rejected' }, value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'invoiceDate', type: 'date', label: { de: 'Rechnungsdatum', en: 'Invoice Date' }, admin: { position: 'sidebar' } },
    { name: 'dueDate', type: 'date', label: { de: 'Fälligkeitsdatum', en: 'Due Date' }, admin: { position: 'sidebar' } },
    { name: 'pdfDocument', type: 'upload', relationTo: 'media', label: { de: 'Rechnung (PDF)', en: 'Invoice (PDF)' } },
    { name: 'notes', type: 'richText', label: { de: 'Anmerkungen', en: 'Notes' } },
  ],
  timestamps: true,
}
