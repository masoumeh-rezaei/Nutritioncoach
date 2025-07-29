// middleware.ts

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value


    const protectedPaths = ['/form', '/dashboard', '/profile']

    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    )

    // if (isProtectedPath && !token) {
    //
    //     const loginUrl = new URL('/login', request.url)
    //     return NextResponse.redirect(loginUrl)
    // }

    return NextResponse.next()
}
