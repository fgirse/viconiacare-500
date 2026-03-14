import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  labels: {
    singular: { de: 'Benutzer', en: 'User' },
    plural: { de: 'Benutzer', en: 'Users' },
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'superadmin' || req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    create: ({ req }) => {
      if (!req.user) return false
      return req.user.role === 'superadmin' || req.user.role === 'admin'
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'superadmin' || req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => {
      if (!req.user) return false
      return req.user.role === 'superadmin'
    },
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: { de: 'Vorname', en: 'First Name' },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: { de: 'Nachname', en: 'Last Name' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      label: { de: 'Rolle', en: 'Role' },
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: { de: 'Benutzer / Patient', en: 'User / Patient' }, value: 'user' },
      ],
      access: {
        read: () => true,
        create: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'superadmin' || req.user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: { de: 'Profilbild', en: 'Avatar' },
    },
    {
      name: 'phone',
      type: 'text',
      label: { de: 'Telefon', en: 'Phone' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: { de: 'Aktiv', en: 'Active' },
    },
    {
      name: 'patientProfile',
      type: 'relationship',
      relationTo: 'patients',
      label: { de: 'Patientenprofil', en: 'Patient Profile' },
      admin: {
        condition: (data) => data?.role === 'user',
      },
    },
    {
      name: 'employeeProfile',
      type: 'relationship',
      relationTo: 'employees',
      label: { de: 'Mitarbeiterprofil', en: 'Employee Profile' },
      admin: {
        condition: (data) =>
          data?.role === 'admin' || data?.role === 'editor',
      },
    },
  ],
  timestamps: true,
}
