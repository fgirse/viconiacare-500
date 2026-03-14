'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen)'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const t = useTranslations('contact')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Fehler beim Senden')
      setSubmitted(true)
      reset()
    } catch {
      setError(t('error'))
    }
  }

  return (
    <section id="kontakt" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-viconia-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            Sprechen Sie mit uns
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact info */}
          <div>
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'Telefon',
                  value: '+49 30 123 456 789',
                  href: 'tel:+4930123456789',
                },
                {
                  icon: Mail,
                  title: 'E-Mail',
                  value: 'info@viconiacare.de',
                  href: 'mailto:info@viconiacare.de',
                },
                {
                  icon: MapPin,
                  title: 'Adresse',
                  value: 'Musterstraße 1, 10115 Berlin',
                  href: 'https://maps.google.com/?q=Berlin',
                },
                {
                  icon: Clock,
                  title: 'Bürozeiten',
                  value: 'Mo–Fr: 8:00–18:00 Uhr | Notfall: 24/7',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-viconia-50 p-3 rounded-xl shrink-0">
                    <item.icon className="h-5 w-5 text-viconia-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-viconia-600 hover:underline text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-muted-foreground text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-8 bg-viconia-50 rounded-2xl p-6 border border-viconia-100">
              <h3 className="font-semibold text-viconia-900 mb-3">Wir sprechen Ihre Sprache</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['🇩🇪 Deutsch', '🇬🇧 English', '🇹🇷 Türkçe', '🇷🇺 Русский', '🇺🇦 Українська'].map(
                  (lang) => (
                    <span key={lang} className="text-viconia-800">{lang}</span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-card rounded-2xl border shadow-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-8">
                <CheckCircle className="h-12 w-12 text-viconia-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Nachricht gesendet!</h3>
                <p className="text-muted-foreground">{t('success')}</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Neue Nachricht
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {t('name')} *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-viconia-500 focus:border-transparent"
                    placeholder={t('name')}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {t('email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-viconia-500 focus:border-transparent"
                    placeholder={t('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {t('phone')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-viconia-500 focus:border-transparent"
                    placeholder={t('phone')}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {t('message')} *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-viconia-500 focus:border-transparent resize-none"
                    placeholder={t('message')}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 rounded-md p-3">{error}</div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Wird gesendet…' : t('send')}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Mit dem Absenden stimmen Sie unserer{' '}
                  <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
