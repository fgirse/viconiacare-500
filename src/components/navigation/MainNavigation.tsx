'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Heart, Users, Phone, Home, Circle,
  ChevronDown, Menu, LayoutDashboard, LogIn,
  Amphora, Rose, Bath, Umbrella, Brain, Bird, Info, Mail, MapPin, CircleHelp,
  House as HouseIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'
import Image from 'next/image'
import Logo from '../../../public/Assets/SVG/ViconiaLogooBG.svg';

// ─── CMS nav data types (mirrors Payload Navigation global) ─────────────────
export type CmsNavSubSubItem = {
  label: string
  href?: string | null
  icon?: string | null
  description?: string | null
}

export type CmsNavSubItem = {
  label: string
  href?: string | null
  icon?: string | null
  description?: string | null
  subSubItems?: CmsNavSubSubItem[]
}

export type CmsNavItem = {
  label: string
  href?: string | null
  icon?: string | null
  description?: string | null
  subItems?: CmsNavSubItem[]
}

// logo is a Payload media relation (depth=1 gives the full object)
export type CmsNavLogo = {
  id?: string
  url?: string | null
  alt?: string | null
  filename?: string | null
  mimeType?: string | null
  width?: number | null
  height?: number | null
}

export type CmsNavData = {
  logo?: CmsNavLogo | null
  items?: CmsNavItem[]
  ctaButtons?: {
    adminLabel?: string | null
    adminHref?: string | null
    loginLabel?: string | null
    loginHref?: string | null
  } | null
}

// ─── Static icon map: CMS icon name (lowercase) → Lucide component ──────────
const ICON_MAP: Record<string, React.ElementType> = {
  amphora:              Amphora,
  rose:                 Rose,
  users:                Users,
  bath:                 Bath,
  heart:                Heart,
  house:                HouseIcon,
  umbrella:             Umbrella,
  brain:                Brain,
  bird:                 Bird,
  info:                 Info,
  mail:                 Mail,
  location:             MapPin,
  mappin:               MapPin,
  phone:                Phone,
  home:                 Home,
  'circle-question-mark': CircleHelp,
  circlehelp:           CircleHelp,
  circle:               Circle,
}

function resolveIcon(name?: string | null, fallback: React.ElementType = Circle): React.ElementType {
  if (!name?.trim()) return fallback
  // Normalise: lowercase, remove spaces, collapse multiple dashes
  const key = name.trim().toLowerCase().replace(/\s+/g, '').replace(/-+/g, '-')
  return ICON_MAP[key] ?? fallback
}

// ─── Static nav fallback (used when CMS is unreachable) ─────────────────────
const STATIC_NAV_ITEMS = [
  { key: 'home',     href: '/',            icon: Home,    subItems: [] as { key: string; href: string; icon: React.ElementType; descKey?: string }[] },
  { key: 'services', href: '/#leistungen', icon: Heart,   subItems: [] as { key: string; href: string; icon: React.ElementType; descKey?: string }[] },
  { key: 'team',     href: '/team',        icon: Users,   subItems: [] as { key: string; href: string; icon: React.ElementType; descKey?: string }[] },
  { key: 'contact',  href: '/#kontakt',    icon: Phone,   subItems: [] as { key: string; href: string; icon: React.ElementType; descKey?: string }[] },
]

// ─── Language config with flag emojis ────────────────────────────────────────
const LANGUAGES = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
]



// ─── Resolved nav item shapes ───────────────────────────────────────────────
type ResolvedSubSubItem = {
  label: string
  href: string
  icon: React.ElementType
  description?: string
}
type ResolvedSubItem = {
  label: string
  href: string
  icon: React.ElementType
  description?: string
  subSubItems?: ResolvedSubSubItem[]
}
type ResolvedNavItem = {
  label: string
  href: string
  icon: React.ElementType
  description?: string
  subItems?: ResolvedSubItem[]
}

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
            'transition-colors hover:bg-amber-50 hover:text-viconia-900',
            'focus:bg-amber-50 focus:text-viconia-900',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-yellow-600 shrink-0" />}
            <span className="text-sm font-medium uppercase leading-none">{title}</span>
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

// ─── Sub-item group: renders a sub-item that has sub-sub-items ───────────────
// Uses a <li> (not <a>) so nesting links inside <a> is avoided.
function SubItemGroup({ item }: { item: ResolvedSubItem }) {
  const Icon = item.icon
  return (
    <li className="rounded-md p-3 hover:bg-amber-50 transition-colors">
      <Link
        href={item.href}
        className="flex items-center gap-2 text-sm font-medium leading-none hover:text-viconia-900"
      >
        <Icon className="h-4 w-4 text-yellow-600 shrink-0" />
        <span className="text-sm font-medium uppercase">{item.label}</span>
      </Link>
      {item.description && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.description}</p>
      )}
      {(item.subSubItems?.length ?? 0) > 0 && (
        <ul className="mt-2 flex flex-col gap-1 pl-6 border-l border-viconia-100">
          {item.subSubItems!.map((ss, ssIdx) => {
            const SSIcon = ss.icon
            return (
              <li key={`ss-${ssIdx}-${ss.href}`}>
                <Link
                  href={ss.href}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gray-700"
                >
                  <SSIcon className="h-3 w-3 shrink-0" />
                  {ss.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

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
            className={cn('gap-2 cursor-pointer', lang.code === locale && 'bg-amber-50 font-medium')}
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
function MobileNav({
  items,
  adminLabel,
  adminHref,
  loginLabel,
  loginHref,
}: {
  items: ResolvedNavItem[]
  adminLabel: string
  adminHref: string
  loginLabel: string
  loginHref: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1">
          <Accordion type="multiple" className="w-full">
            {items.map((item, iIdx) => {
              const hasSubItems = (item.subItems?.length ?? 0) > 0
              if (!hasSubItems) {
                return (
                  <div key={`mobile-${iIdx}-${item.href}`} className="py-1">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium uppercase hover:bg-amber-50 hover:text-gray-700 transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-yellow-600 shrink-0" />
                      {item.label}
                    </Link>
                  </div>
                )
              }
              return (
                <AccordionItem
                  key={`mobile-${iIdx}-${item.href}`}
                  value={`item-${iIdx}`}
                  className="border-none"
                >
                  <AccordionTrigger className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium uppercase hover:bg-amber-50 hover:text-gray-700 hover:no-underline transition-colors [&>svg]:ml-auto [&>svg]:shrink-0">
                    <item.icon className="h-4 w-4 text-yellow-600 shrink-0" />
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <div className="flex flex-col gap-0.5 pl-4 border-l border-viconia-100 ml-6">
                      {item.subItems!.map((sub, sIdx) => (
                        <div key={`mobile-sub-${iIdx}-${sIdx}-${sub.href}`}>
                          <Link
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs uppercase text-muted-foreground hover:text-gray-700 hover:bg-amber-50 transition-colors"
                          >
                            <sub.icon className="h-3 w-3 shrink-0" />
                            {sub.label}
                          </Link>
                          {sub.subSubItems?.map((ss, ssIdx) => (
                            <Link
                              key={`mobile-ss-${iIdx}-${sIdx}-${ssIdx}-${ss.href}`}
                              href={ss.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 ml-4 rounded-md px-3 py-1 text-xs uppercase text-muted-foreground/70 hover:text-gray-700 hover:bg-amber-50 transition-colors"
                            >
                              <ss.icon className="h-2.5 w-2.5 shrink-0" />
                              {ss.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
          <div className="border-t mt-4 pt-4 flex flex-col gap-2">
            <Button asChild variant="outline" size="sm" className="w-full gap-2">
              <Link href={adminHref} onClick={() => setOpen(false)}>
                <LayoutDashboard className="h-4 w-4" /> {adminLabel}
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full gap-2">
              <Link href={loginHref} onClick={() => setOpen(false)}>
                <LogIn className="h-4 w-4" /> {loginLabel}
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
  navData?: CmsNavData | null
}

export function MainNavigation({ locale, navData }: MainNavigationProps) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─── Resolve items: CMS data if available, otherwise static fallback ──────
  const resolvedItems: ResolvedNavItem[] = React.useMemo(() => {
    if (navData?.items?.length) {
      return navData.items.map((item) => ({
        label: item.label,
        href: item.href ?? '/',
        icon: resolveIcon(item.icon, Circle),
        description: item.description ?? undefined,
        subItems: item.subItems?.map((sub) => ({
          label: sub.label,
          href: sub.href ?? '#',
          icon: resolveIcon(sub.icon, Circle),
          description: sub.description ?? undefined,
          subSubItems: sub.subSubItems?.map((ss) => ({
            label: ss.label,
            href: ss.href ?? '#',
            icon: resolveIcon(ss.icon, Circle),
            description: ss.description ?? undefined,
          })),
        })),
      }))
    }
    return STATIC_NAV_ITEMS.map((item: { key: any; href: any; icon: any; subItems: any[] }) => ({
      label: t(item.key as any),
      href: item.href,
      icon: item.icon,
      subItems: item.subItems?.map((sub) => ({
        label: sub.key,
        href: sub.href,
        icon: sub.icon,
        description: sub.descKey,
        subSubItems: undefined,
      })),
    }))
  }, [navData, t])

  // ─── CTA button values ──────────────────────────────────────────────────────
  const adminLabel = navData?.ctaButtons?.adminLabel ?? t('admin')
  const adminHref  = navData?.ctaButtons?.adminHref  ?? '/admin'
  const loginLabel = navData?.ctaButtons?.loginLabel ?? t('login')
  const loginHref  = navData?.ctaButtons?.loginHref  ?? '/login'

  // ─── Logo ───────────────────────────────────────────────────────────────────
  const logoUrl  = navData?.logo?.url ?? null
  const logoAlt  = navData?.logo?.alt ?? 'ViconiaCare Logo'
  const logoW    = navData?.logo?.width  ?? 232
  const logoH    = navData?.logo?.height ?? 232

  // First item with subItems gets the featured dropdown card treatment
  const firstDropdownIdx = resolvedItems.findIndex((i) => (i.subItems?.length ?? 0) > 0)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-700">
          {logoUrl ? (
            <Image src={logoUrl} alt={logoAlt} width={logoW} height={logoH} className="h-9 w-auto" />
          ) : (
            <Image src={Logo} alt={logoAlt} width={232} height={232} className="h-9 w-auto" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {resolvedItems.map((item, idx) => {
              const hasSubItems = (item.subItems?.length ?? 0) > 0

              if (!hasSubItems) {
                return (
                  <NavigationMenuItem key={`nav-${idx}-${item.href}`}>
                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'uppercase text-sm')}>
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              }

              // Featured dropdown for the first item with subItems
              if (idx === firstDropdownIdx) {
                return (
                  <NavigationMenuItem key={`nav-${idx}-${item.href}`}>
                    <NavigationMenuTrigger className="uppercase text-sm">{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-105 gap-2 p-4 md:grid-cols-2">
                        <li className="row-span-2">
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-yellow-300 to-yellow-500 p-6 no-underline outline-none focus:shadow-md"
                            >
                              <item.icon className="h-6 w-6 text-white" />
                              <div className="mb-2 mt-4 text-lg font-medium text-white">{item.label}</div>
                              {item.description && (
                                <p className="text-xl leading-tight text-yellow-100">{item.description}</p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.subItems!.map((sub, sIdx) =>
                          (sub.subSubItems?.length ?? 0) > 0 ? (
                            <SubItemGroup key={`nav-${idx}-sub-${sIdx}-${sub.href}`} item={sub} />
                          ) : (
                            <ListItem
                              key={`nav-${idx}-sub-${sIdx}-${sub.href}`}
                              href={sub.href}
                              title={sub.label}
                              description={sub.description}
                              icon={sub.icon}
                            />
                          )
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              // Standard dropdown for other items with subItems
              return (
                <NavigationMenuItem key={`nav-${idx}-${item.href}`}>
                  <NavigationMenuTrigger className="uppercase text-sm">{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-75 gap-2 p-4">
                      {item.subItems!.map((sub, sIdx) =>
                        (sub.subSubItems?.length ?? 0) > 0 ? (
                          <SubItemGroup key={`nav-${idx}-sub-${sIdx}-${sub.href}`} item={sub} />
                        ) : (
                          <ListItem
                            key={`nav-${idx}-sub-${sIdx}-${sub.href}`}
                            href={sub.href}
                            title={sub.label}
                            description={sub.description}
                            icon={sub.icon}
                          />
                        )
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: Lang Switcher + Admin + Login */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />

          <Button asChild variant="outline" size="sm" className="hidden lg:flex gap-1.5">
            <Link href={adminHref}>
              <LayoutDashboard className="h-3.5 w-3.5" />
              {adminLabel}
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden lg:flex gap-1.5">
            <Link href={loginHref}>
              <LogIn className="h-3.5 w-3.5" />
              {loginLabel}
            </Link>
          </Button>

          <MobileNav
            items={resolvedItems}
            adminLabel={adminLabel}
            adminHref={adminHref}
            loginLabel={loginLabel}
            loginHref={loginHref}
          />
        </div>
      </div>
    </header>
  )
}
