"use client";
import LoginForm from "@/components/auth/login-form";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
	const router = useRouter();
	const { isAuthenticated, user, isLoading } = useUser();
	const [isRedirecting, setIsRedirecting] = useState(false);
	console.log(user, isAuthenticated);
	useEffect(() => {
		if (isAuthenticated && user) {
			setIsRedirecting(true);

			if (user.role === "STUDENT") {
				router.replace("/dashboard/student");
			} else if (user.role === "ADVISOR") {
				router.replace("/dashboard/advisor");
			} else {
				// Handle unexpected roles
				console.warn("Unknown user role:", user.role);
				setIsRedirecting(false);
			}
		}
	}, [isAuthenticated, user, isLoading, router]);

	if (isLoading || isRedirecting) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	// Only show login form if not authenticated
	if (!isAuthenticated) {
		return <LoginForm />;
	}
	// In a real app, check if user is authenticated and redirect accordingly
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-xl font-semibold mb-4">Access Denied</h1>
				<p className="text-gray-600 mb-4">
					Your account role is not recognized.
				</p>
				<button
					onClick={() => router.push("/logout")}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
