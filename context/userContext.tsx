"use client";

import { API_URL, ApiClient } from "@/api/api";
import { LoginResponse } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const UserContext = createContext({
	user: null,
	accessToken: null,
	isLoading: true,
	login: (credentials: { userId: string; password: string }) => {
		return { success: true, user: null };
	},
	// logout: () => {},
	updateUser: (userData) => {},
	// refreshToken: () => {},
});

export function UserProvider({ children }) {
	const AuthApi = ApiClient();
	const [user, setUser] = useState<LoginResponse | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// Check authentication status on app load
	useEffect(() => {
		// checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			// Check if we have an access token in localStorage
			const storedToken = localStorage.getItem("accessToken");

			if (storedToken) {
				setAccessToken(storedToken);

				// Try to get user profile to validate token
				const response = await AuthApi.get("/user/profile"); // Adjust endpoint as needed

				if (response.status === 200) {
					setUser(response.data.result);
				}
			} else {
				// No stored token, try to refresh using cookie
				const refreshResponse = await AuthApi.post("/auth/refresh");

				if (refreshResponse.status === 200) {
					const newAccessToken = `Bearer ${refreshResponse.data.result.token}`;
					localStorage.setItem("accessToken", newAccessToken);
					setAccessToken(newAccessToken);
					setUser(refreshResponse.data.result);
				}
			}
		} catch (error) {
			console.log("Auth check failed:", error);
			// Not authenticated - this is fine for public pages
		} finally {
			setIsLoading(false);
		}
	};
	const logout = async () => {
		setUser(null);
		setAccessToken(null);
		router.push("/login");
	};

	const refreshToken = async () => {
		try {
			const response = await axios.get(`${API_URL}auth/refresh`, {
				withCredentials: true,
			});
			console.log(response.status === 200);
			if (response.status === 200) {
				const data = await response.data;
				setAccessToken(data.result.token);
				setUser(data.user);
				return data.accessToken;
			} else {
				// Refresh failed, user needs to log in again
				logout();
				return null;
			}
		} catch (error) {
			console.error("Token refresh failed:", error);
			logout();
			return null;
		}
	};

	const updateUser = (userData) => {
		setUser((prev) => ({ ...prev, ...userData }));
		setIsLoading(false);
	};

	const login = async (credentials: {
		userId: string;
		password: string;
		role: "STUDENT" | "ADVISOR";
	}) => {
		try {
			const res = await axios.post<unknown, { result: LoginResponse }>(
				`${API_URL}auth/login`,
				{
					userId: credentials.userId,
					password: credentials.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(res);
			if (res.status === 200) {
				// Store tokens in localStorage and state
				const accessTokenWithBearer = `Bearer ${res.data.result.token}`;
				localStorage.setItem("accessToken", accessTokenWithBearer);
				setAccessToken(accessTokenWithBearer);
				setUser(res.data.result);
			}
			return {
				success: true,
				user: res.data.result,
			};
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.result.message);
				return {
					success: false,
					message: error.response.data.result.message,
				};
			} else {
				toast.error("An unexpected error occurred");
				return {
					success: false,
					message: "An unexpected error occurred",
				};
			}
		}
	};
	const value = {
		user,
		accessToken,
		login,
		isLoading,
		updateUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
