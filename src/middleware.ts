import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Prüfe, ob die Route mit /admin beginnt
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Prüfe, ob das Auth-Cookie gesetzt ist
    const authCookie = request.cookies.get('admin_session')
    
    if (authCookie?.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}