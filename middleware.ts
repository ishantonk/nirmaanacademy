import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register");

    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isCheckoutPage = req.nextUrl.pathname.startsWith("/checkout");
    const isBlogCreatePage = req.nextUrl.pathname.startsWith("/blog/create");

    // Redirect unauthenticated users from protected routes to login
    if (
        !isAuthenticated &&
        (isAdminPage || isCheckoutPage || isBlogCreatePage)
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect authenticated users from auth pages to dashboard
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Check role-based access
    if (isAuthenticated && isAdminPage && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isAuthenticated && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/blog/create",
        "/admin/:path*",
        "/checkout/:path*",
        "/dashboard/:path*",
    ],
};
