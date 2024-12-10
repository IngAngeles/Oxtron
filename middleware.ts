import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_ROUTES, ROOT } from '@/lib/routes'
import { auth } from '@/auth'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const session = await auth()
  const isAuthenticated = !!session?.user

  // console.log('middleware->pathname:', nextUrl.pathname)
  // console.log('middleware->isAuthenticated:', isAuthenticated)

  const isPublicRoute = PUBLIC_ROUTES.find(route =>
    nextUrl.pathname.startsWith(route)
  ) || nextUrl.pathname === ROOT

  // console.log('middleware->isPublicRoute:', isPublicRoute)
  // console.log('middleware->redirect:', !isAuthenticated && !isPublicRoute)

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}