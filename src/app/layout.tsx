import type { ReactNode } from 'react'

// Each route group ((app) and (payload)) manages its own <html>/<body>.
// Payload's RootLayout renders its own <html>/<body>, so a shared wrapper
// here would cause a nested <html>-inside-<body> hydration error.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
