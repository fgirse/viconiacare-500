import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    group: 'Content',
    defaultColumns: ['authorName', 'rating', 'isPublished'],
  },
  labels: {
    singular: { de: 'Referenz', en: 'Testimonial' },
    plural: { de: 'Referenzen', en: 'Testimonials' },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      // Public read for published only
      return { isPublished: { equals: true } }
    },
    create: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['superadmin', 'admin', 'editor'].includes(req.user?.role ?? ''),
    delete: ({ req }) => ['superadmin', 'admin'].includes(req.user?.role ?? ''),
  },
  fields: [
    { name: 'authorName', type: 'text', required: true, label: { de: 'Name', en: 'Author Name' } },
    { name: 'authorRole', type: 'text', localized: true, label: { de: 'Rolle / Beziehung', en: 'Role / Relation' } },
    { name: 'authorPhoto', type: 'upload', relationTo: 'media', label: { de: 'Foto', en: 'Photo' } },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      label: { de: 'Zitat', en: 'Quote' },
    },
    {
      name: 'rating',
      type: 'select',
      defaultValue: '5',
      label: { de: 'Bewertung', en: 'Rating' },
      options: ['1','2','3','4','5'].map(v => ({ label: `${v} Sterne`, value: v })),
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: { de: 'Veröffentlicht', en: 'Published' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: { de: 'Reihenfolge', en: 'Sort Order' },
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
