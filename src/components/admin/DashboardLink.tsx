'use client'

import Link from 'next/link'

export function DashboardLink() {
  return (
    <div style={{ padding: '8px 16px' }}>
      <Link
        href="/dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: 'inherit',
          textDecoration: 'none',
          opacity: 0.8,
        }}
      >
        ← Dashboard
      </Link>
    </div>
  )
}
