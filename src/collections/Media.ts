import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
  },
  labels: {
    singular: { de: 'Mediendatei', en: 'Media File' },
    plural: { de: 'Mediendateien', en: 'Media Files' },
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (!req.user) return false
      return req.user.role === 'superadmin' || req.user.role === 'admin' || req.user.role === 'editor'
    },
    delete: ({ req }) => {
      if (!req.user) return false
      return req.user.role === 'superadmin' || req.user.role === 'admin'
    },
  },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 200, position: 'centre' },
      { name: 'card', width: 800, height: 533, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      label: { de: 'Alternativtext', en: 'Alt Text' },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      label: { de: 'Bildunterschrift', en: 'Caption' },
    },
    {
      name: 'category',
      type: 'select',
      label: { de: 'Kategorie', en: 'Category' },
      options: [
        { label: { de: 'Allgemein', en: 'General' }, value: 'general' },
        { label: { de: 'Team', en: 'Team' }, value: 'team' },
        { label: { de: 'Dokument', en: 'Document' }, value: 'document' },
        { label: { de: 'Patientenakte', en: 'Patient Record' }, value: 'patient-record' },
      ],
    },
  ],
}
