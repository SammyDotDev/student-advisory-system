// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
	matcher: ["/dashboard/:path*", "/unauthorized", "/auth/:path*"],
};

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const pathname = request.nextUrl.pathname;

	console.log("🚀 Middleware triggered for:", pathname);
	console.log("🔑 Token exists:", !!token);

	// Allow access to auth pages
	if (pathname.startsWith("/auth") && !token) {
		console.log("✅ Auth page, allowing access");
		return NextResponse.next();
	}

	if (!token) {
		console.log("❌ No token, redirecting to login");
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		const roles = payload.roles || [];
		const isAuthenticated = roles.length > 0;

		console.log("👤 Decoded payload:", payload);
		console.log("🎭 User roles:", roles, roles.includes("STUDENT"));
		console.log("📍 Current path:", pathname);

		// Redirect authenticated users away from auth pages
		if (pathname.startsWith("/auth/") && isAuthenticated) {
			console.log(
				"🔒 Authenticated user trying to access auth page, redirecting..."
			);

			if (roles.includes("ADVISOR")) {
				console.log(
					"✅ ADVISOR on auth page, redirecting to advisor dashboard"
				);
				return NextResponse.redirect(
					new URL("/dashboard/advisor", request.url)
				);
			}

			if (roles.includes("STUDENT")) {
				console.log(
					"✅ STUDENT on auth page, redirecting to student dashboard"
				);
				return NextResponse.redirect(
					new URL("/dashboard/student", request.url)
				);
			}
		}
		// unauthorized page
		if (pathname === "/unauthorized") {
			if (roles.includes("ADVISOR")) {
				console.log(
					"✅ ADVISOR on unauthorized page, redirecting to advisor dashboard"
				);
				return NextResponse.redirect(
					new URL("/dashboard/advisor", request.url)
				);
			}
			if (roles.includes("STUDENT")) {
				console.log(
					"✅ STUDENT on unauthorized page, redirecting to student dashboard"
				);
				return NextResponse.redirect(
					new URL("/dashboard/student", request.url)
				);
			}
		}

		// Check role-based access
		if (
			pathname.startsWith("/dashboard/advisor") &&
			!roles.includes("ADVISOR")
		) {
			console.log("❌ ADVISOR role required but not found");
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}

		if (
			pathname.startsWith("/dashboard/student") &&
			!roles.includes("STUDENT")
		) {
			console.log("❌ STUDENT role required but not found");
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}

		console.log("✅ Access granted");
		return NextResponse.next();
	} catch (error) {
		console.log("❌ Token decode error:", error);
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
}
