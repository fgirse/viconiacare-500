import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: { de: 'Navigation', en: 'Navigation' },
  admin: {
    group: 'Globale Einstellungen',
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: { de: 'Logo', en: 'Logo' },
    },
    {
      name: 'items',
      type: 'array',
      label: { de: 'Navigationspunkte', en: 'Navigation Items' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: { de: 'Bezeichnung', en: 'Label' },
        },
        {
          name: 'href',
          type: 'text',
          label: { de: 'Link (URL)', en: 'Link (URL)' },
        },
        {
          name: 'icon',
          type: 'text',
          label: { de: 'Lucide-Icon Name', en: 'Lucide Icon Name' },
          admin: { description: 'z.B. "Heart", "Users", "Phone" — siehe lucide.dev' },
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: { de: 'Kurzbeschreibung', en: 'Short Description' },
        },
        {
          name: 'subItems',
          type: 'array',
          label: { de: 'Unterebene', en: 'Sub Items' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: { de: 'Bezeichnung', en: 'Label' },
            },
            {
              name: 'href',
              type: 'text',
              label: { de: 'Link (URL)', en: 'Link (URL)' },
            },
            {
              name: 'icon',
              type: 'text',
              label: { de: 'Lucide-Icon Name', en: 'Lucide Icon Name' },
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              label: { de: 'Kurzbeschreibung', en: 'Short Description' },
            },
            {
              name: 'subSubItems',
              type: 'array',
              label: { de: 'Unter-Unterebene', en: 'Sub-Sub Items' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: { de: 'Bezeichnung', en: 'Label' },
                },
                {
                  name: 'href',
                  type: 'text',
                  label: { de: 'Link (URL)', en: 'Link (URL)' },
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: { de: 'Lucide-Icon Name', en: 'Lucide Icon Name' },
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  label: { de: 'Kurzbeschreibung', en: 'Short Description' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButtons',
      type: 'group',
      label: { de: 'CTA Buttons (Admin / Login)', en: 'CTA Buttons (Admin / Login)' },
      fields: [
        {
          name: 'adminLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Admin',
          label: { de: 'Admin-Button Text', en: 'Admin Button Label' },
        },
        {
          name: 'adminHref',
          type: 'text',
          defaultValue: '/admin',
          label: { de: 'Admin-Button Link', en: 'Admin Button Link' },
        },
        {
          name: 'loginLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Login',
          label: { de: 'Login-Button Text', en: 'Login Button Label' },
        },
        {
          name: 'loginHref',
          type: 'text',
          defaultValue: '/login',
          label: { de: 'Login-Button Link', en: 'Login Button Link' },
        },
      ],
    },
  ],
}
