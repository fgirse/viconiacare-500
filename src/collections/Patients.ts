import type { CollectionConfig } from 'payload'

const isAdminOrSelf = ({ req }: { req: any }) => {
  if (!req.user) return false
  if (req.user.role === 'superadmin' || req.user.role === 'admin') return true
  return false
}

export const Patients: CollectionConfig = {
  slug: 'patients',
  admin: {
    useAsTitle: 'fullName',
    group: 'Pflegemanagement',
    defaultColumns: ['fullName', 'insuranceType', 'careLevel', 'isActive'],
  },
  labels: {
    singular: { de: 'Patient', en: 'Patient' },
    plural: { de: 'Patienten', en: 'Patients' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'superadmin' || req.user.role === 'admin' || req.user.role === 'editor') return true
      // Users can only read their own patient profile
      return {
        linkedUser: { equals: req.user.id },
      }
    },
    create: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    // ── Personalien ──────────────────────────────────────
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
                  ({ siblingData }) => {
                    return `${siblingData.firstName ?? ''} ${siblingData.lastName ?? ''}`.trim()
                  },
                ],
              },
            },
            {
              type: 'row',
              fields: [
                { name: 'dateOfBirth', type: 'date', required: true, label: { de: 'Geburtsdatum', en: 'Date of Birth' } },
                {
                  name: 'gender',
                  type: 'select',
                  label: { de: 'Geschlecht', en: 'Gender' },
                  options: [
                    { label: { de: 'Männlich', en: 'Male' }, value: 'male' },
                    { label: { de: 'Weiblich', en: 'Female' }, value: 'female' },
                    { label: { de: 'Divers', en: 'Diverse' }, value: 'diverse' },
                  ],
                },
              ],
            },
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
                // Geo-Koordinaten für Routenplanung
                { type: 'row', fields: [
                  { name: 'lat', type: 'number', label: { de: 'Breitengrad', en: 'Latitude' } },
                  { name: 'lng', type: 'number', label: { de: 'Längengrad', en: 'Longitude' } },
                ]},
              ],
            },
            { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
            { name: 'email', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
          ],
        },
        {
          label: { de: 'Pflegeinfos', en: 'Care Info' },
          fields: [
            {
              name: 'careLevel',
              type: 'select',
              required: true,
              label: { de: 'Pflegegrad', en: 'Care Level' },
              options: [
                { label: 'Pflegegrad 1', value: '1' },
                { label: 'Pflegegrad 2', value: '2' },
                { label: 'Pflegegrad 3', value: '3' },
                { label: 'Pflegegrad 4', value: '4' },
                { label: 'Pflegegrad 5', value: '5' },
                { label: { de: 'Kein Pflegegrad', en: 'No Care Level' }, value: 'none' },
              ],
            },
            {
              name: 'insuranceType',
              type: 'select',
              required: true,
              label: { de: 'Versicherungsart', en: 'Insurance Type' },
              options: [
                { label: { de: 'Gesetzlich (GKV)', en: 'Public (GKV)' }, value: 'gkv' },
                { label: { de: 'Privat (PKV)', en: 'Private (PKV)' }, value: 'pkv' },
                { label: { de: 'Selbstzahler', en: 'Self-pay' }, value: 'self' },
              ],
            },
            {
              name: 'healthInsurance',
              type: 'relationship',
              relationTo: 'insurance-providers',
              label: { de: 'Krankenkasse', en: 'Health Insurance' },
            },
            { name: 'insuranceNumber', type: 'text', label: { de: 'Versichertennummer', en: 'Insurance Number' } },
            { name: 'careStartDate', type: 'date', label: { de: 'Pflegebeginn', en: 'Care Start Date' } },
            {
              name: 'assignedEmployee',
              type: 'relationship',
              relationTo: 'employees',
              label: { de: 'Zuständige Pflegekraft', en: 'Assigned Caregiver' },
            },
            {
              name: 'careNotes',
              type: 'richText',
              label: { de: 'Pflegehinweise', en: 'Care Notes' },
            },
            {
              name: 'diagnoses',
              type: 'array',
              label: { de: 'Diagnosen (ICD-10)', en: 'Diagnoses (ICD-10)' },
              fields: [
                { name: 'icdCode', type: 'text', label: { de: 'ICD-10 Code', en: 'ICD-10 Code' } },
                { name: 'description', type: 'text', label: { de: 'Beschreibung', en: 'Description' } },
              ],
            },
          ],
        },
        {
          label: { de: 'Notfallkontakte', en: 'Emergency Contacts' },
          fields: [
            {
              name: 'emergencyContacts',
              type: 'array',
              label: { de: 'Notfallkontakte', en: 'Emergency Contacts' },
              fields: [
                { name: 'name', type: 'text', required: true, label: { de: 'Name', en: 'Name' } },
                { name: 'relationship', type: 'text', label: { de: 'Verhältnis', en: 'Relationship' } },
                { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'linkedUser',
      type: 'relationship',
      relationTo: 'users',
      label: { de: 'Verknüpftes Benutzerkonto', en: 'Linked User Account' },
      admin: { position: 'sidebar' },
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
