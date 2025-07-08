// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
	const role = payload.role; // e.g., "STUDENT" or "ADVISOR"

	const pathname = request.nextUrl.pathname;

	if (pathname.startsWith("/dashboard/advisor") && role !== "ADVISOR") {
		return NextResponse.redirect(new URL("/unauthorized", request.url));
	}

	if (pathname.startsWith("/dashboard/student") && role !== "STUDENT") {
		return NextResponse.redirect(new URL("/unauthorized", request.url));
	}

	return NextResponse.next();
}
