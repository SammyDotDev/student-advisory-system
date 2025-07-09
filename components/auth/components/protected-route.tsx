"use client";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
	const { user, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/auth/sign-in");
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return <>{children}</>;
}
