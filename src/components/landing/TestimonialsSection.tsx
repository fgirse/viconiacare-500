'use client'

import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Heike M.',
    role: 'Tochter einer Patientin',
    quote:
      'Ich bin so froh, ViconiaCare gefunden zu haben. Meine Mutter ist in den besten Händen – die Pflegekräfte sind wie Familie.',
    rating: 5,
    initials: 'HM',
    bgColor: 'bg-viconia-500',
  },
  {
    name: 'Wolfgang S.',
    role: 'Patient, Pflegegrad 3',
    quote:
      'Zuverlässig, pünktlich und immer freundlich. Die Abrechnung läuft reibungslos direkt mit der Pflegekasse. Kann ich nur empfehlen!',
    rating: 5,
    initials: 'WS',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Irina K.',
    role: 'Patientin (russischsprachig)',
    quote:
      'Endlich ein Pflegedienst, der auch Russisch spricht. Das gibt mir und meiner Familie ein gutes Gefühl.',
    rating: 5,
    initials: 'IK',
    bgColor: 'bg-violet-500',
  },
  {
    name: 'Mustafa A.',
    role: 'Sohn eines Patienten',
    quote:
      'Die türkischsprachige Pflegekraft hat meinem Vater den Einstieg in die Pflege so viel leichter gemacht. Herzlichen Dank!',
    rating: 5,
    initials: 'MA',
    bgColor: 'bg-amber-500',
  },
  {
    name: 'Gerda L.',
    role: 'Langzeitpatientin',
    quote:
      'Seit drei Jahren betreut mich ViconiaCare. Ich schätze besonders die Konstanz – immer die gleichen Gesichter kommen zu mir.',
    rating: 5,
    initials: 'GL',
    bgColor: 'bg-teal-500',
  },
  {
    name: 'Peter F.',
    role: 'Patient nach Krankenhausaufenthalt',
    quote:
      'Die Übergabe aus dem Krankenhaus war reibungslos. ViconiaCare hat alles kurzerhand übernommen. Sehr professionell.',
    rating: 5,
    initials: 'PF',
    bgColor: 'bg-rose-500',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  return (
    <section id="referenzen" className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-viconia-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            Über 500 zufriedene Familien
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.name}
              className="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <Quote className="h-8 w-8 text-viconia-200 mb-4" />

              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&quot;{review.quote}&quot;</p>

              <StarRating rating={review.rating} />

              <div className="flex items-center gap-3 mt-4">
                <div
                  className={`${review.bgColor} text-white h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="text-muted-foreground text-xs">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
