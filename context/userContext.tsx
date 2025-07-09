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
	isAuthenticated: false,
	logout: () => {},
	updateUser: (userData) => {},
	// refreshToken: () => {},
});

export function UserProvider({ children }) {
	const AuthApi = ApiClient();
	const [user, setUser] = useState<LoginResponse | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	// Check authentication status on app load
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			// Check if we have an access token in localStorage
			const storedToken = localStorage.getItem("accessToken");

			const refreshApi = axios.create({
				baseURL: API_URL,
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true, // This will send the refresh token cookie
			});
			let currentToken = null;
			if (storedToken) {
				console.log("STORED TOKEN ", storedToken);
				setAccessToken(storedToken);
				console.log("STORED TOKEN EXISTS");

				// Remove "Bearer " prefix if it exists for validation
				const cleanToken = storedToken.replace("Bearer ", "");
				console.log(cleanToken, "CLEAN TOKEN");
				// Validate the stored token by checking if it's expired
				if (isTokenValid(cleanToken)) {
					currentToken = cleanToken;
					const tokenPayload = extractUserFromToken(currentToken);
					if (tokenPayload) {
						// Try to get stored full user data
						const storedUserData = getStoredUserData();
						console.log(storedUserData, "STORED USER DATA");
						if (storedUserData) {
							// Use stored full user data
							setUser(storedUserData);
							setIsAuthenticated(true);
							console.log(
								"✅ User authenticated with stored data:",
								storedUserData
							);
						} else {
							// Fallback to token payload if no stored data
							setUser(tokenPayload);
							setIsAuthenticated(true);
							console.log(
								"✅ User authenticated with token payload:",
								tokenPayload
							);
						}
					} else {
						clearAuthState();
					}
					console.log("✅ Stored token is valid");
					currentToken = cleanToken;
					setAccessToken(storedToken); // Keep the "Bearer " format for API calls
				} else {
					console.log("❌ Stored token is expired, removing from localStorage");
					clearAuthState();
					// Token is expired, try to refresh
					currentToken = await refreshToken(refreshApi);
				}
			} else {
				console.log("No stored token, attempting refresh");
				// No stored token, try to refresh using cookie
				currentToken = await refreshToken(refreshApi);
			}
			// if (currentToken) {
			// 	const userData = extractUserFromToken(currentToken);
			// 	if (userData) {
			// 		setUser(userData);
			// 		setIsAuthenticated(true);
			// 		console.log("✅ User authenticated:", userData);
			// 	} else {
			// 		clearAuthState();
			// 	}
			// } else {
			// 	clearAuthState();
			// }
		} catch (error) {
			console.log("Auth check failed:", error.response.data.result);
			toast.error(error.response.data.result.message);
			// Not authenticated - this is fine for public pages
		} finally {
			setIsLoading(false);
		}
	};

	// Clear all auth state
	const clearAuthState = () => {
		setUser(null);
		setAccessToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem("accessToken");
		// Clear cookie
		document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	};

	// Helper function to extract user data from JWT
	const extractUserFromToken = (token) => {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));

			return {
				id: payload.sub,
				roles: payload.roles || [],
				exp: payload.exp,
				iat: payload.iat,
			};
		} catch (error) {
			console.log("Error extracting user from token:", error);
			return null;
		}
	};

	// Helper function to validate JWT token
	const isTokenValid = (token) => {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const currentTime = Date.now() / 1000;

			// Check if token is expired (with 5 minute buffer)
			return payload.exp > currentTime + 300;
		} catch (error) {
			console.log("Token validation error:", error);
			return false;
		}
	};
	const logout = async () => {
		clearAuthState();
		router.push("/auth/login");
	};

	// Store full user data in localStorage
	const storeUserData = (userData) => {
		localStorage.setItem("userData", JSON.stringify(userData));
	};

	// Get full user data from localStorage
	const getStoredUserData = () => {
		try {
			const storedData = localStorage.getItem("userData");
			return storedData ? JSON.parse(storedData) : null;
		} catch (error) {
			console.log("Error parsing stored user data:", error);
			return null;
		}
	};

	const refreshToken = async (refreshApi) => {
		try {
			const refreshResponse = await refreshApi.get("auth/refresh");

			if (refreshResponse.status === 200) {
				const newAccessToken = refreshResponse.data.result.token;
				const tokenWithBearer = `Bearer ${newAccessToken}`;

				// Store in localStorage and set in state
				localStorage.setItem("accessToken", tokenWithBearer);
				setAccessToken(tokenWithBearer);

				console.log("✅ Token refreshed successfully");
				return newAccessToken; // Return clean token for user extraction
			}
		} catch (error) {
			console.log("Token refresh failed:", error);
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
			const res = await axios.post(
				`${API_URL}auth/login`,
				{
					userId: credentials.userId,
					password: credentials.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			console.log(res);

			if (res.status === 200) {
				const { token, ...userData } = res.data.result; // Extract token and user data
				const accessTokenWithBearer = `Bearer ${token}`;
				// Store tokens in localStorage and state
				localStorage.setItem("accessToken", accessTokenWithBearer);
				// Extract and set user data
				// const userData = extractUserFromToken(res.data.result.token);
				console.log("USER FROM TOKEN", userData);
				storeUserData(userData);
				setUser(userData);
				setIsAuthenticated(true);
				setAccessToken(accessTokenWithBearer);
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
		} finally {
			setIsLoading(false);
		}
	};
	const value = {
		user,
		accessToken,
		login,
		logout,
		isLoading,
		updateUser,
		isAuthenticated,
		clearAuthState,
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
