import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { MainNavigation } from '@/components/navigation/MainNavigation'
import { Footer } from '@/components/footer/Footer'
import BackToTop from '@/components/BackToTop'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
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

  return (
    <NextIntlClientProvider messages={messages}>
      <MainNavigation locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <BackToTop/>
    </NextIntlClientProvider>
  )
}
