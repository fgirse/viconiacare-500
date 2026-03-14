import type { GlobalConfig } from 'payload'

export const FooterNavigation: GlobalConfig = {
  slug: 'footer-navigation',
  label: { de: 'Footer Navigation', en: 'Footer Navigation' },
  admin: {
    group: 'Globale Einstellungen',
  },
  access: {
    read: () => true,
    update: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'ViconiaCare GmbH',
      label: { de: 'Firmenname', en: 'Company Name' },
    },
    {
      name: 'companyTagline',
      type: 'text',
      localized: true,
      label: { de: 'Slogan', en: 'Tagline' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: { de: 'Footer-Logo', en: 'Footer Logo' },
    },
    {
      name: 'columns',
      type: 'array',
      label: { de: 'Footer-Spalten', en: 'Footer Columns' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          localized: true,
          label: { de: 'Spaltenüberschrift', en: 'Column Heading' },
        },
        {
          name: 'links',
          type: 'array',
          label: { de: 'Links', en: 'Links' },
          fields: [
            { name: 'label', type: 'text', required: true, localized: true, label: { de: 'Linktext', en: 'Link Label' } },
            { name: 'href', type: 'text', required: true, label: { de: 'URL', en: 'URL' } },
            {
              name: 'isExternal',
              type: 'checkbox',
              defaultValue: false,
              label: { de: 'Externer Link', en: 'External Link' },
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: { de: 'Social Media Links', en: 'Social Media Links' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: { de: 'Plattform', en: 'Platform' },
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        { name: 'url', type: 'text', required: true, label: { de: 'URL', en: 'URL' } },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: { de: 'Kontaktdaten', en: 'Contact Details' },
      fields: [
        { name: 'address', type: 'text', label: { de: 'Adresse', en: 'Address' } },
        { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
        { name: 'email', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
        { name: 'openingHours', type: 'text', localized: true, label: { de: 'Öffnungszeiten', en: 'Opening Hours' } },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: { de: 'Rechtliche Links', en: 'Legal Links' },
      admin: { description: 'Impressum, Datenschutz, AGB…' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true, label: { de: 'Linktext', en: 'Link Label' } },
        { name: 'href', type: 'text', required: true, label: { de: 'URL', en: 'URL' } },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      defaultValue: '© 2024 ViconiaCare GmbH. Alle Rechte vorbehalten.',
      label: { de: 'Copyright-Text', en: 'Copyright Text' },
    },
    {
      name: 'certifications',
      type: 'array',
      label: { de: 'Zertifizierungen / Siegel', en: 'Certifications / Seals' },
      fields: [
        { name: 'name', type: 'text', label: { de: 'Name', en: 'Name' } },
        { name: 'logo', type: 'upload', relationTo: 'media', label: { de: 'Logo', en: 'Logo' } },
        { name: 'url', type: 'text', label: { de: 'Link', en: 'Link' } },
      ],
    },
  ],
}
