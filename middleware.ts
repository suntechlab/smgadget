// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
import authConfig from "@/auth.config"
import NextAuth from "next-auth"

export const { auth: middleware } = NextAuth(authConfig)
// const { auth } = NextAuth(authConfig)
// export default auth(async function middleware(request: NextRequest) {
//     const currentUser = request.cookies.get('authjs.session-token')?.value
 
//     if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
   
//     if (!currentUser && !request.nextUrl.pathname.startsWith('/signin')) {
//       return NextResponse.redirect(new URL('/signin', request.url))
//     }
// })

// export const config = {
//   matcher: ['/signin/:path*','/dashboard/:path*']
// }