import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  // Skip Payload admin and API routes
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/media')
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|media|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)',
  ],
}
