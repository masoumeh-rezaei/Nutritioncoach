// middleware.ts

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value

    // لیست مسیرهایی که نیاز به احراز هویت دارند
    const protectedPaths = ['/form', '/dashboard', '/profile']

    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath && !token) {
        // اگر توکن نباشه و صفحه محافظت شده باشه، ریدایرکت کن به لاگین
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}
