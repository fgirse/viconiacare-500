import type { CollectionConfig } from 'payload'

/**
 * Pflegeleistungen nach SGB XI (häusliche Pflegeleistungen) und SGB V (häusliche Krankenpflege).
 * Jede Leistung enthält den Leistungsschlüssel (gemäß SGB), Abrechnungspunkt-Wert, Zeitvorgaben etc.
 */
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    group: 'Pflegemanagement',
    defaultColumns: ['serviceKey', 'name', 'sgbType', 'basePoints', 'isActive'],
  },
  labels: {
    singular: { de: 'Pflegeleistung', en: 'Care Service' },
    plural: { de: 'Pflegeleistungen', en: 'Care Services' },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'serviceKey',
      type: 'text',
      required: true,
      unique: true,
      label: { de: 'Leistungsschlüssel', en: 'Service Key' },
      admin: { description: { de: 'z.B. SGB5-01, SGB11-A01', en: 'e.g. SGB5-01, SGB11-A01' } },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { de: 'Bezeichnung', en: 'Name' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { de: 'Beschreibung', en: 'Description' },
    },
    {
      name: 'sgbType',
      type: 'select',
      required: true,
      label: { de: 'SGB-Zuordnung', en: 'SGB Classification' },
      options: [
        { label: 'SGB XI – Pflegeversicherung', value: 'sgb11' },
        { label: 'SGB V – Krankenversicherung (HKP)', value: 'sgb5' },
        { label: { de: 'Selbstzahler / Privat', en: 'Self-Pay / Private' }, value: 'private' },
      ],
    },
    {
      name: 'careModule',
      type: 'select',
      label: { de: 'Leistungsmodul (SGB XI)', en: 'Service Module (SGB XI)' },
      admin: {
        condition: (data) => data?.sgbType === 'sgb11',
        description: { de: 'Gemäß Rahmenvertrag nach §75 SGB XI' },
      },
      options: [
        { label: 'Modul 1 – Körperpflege', value: 'M1' },
        { label: 'Modul 2 – Ernährung', value: 'M2' },
        { label: 'Modul 3 – Mobilität', value: 'M3' },
        { label: 'Modul 4 – Hauswirtschaft', value: 'M4' },
        { label: 'Modul 5 – Betreuung', value: 'M5' },
        { label: 'Behandlungspflege (SGB V)', value: 'HKP' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'basePoints',
          type: 'number',
          label: { de: 'Punkte/Minuten', en: 'Points/Minutes' },
          admin: { description: 'Abrechnungspunkte oder Minuten je Leistungseinheit' },
        },
        {
          name: 'pointValue',
          type: 'number',
          label: { de: 'Punktwert (€)', en: 'Point Value (€)' },
        },
      ],
    },
    {
      name: 'pricePerUnit',
      type: 'number',
      label: { de: 'Preis je Einheit (€)', en: 'Price per Unit (€)' },
    },
    {
      name: 'unit',
      type: 'select',
      defaultValue: 'visit',
      label: { de: 'Einheit', en: 'Unit' },
      options: [
        { label: { de: 'Einsatz (Besuch)', en: 'Visit' }, value: 'visit' },
        { label: { de: 'Stunde', en: 'Hour' }, value: 'hour' },
        { label: { de: 'Minute', en: 'Minute' }, value: 'minute' },
        { label: { de: 'Monat', en: 'Month' }, value: 'month' },
        { label: { de: 'Pauschal', en: 'Flat Rate' }, value: 'flat' },
      ],
    },
    {
      name: 'requiredQualification',
      type: 'select',
      label: { de: 'Mind. Qualifikation', en: 'Min. Qualification' },
      options: [
        { label: { de: 'Fachkraft', en: 'Registered Nurse' }, value: 'rn' },
        { label: { de: 'Assistent', en: 'Assistant' }, value: 'assistant' },
        { label: { de: 'Hilfskraft', en: 'Auxiliary' }, value: 'auxiliary' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: { de: 'Aktiv', en: 'Active' },
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
