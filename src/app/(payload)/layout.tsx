import type { ReactNode } from 'react'
import '@payloadcms/next/css'

type Props = {
  children: ReactNode
}

export default function PayloadLayout({ children }: Props) {
  return <>{children}</>
}
