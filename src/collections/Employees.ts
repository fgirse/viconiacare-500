import type { CollectionConfig } from 'payload'

export const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'fullName',
    group: 'Mitarbeiterverwaltung',
    defaultColumns: ['fullName', 'qualification', 'isActive', 'workingHours'],
  },
  labels: {
    singular: { de: 'Mitarbeiter', en: 'Employee' },
    plural: { de: 'Mitarbeiter', en: 'Employees' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      return req.user.role === 'superadmin' || req.user.role === 'admin' || req.user.role === 'editor'
    },
    create: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { de: 'Stammdaten', en: 'Personal Data' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'firstName', type: 'text', required: true, label: { de: 'Vorname', en: 'First Name' } },
                { name: 'lastName', type: 'text', required: true, label: { de: 'Nachname', en: 'Last Name' } },
              ],
            },
            {
              name: 'fullName',
              type: 'text',
              admin: { hidden: true },
              hooks: {
                beforeChange: [
                  ({ siblingData }) =>
                    `${siblingData.firstName ?? ''} ${siblingData.lastName ?? ''}`.trim(),
                ],
              },
            },
            { name: 'dateOfBirth', type: 'date', label: { de: 'Geburtsdatum', en: 'Date of Birth' } },
            {
              name: 'address',
              type: 'group',
              label: { de: 'Adresse', en: 'Address' },
              fields: [
                { name: 'street', type: 'text', label: { de: 'Straße & Hausnummer', en: 'Street & Number' } },
                { type: 'row', fields: [
                  { name: 'postalCode', type: 'text', label: { de: 'PLZ', en: 'Postal Code' } },
                  { name: 'city', type: 'text', label: { de: 'Ort', en: 'City' } },
                ]},
              ],
            },
            { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
            { name: 'email', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
          ],
        },
        {
          label: { de: 'Qualifikation & Einsatz', en: 'Qualification & Deployment' },
          fields: [
            {
              name: 'qualification',
              type: 'select',
              required: true,
              label: { de: 'Qualifikation', en: 'Qualification' },
              options: [
                { label: { de: 'Geschäftsführung', en: 'Management' }, value: 'management' },
                { label: { de: 'Pflegedienstleitung', en: 'Nursing Management' }, value: 'pdl' },
                { label: { de: 'Verwaltung', en: 'Administration' }, value: 'administration' },
                { label: { de: 'Alltagsbegleiter', en: 'Everyday Companion' }, value: 'companion' },
                { label: { de: 'Pflegeassistent', en: 'Care Assistant' }, value: 'assistant' },
                { label: { de: 'Pflegehilfskraft', en: 'Auxiliary Nurse' }, value: 'auxiliary' },
                { label: { de: 'Altenpflegeauszubildende/r', en: 'Geriatric Nursing Trainee' }, value: 'geriatric_trainee' },
                { label: { de: 'Altenpflegehelfer/in', en: 'Geriatric Nursing Assistant' }, value: 'geriatric_assistant' },
                { label: { de: 'Altenpfleger/in', en: 'Geriatric Nurse' }, value: 'geriatric' },
                { label: { de: 'Alltagsbegleiter', en: 'Everyday Companion' }, value: 'companion' },
                { label: { de: 'Examinierte Pflegefachkraft', en: 'Registered Nurse (RN)' }, value: 'rn' },
                { label: { de: 'Hauswirtschaftskraft', en: 'Domestic Helper' }, value: 'domestic' },
                { label: { de: 'Wundmanager', en: 'Wound Manager' }, value: 'wound_manager' },
              ],
            },
            {
              name: 'specializations',
              type: 'array',
              label: { de: 'Spezialisierungen', en: 'Specializations' },
              fields: [
                { name: 'specialization', type: 'text', label: { de: 'Spezialisierung', en: 'Specialization' } },
              ],
            },
            {
              name: 'workingHours',
              type: 'number',
              label: { de: 'Wochenstunden', en: 'Weekly Hours' },
            },
            {
              name: 'employmentType',
              type: 'select',
              label: { de: 'Beschäftigungsart', en: 'Employment Type' },
              options: [
                { label: { de: 'Vollzeit', en: 'Full-time' }, value: 'fulltime' },
                { label: { de: 'Teilzeit', en: 'Part-time' }, value: 'parttime' },
                { label: { de: 'Geringfügig', en: 'Marginal' }, value: 'marginal' },
                { label: { de: 'Freelance', en: 'Freelance' }, value: 'freelance' },
              ],
            },
            { name: 'hireDate', type: 'date', label: { de: 'Einstellungsdatum', en: 'Hire Date' } },
          ],
        },
        {
          label: { de: 'Vergütung', en: 'Compensation' },
          fields: [
            { name: 'hourlyRate', type: 'number', label: { de: 'Stundenlohn (€)', en: 'Hourly Rate (€)' } },
            { name: 'monthlyGross', type: 'number', label: { de: 'Monatsbrutto (€)', en: 'Monthly Gross (€)' } },
            { name: 'taxClass', type: 'select', label: { de: 'Steuerklasse', en: 'Tax Class' },
              options: ['1','2','3','4','5','6'].map(v => ({ label: `Steuerklasse ${v}`, value: v })),
            },
            { name: 'socialSecurityNumber', type: 'text', label: { de: 'Sozialversicherungsnummer', en: 'Social Security Number' } },
            { name: 'iban', type: 'text', label: { de: 'IBAN', en: 'IBAN' } },
          ],
        },
        {
          label: { de: 'Fahrzeug & Route', en: 'Vehicle & Route' },
          fields: [
            {
              name: 'hasVehicle',
              type: 'checkbox',
              defaultValue: false,
              label: { de: 'Fahrzeug vorhanden', en: 'Has Vehicle' },
            },
            { name: 'vehiclePlate', type: 'text', label: { de: 'Kennzeichen', en: 'License Plate' } },
            {
              name: 'homeLocation',
              type: 'group',
              label: { de: 'Heimadresse (für Tourenplanung)', en: 'Home Address (for routing)' },
              fields: [
                { name: 'lat', type: 'number', label: 'Latitude' },
                { name: 'lng', type: 'number', label: 'Longitude' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: { de: 'Foto', en: 'Photo' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: { de: 'Aktiv', en: 'Active' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'showInTeam',
      type: 'checkbox',
      defaultValue: false,
      label: { de: 'Im Team anzeigen', en: 'Show in Team Gallery' },
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
