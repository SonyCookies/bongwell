// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   if (path.startsWith('/admin')) {
//     const authCookie = request.cookies.get('isAuthenticated')?.value

//     if (authCookie !== 'true') {
//       return NextResponse.redirect(new URL('auth/login', request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: '/admin/:path*',
// }

