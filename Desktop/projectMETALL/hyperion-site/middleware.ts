import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

  // Если пользователь пытается зайти в админку без сессии
  if (isAdminRoute && !session && !isLoginRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Если пользователь уже авторизован и пытается зайти на страницу логина
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login/:path*']
}


