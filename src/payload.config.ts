import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Patients } from './collections/Patients'
import { Employees } from './collections/Employees'
import { Services } from './collections/Services'
import { BillingRecords } from './collections/BillingRecords'
import { Documents } from './collections/Documents'
import { TourPlans } from './collections/TourPlans'
import { Testimonials } from './collections/Testimonials'
import { Appointments } from './collections/Appointments'
import { PayrollRecords } from './collections/PayrollRecords'
import { CareVisits } from './collections/CareVisits'
import { InsuranceProviders } from './collections/InsuranceProviders'
import { Pages } from './collections/Pages'

// Globals
import { Navigation } from './globals/Navigation'
import { FooterNavigation } from './globals/FooterNavigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '– ViconiaCare Admin',
    },
    components: {
      beforeNavLinks: [
        '/components/admin/DashboardLink#DashboardLink',
      ],
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Patients,
    Employees,
    Services,
    BillingRecords,
    Documents,
    TourPlans,
    Testimonials,
    Appointments,
    PayrollRecords,
    CareVisits,
    InsuranceProviders,
  ],
  globals: [
    Navigation,
    FooterNavigation,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  sharp,
  localization: {
    locales: [
      {
        label: {
          de: 'Deutsch',
          en: 'German',
        },
        code: 'de',
      },
      {
        label: {
          de: 'Englisch',
          en: 'English',
        },
        code: 'en',
      },
      {
        label: {
          de: 'Türkisch',
          en: 'Turkish',
          tr: 'Türkçe',
        },
        code: 'tr',
      },
      {
        label: {
          de: 'Russisch',
          en: 'Russian',
          ru: 'Русский',
        },
        code: 'ru',
      },
      {
        label: {
          de: 'Ukrainisch',
          en: 'Ukrainian',
          uk: 'Українська',
        },
        code: 'uk',
      },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],
})
