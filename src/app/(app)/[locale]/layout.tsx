import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import '@/app/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { MainNavigation } from '@/components/navigation/MainNavigation'
import type { CmsNavData } from '@/components/navigation/MainNavigation'
import { Footer } from '@/components/footer/Footer'
import BackToTop from '@/components/BackToTop'
import config from '@payload-config'
import { getPayload } from 'payload'

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: '100',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l === routing.defaultLocale ? '' : l}`])
      ),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  let navData: CmsNavData | null = null
  try {
    const payload = await getPayload({ config })
    navData = await payload.findGlobal({
      slug: 'navigation',
      locale: locale as any,
      depth: 1,
    }) as unknown as CmsNavData
  } catch {
    // silently fall back to static nav
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={barlow.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainNavigation locale={locale} navData={navData} />
          <main>{children}</main>
          <Footer locale={locale} />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
