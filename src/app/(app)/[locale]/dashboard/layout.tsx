import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <div>
              <div className="font-bold text-viconia-700 text-sm">ViconiaCare</div>
              <div className="text-xs text-muted-foreground">Dashboard</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4">
          <SidebarNav />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">ViconiaCare</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function SidebarNav() {
  const navItems = [
    { href: '/dashboard', label: 'Übersicht', icon: '📊' },
    { href: '/dashboard/admin', label: 'Admin', icon: '⚙️' },
    { href: '/dashboard/patient', label: 'Patienten', icon: '👥' },
    { href: '/dashboard/billing', label: 'Abrechnung', icon: '💶' },
    { href: '/dashboard/employees', label: 'Mitarbeiter', icon: '👨‍⚕️' },
    { href: '/dashboard/route-planning', label: 'Tourenplanung', icon: '🗺️' },
  ]

  return (
    <ul className="space-y-1">
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-viconia-50 hover:text-viconia-700 transition-colors"
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        </li>
      ))}
      <li className="pt-4 mt-4 border-t">
        <a
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <span>🔧</span>
          Payload Admin
        </a>
      </li>
    </ul>
  )
}
