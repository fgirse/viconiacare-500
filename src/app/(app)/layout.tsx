import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import '../globals.css'

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: '100',
})

export const metadata: Metadata = {
  title: 'ViconiaCare GmbH',
  description: 'Ambulanter Pflegedienst – professionelle Pflege mit Herz',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={barlow.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
