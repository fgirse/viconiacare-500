import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'

const TEAM_MEMBERS = [
  {
    name: 'Dr. Fatima Al-Hassan',
    role: 'Geschäftsführerin & Pflegedienstleiterin',
    qualification: 'Pflegewissenschaftlerin M.Sc.',
    initials: 'FA',
    bgColor: 'bg-viconia-600',
  },
  {
    name: 'Thomas Becker',
    role: 'Examinierter Altenpfleger',
    qualification: 'Wundmanager (ICW)',
    initials: 'TB',
    bgColor: 'bg-blue-600',
  },
  {
    name: 'Natasha Ivanova',
    role: 'Pflegefachkraft (RU/DE)',
    qualification: 'Examinierte Gesundheits- & Krankenpflegerin',
    initials: 'NI',
    bgColor: 'bg-violet-600',
  },
  {
    name: 'Ayşe Yilmaz',
    role: 'Pflegefachkraft (TR/DE)',
    qualification: 'Examinierte Altenpflegerin',
    initials: 'AY',
    bgColor: 'bg-rose-600',
  },
  {
    name: 'Olena Melnyk',
    role: 'Pflegeassistentin (UK/DE)',
    qualification: 'Pflegeassistentin mit Erweiterung',
    initials: 'OM',
    bgColor: 'bg-amber-600',
  },
  {
    name: 'Marcus Schreiber',
    role: 'Tourenleiter & Pflegehelfer',
    qualification: 'Pflegehelfer mit 5 Jahren Erfahrung',
    initials: 'MS',
    bgColor: 'bg-teal-600',
  },
]

export function TeamSection() {
  const t = useTranslations('team')

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-viconia-600 text-sm font-semibold uppercase tracking-wider mb-2 inline-block">
            Ihr persönliches Pflegeteam
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-all"
            >
              {/* Avatar */}
              <div
                className={`${member.bgColor} text-white h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-105 transition-transform`}
              >
                {member.initials}
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
              <p className="text-viconia-600 text-sm font-medium mb-2">{member.role}</p>
              <Badge variant="secondary" className="text-xs">
                {member.qualification}
              </Badge>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-16 text-center bg-viconia-50 rounded-2xl p-8 border border-viconia-100">
          <h3 className="text-xl font-bold text-viconia-900 mb-2">Werden Sie Teil unseres Teams</h3>
          <p className="text-viconia-700 mb-4 text-sm">
            Wir suchen einfühlsame Pflegefachkräfte und -helfer, die mit uns gemeinsam einen Unterschied machen wollen.
          </p>
          <a
            href="/karriere"
            className="inline-flex items-center gap-2 text-viconia-700 font-medium text-sm hover:text-viconia-900"
          >
            Zu unseren offenen Stellen →
          </a>
        </div>
      </div>
    </section>
  )
}
