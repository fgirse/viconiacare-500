import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

// Fallback colours cycled by index
const AVATAR_COLORS = [
  'bg-viconia-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-teal-500',
  'bg-rose-500',
]

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

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

export async function TestimonialsSection() {
  const t = await getTranslations('testimonials')

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { isPublished: { equals: true } },
    sort: 'sortOrder',
    limit: 12,
  })

  return (
    <section id="referenzen" className="py-24 bg-yellow-500/10">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            Über 500 zufriedene Familien
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {docs.map((review, idx) => {
            const rating = Number(review.rating ?? 5)
            const photo = review.authorPhoto as { url?: string | null } | null | undefined
            const photoUrl =
              photo && typeof photo === 'object' && photo.url ? photo.url : null
            const color = AVATAR_COLORS[idx % AVATAR_COLORS.length]

            return (
              <div
                key={review.id}
                className="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Quote className="h-8 w-8 text-viconia-200 mb-4" />

                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                  &quot;{review.quote}&quot;
                </p>

                <StarRating rating={rating} />

                <div className="flex items-center gap-3 mt-4">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={review.authorName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className={`${color} text-white h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}
                    >
                      {initials(review.authorName)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.authorName}</div>
                    {review.authorRole && (
                      <div className="text-muted-foreground text-xs">{review.authorRole}</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
