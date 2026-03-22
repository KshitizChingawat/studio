import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const studentProtectedRoutes = ['/dashboard', '/orders', '/checkout', '/confirmation', '/vendor'];
const vendorProtectedRoutes = ['/vendor-admin/dashboard', '/vendor-admin/kds', '/vendor-admin/menu', '/vendor-admin/scanner'];

function isProtected(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtected(pathname, studentProtectedRoutes) && !request.cookies.get('student-session')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isProtected(pathname, vendorProtectedRoutes) && !request.cookies.get('vendor-session')) {
    return NextResponse.redirect(new URL('/vendor-admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/orders/:path*', '/checkout/:path*', '/confirmation/:path*', '/vendor/:path*', '/vendor-admin/dashboard/:path*', '/vendor-admin/kds/:path*', '/vendor-admin/menu/:path*', '/vendor-admin/scanner/:path*'],
};
