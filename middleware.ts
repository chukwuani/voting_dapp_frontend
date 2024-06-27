import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/getCurrentUser";

export async function middleware(request: NextRequest) {
	const user = await getCurrentUser();

	const noAuthRoutes = [
		"/login",
		"/signup",
		"/signup/verify-email",
		"/reset-password",
		"/forgot-password",
	];

	const isLoggedIn = !!user;
	const isInaccessible = noAuthRoutes.includes(request.nextUrl.pathname);

	if (isInaccessible && isLoggedIn) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!isLoggedIn && !isInaccessible) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/login",
		"/signup/:path*",
		"/reset-password",
		"/forgot-password",
		"/settings",
	],
};
