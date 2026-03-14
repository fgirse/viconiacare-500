import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  labels: {
    singular: { de: 'Seite', en: 'Page' },
    plural: { de: 'Seiten', en: 'Pages' },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
    delete: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { de: 'Titel', en: 'Title' } },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug' },
    { name: 'content', type: 'richText', localized: true, label: { de: 'Inhalt', en: 'Content' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true, label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', localized: true, label: 'Meta Description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
  timestamps: true,
}
