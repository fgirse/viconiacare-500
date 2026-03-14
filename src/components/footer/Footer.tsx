import Link from 'next/link'
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const FOOTER_COLUMNS = [
  {
    heading: 'Leistungen',
    links: [
      { label: 'Grundpflege', href: '/#grundpflege' },
      { label: 'Behandlungspflege (SGB V)', href: '/#behandlungspflege' },
      { label: 'Betreuung & Aktivierung', href: '/#betreuung' },
      { label: 'Hauswirtschaft', href: '/#hauswirtschaft' },
      { label: 'Verhinderungspflege', href: '/#verhinderung' },
    ],
  },
  {
    heading: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Unser Team', href: '/#team' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Presse', href: '/presse' },
      { label: 'Kontakt', href: '/#kontakt' },
    ],
  },
  {
    heading: 'Für Patienten',
    links: [
      { label: 'Terminbuchung', href: '/#termine' },
      { label: 'Patientenportal', href: '/login' },
      { label: 'Dokumente hochladen', href: '/login' },
      { label: 'Pflegegrade erklärt', href: '/pflegegrade' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

const SOCIAL_LINKS = [
  { platform: 'facebook', href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { platform: 'instagram', href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { platform: 'linkedin', href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
]

const LEGAL_LINKS = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
  { label: 'Barrierefreiheit', href: '/barrierefreiheit' },
]

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-7 w-7 fill-viconia-500 text-viconia-500" />
              <span className="text-xl font-bold text-white">ViconiaCare</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Professioneller ambulanter Pflegedienst in Hamburg und Umgebung. Wir verbinden
              medizinische Kompetenz mit menschlicher Wärme – für Ihre Würde und Ihr
              Wohlergehen.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-viconia-400 shrink-0 mt-0.5" />
                <span>Musterstraße 1, 10115 Berlin</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-viconia-400 shrink-0" />
                <a href="tel:+4930123456789" className="hover:text-viconia-400 transition-colors">
                  +49 30 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-viconia-400 shrink-0" />
                <a
                  href="mailto:info@viconiacare.de"
                  className="hover:text-viconia-400 transition-colors"
                >
                  info@viconiacare.de
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 hover:bg-viconia-600 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-viconia-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mb-8">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 text-xs">
              <span className="text-viconia-400 font-bold">✓</span>
              <span>Zertifiziert nach SGB XI</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 text-xs">
              <span className="text-viconia-400 font-bold">✓</span>
              <span>Zertifiziert nach SGB V</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 text-xs">
              <span className="text-viconia-400 font-bold">✓</span>
              <span>MDK geprüft – Sehr gut</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {year} ViconiaCare GmbH. Alle Rechte vorbehalten.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
