import type { CollectionConfig } from 'payload'

export const InsuranceProviders: CollectionConfig = {
  slug: 'insurance-providers',
  admin: {
    useAsTitle: 'name',
    group: 'Stammdaten',
    defaultColumns: ['name', 'ik_number', 'type', 'isActive'],
  },
  labels: {
    singular: { de: 'Kostenträger', en: 'Insurance Provider' },
    plural: { de: 'Kostenträger', en: 'Insurance Providers' },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'superadmin',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: { de: 'Name der Krankenkasse', en: 'Insurance Provider Name' } },
    {
      name: 'ik_number',
      type: 'text',
      required: true,
      unique: true,
      label: { de: 'IK-Nummer', en: 'IK Number' },
      admin: { description: 'Institutionskennzeichen (9-stellig)' },
    },
    {
      name: 'type',
      type: 'select',
      label: { de: 'Art', en: 'Type' },
      options: [
        { label: { de: 'Gesetzliche KV (GKV)', en: 'Public Insurance (GKV)' }, value: 'gkv' },
        { label: { de: 'Private KV (PKV)', en: 'Private Insurance (PKV)' }, value: 'pkv' },
        { label: { de: 'Berufsgenossenschaft (BG)', en: 'Employers\' Liability Insurance' }, value: 'bg' },
      ],
    },
    { name: 'address', type: 'text', label: { de: 'Adresse', en: 'Address' } },
    { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
    { name: 'email', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
    { name: 'website', type: 'text', label: { de: 'Website', en: 'Website' } },
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
