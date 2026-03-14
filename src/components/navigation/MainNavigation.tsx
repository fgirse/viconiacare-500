'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Heart, Users, Phone, Calendar, MapPin, FileText,
  Shield, ChevronDown, Globe, Menu, LayoutDashboard,
  LogIn, Settings, HeartPulse, Home, ClipboardList,
  Star, MessageSquare, Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'
import Image from 'next/image'
import Logo from '../../../public/Assets/SVG/ViconiaLogooBG.svg';

// ─── Language config with flag emojis ────────────────────────────────────────
const LANGUAGES = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
]

// ─── Static nav structure (CMS values overlay this) ──────────────────────────
const NAV_ITEMS = [
  {
    key: 'home',
    href: '/',
    icon: Home,
  },
  {
    key: 'services',
    href: '/#leistungen',
    icon: Heart,
    subItems: [
      { key: 'grundpflege', href: '/#grundpflege', icon: Heart, descKey: 'Körperpflege, Mobilisierung, An-/Auskleiden' },
      { key: 'behandlungspflege', href: '/#behandlungspflege', icon: HeartPulse, descKey: 'Wundversorgung, Injektionen, HKP' },
      { key: 'betreuung', href: '/#betreuung', icon: Users, descKey: 'Alltagsbegleitung, kognitive Aktivierung' },
      { key: 'hauswirtschaft', href: '/#hauswirtschaft', icon: Home, descKey: 'Einkauf, Kochen, Reinigung' },
    ],
  },
  {
    key: 'process',
    href: '/#ablauf',
    icon: Activity,
  },
  {
    key: 'team',
    href: '/#team',
    icon: Users,
  },
  {
    key: 'testimonials',
    href: '/#referenzen',
    icon: Star,
  },
  {
    key: 'contact',
    href: '/#kontakt',
    icon: MessageSquare,
  },
]

// ─── Sub-item list item helper ────────────────────────────────────────────────
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; description?: string; icon?: React.ElementType }
>(({ className, title, description, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
            'transition-colors hover:bg-viconia-50 hover:text-viconia-900',
            'focus:bg-viconia-50 focus:text-viconia-900',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-viconia-600 shrink-0" />}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          {description && (
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  const switchLocale = (newLocale: string) => {
    // Strip current locale prefix and add new one
    let newPath = pathname
    const localePrefix = `/${locale}`
    if (pathname.startsWith(localePrefix)) {
      newPath = pathname.slice(localePrefix.length) || '/'
    }
    if (newLocale !== routing.defaultLocale) {
      newPath = `/${newLocale}${newPath}`
    }
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 font-normal">
          <span className="text-base">{current.flag}</span>
          <span className="hidden sm:inline text-xs">{current.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={cn('gap-2 cursor-pointer', lang.code === locale && 'bg-viconia-50 font-medium')}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────
function MobileNav({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 pt-10">
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-viconia-50 hover:text-viconia-700"
              >
                <item.icon className="h-4 w-4 text-viconia-600" />
                {t(item.key as any)}
              </Link>
              {item.subItems?.map((sub) => (
                <Link
                  key={sub.key}
                  href={sub.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 ml-6 rounded-md px-3 py-2 text-xs text-muted-foreground hover:text-viconia-700 hover:bg-viconia-50"
                >
                  <sub.icon className="h-3 w-3" />
                  {sub.key}
                </Link>
              ))}
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex flex-col gap-2">
            <Button asChild variant="outline" size="sm" className="w-full gap-2">
              <Link href="/admin" onClick={() => setOpen(false)}>
                <Settings className="h-4 w-4" /> {t('admin')}
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full gap-2">
              <Link href="/login" onClick={() => setOpen(false)}>
                <LogIn className="h-4 w-4" /> {t('login')}
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// ─── Main Navigation Component ────────────────────────────────────────────────
interface MainNavigationProps {
  locale: string
}

export function MainNavigation({ locale }: MainNavigationProps) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-viconia-700">
          <Image src={Logo} alt="ViconiaCare Logo" width={232} height={232} className='size-60'/>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/">{t('home')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Leistungen with sub-items */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('services')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-2 p-4 md:grid-cols-2">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/#leistungen"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-viconia-500 to-viconia-700 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Heart className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">{t('services')}</div>
                        <p className="text-sm leading-tight text-viconia-100">
                          Professionelle Pflege nach SGB XI &amp; SGB V
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {NAV_ITEMS.find((i) => i.key === 'services')?.subItems?.map((sub) => (
                    <ListItem
                      key={sub.key}
                      href={sub.href}
                      title={sub.key}
                      description={sub.descKey}
                      icon={sub.icon}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/#ablauf">{t('process')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/#team">{t('team')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/#kontakt">{t('contact')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: Lang Switcher + Admin + Login */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />

          <Button asChild variant="outline" size="sm" className="hidden sm:flex gap-1.5">
            <Link href="/admin">
              <Settings className="h-3.5 w-3.5" />
              {t('admin')}
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden sm:flex gap-1.5">
            <Link href="/login">
              <LogIn className="h-3.5 w-3.5" />
              {t('login')}
            </Link>
          </Button>

          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  )
}
