"use client";

import { ApiClient } from "@/api/api";
import { AppointmentResponse } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

export const ScheduleContext = createContext<{
	appointments: AppointmentResponse[];
	isLoading: boolean;
	refetchAppointments: (status: string) => void;
	fetchAppointments: (status: string) => void;
}>({
	appointments: [],
	isLoading: false,
	refetchAppointments: () => {},
	fetchAppointments: () => {},
});

export function ScheduleProvider({ children }) {
	const AuthApi = ApiClient();
	const { user } = useUser();
	const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchAppointments = async (status: string) => {
		console.log("🔄 fetchAppointments called with status:", status);
		console.log("👤 User code:", user?.code);

		if (!user?.code) {
			console.log("❌ No user code available");
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			console.log("🚀 Making API call...");

			const res = await AuthApi.get(`/appointments/students/${user.code}`, {
				params: {
					status,
				},
			});

			console.log(
				"✅ API Response received:",
				res.data.result.length,
				"appointments"
			);
			console.log("📋 Appointments data:", res.data.result);

			// Force a fresh state update
			const newAppointments = [...res.data.result];
			setAppointments(newAppointments);

			console.log(
				"🔄 State updated with",
				newAppointments.length,
				"appointments"
			);
		} catch (error) {
			console.error("❌ Error fetching appointments:", error);
		} finally {
			setIsLoading(false);
			console.log("✅ Loading state set to false");
		}
	};
	// useEffect(() => {
	// 	fetchAppointments();
	// }, []);

	const refetchAppointments = async (status: string) => {
		console.log("🔁 REFETCH called with status:", status);
		console.log("📊 Current appointments count:", appointments.length);

		// Clear current appointments first to force a visual update
		setAppointments([]);
		console.log("🧹 Cleared current appointments");

		// Fetch fresh data
		await fetchAppointments(status);
		console.log("🎯 Refetch completed");
	};

	const value = {
		appointments,
		isLoading,
		refetchAppointments,
		fetchAppointments,
	};

	return (
		<ScheduleContext.Provider value={value}>
			{children}
		</ScheduleContext.Provider>
	);
}

export function useSchedule() {
	const context = useContext(ScheduleContext);
	if (!context) {
		throw new Error("useSchedule must be used within ScheduleProvider");
	}
	return context;
}
