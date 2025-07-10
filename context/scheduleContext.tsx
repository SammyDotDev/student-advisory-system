"use client";

import { ApiClient } from "@/api/api";
import { AppointmentResponse, LoginResponse } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { useUser } from "./userContext";

export const ScheduleContext = createContext<{
	appointments: AppointmentResponse[];
	isLoading: boolean;
	refetchAppointments: (status?: string) => Promise<void>;
	fetchAppointments: (
		status: string,
		userCode?: string
	) => Promise<AppointmentResponse[]>;
	deleteAppointment: (code: string) => Promise<void>;
	fetchStudentAdivers: (code: string) => Promise<void>;
	studentAdvisers: LoginResponse[];
	pendingAdviserRequests: AppointmentResponse[];
	fetchPendingAdviserRequests: (
		userCode?: string
	) => Promise<AppointmentResponse[]>;
	refetchPendingAdviserRequests: (userCode: string) => Promise<void>;
	fetchAdviserStudents: (userCode?: string) => Promise<void>;
	adviserStudents: LoginResponse[];
	approvedAppointments: AppointmentResponse[];
	fetchApprovedAppointments: (
		userCode?: string
	) => Promise<AppointmentResponse[]>;
	refetchApprovedAppointments: (userCode: string) => Promise<void>;
}>({
	appointments: [],
	isLoading: false,
	refetchAppointments: async () => {},
	fetchAppointments: async () => [],
	deleteAppointment: async () => {},
	fetchStudentAdivers: async () => {},
	studentAdvisers: [],
	pendingAdviserRequests: [],
	fetchPendingAdviserRequests: async () => [],
	refetchPendingAdviserRequests: async () => {},
	fetchAdviserStudents: async () => {},
	adviserStudents: [],
	approvedAppointments: [],
	fetchApprovedAppointments: async () => [],
	refetchApprovedAppointments: async () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
	const AuthApi = ApiClient();
	const { user } = useUser();
	const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [studentAdvisers, setStudentAdvisers] = useState<LoginResponse[]>([]);
	const [adviserStudents, setAdviserStudents] = useState<LoginResponse[]>([]);
	const [pendingAdviserRequests, setPendingAdviserRequests] = useState<
		AppointmentResponse[]
	>([]);
	const [approvedAppointments, setApprovedAppointments] = useState<
		AppointmentResponse[]
	>([]);

	const fetchAppointments = async (
		status: string,
		userCode?: string
	): Promise<AppointmentResponse[]> => {
		console.log("🔄 fetchAppointments called with status:", status);
		console.log("👤 User code:", userCode);
		console.log(userCode, "USER");
		// if (!user?.code) {
		// 	console.log("❌ No user code available");
		// 	setIsLoading(false);
		// 	return;
		// }

		try {
			setIsLoading(true);
			console.log("🚀 Making API call...");

			const res = await AuthApi.get<{
				result: AppointmentResponse[];
			}>(`/appointments/students/${!user ? userCode : user?.code}`, {
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
			return newAppointments;
		} catch (error) {
			console.error("❌ Error fetching appointments:", error);
			return [];
		} finally {
			setIsLoading(false);
			console.log("✅ Loading state set to false");
		}
	};

	const deleteAppointment = async (code: string) => {
		try {
			setIsLoading(true);
			console.log("🚀 Making API call...");
			console.log(code, "DELETE CODE");
			const res = await AuthApi.del(`/appointments/${code}`, {});

			console.log("✅ API Response received:", res.data, "appointments");
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

	// get student advisers
	const fetchStudentAdivers = async (code: string) => {
		try {
			setIsLoading(true);
			console.log("🚀 Making API call...");

			const res = await AuthApi.get<{ result: LoginResponse[] }>(
				`/users/student-advisers/${code}`
			);

			console.log("✅ API Response received:", res.data, "advisers");
			console.log("📋 Advisers data:", res.data.result);
			setStudentAdvisers([]);
			// Force a fresh state update
			const newStudentAdvisers = [...res.data.result];
			setStudentAdvisers(newStudentAdvisers);

			console.log(
				"🔄 State updated with",
				newStudentAdvisers.length,
				"appointments"
			);
		} catch (error) {
			console.error("❌ Error fetching appointments:", error);
		} finally {
			setIsLoading(false);
		}
	};
	//////////////////////////////////////////ADVISER////////////////////////////////////

	const fetchPendingAdviserRequests = async (userCode: string) => {
		setIsLoading(true);
		try {
			const res = await AuthApi.get(
				`/appointments/advisers/requests/${userCode}`
			);
			console.log(res.data, "PENDING REQUESTS");
			// setPendingAdviserRequests([]);
			// Force a fresh state update
			const newPendingAdviserRequests = [...res.data.result];
			setPendingAdviserRequests(newPendingAdviserRequests);

			console.log(
				"🔄 State updated with",
				newPendingAdviserRequests.length,
				"appointments"
			);
			return newPendingAdviserRequests;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const refetchPendingAdviserRequests = async (userCode: string) => {
		console.log("🔁 REFETCH called with userCode:", userCode);
		console.log("📊 Current appointments count:", appointments.length);

		// Clear current appointments first to force a visual update
		setPendingAdviserRequests([]);
		console.log("🧹 Cleared current appointments");

		// Fetch fresh data
		await fetchPendingAdviserRequests(userCode);
		console.log("🎯 Refetch completed");
	};

	// get student advisers
	const fetchAdviserStudents = async (code: string) => {
		try {
			setIsLoading(true);
			console.log("🚀 Making API call...");

			const res = await AuthApi.get<{ result: LoginResponse[] }>(
				`/users/adviser-students/${code}`
			);

			console.log("✅ API Response received:", res.data, "advisers");
			console.log("📋 Students data:", res.data.result);
			setAdviserStudents([]);
			// Force a fresh state update
			const newAdviserStudents = [...res.data.result];
			setAdviserStudents(newAdviserStudents);

			console.log(
				"🔄 State updated with",
				newAdviserStudents.length,
				"appointments"
			);
		} catch (error) {
			console.error("❌ Error fetching appointments:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchApprovedAppointments = async (userCode: string) => {
		setIsLoading(true);
		try {
			const res = await AuthApi.get(
				`/appointments/advisers/approved/${userCode}`
			);
			console.log(res.data, "Approved REQUESTS");
			// setApprovedAppointments([]);
			// Force a fresh state update
			const newApprovedAppointments = [...res.data.result];
			setApprovedAppointments(newApprovedAppointments);

			console.log(
				"🔄 State updated with",
				newApprovedAppointments.length,
				"approved appointments"
			);
			return newApprovedAppointments;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const refetchApprovedAppointments = async (userCode: string) => {
		console.log("🔁 REFETCH called with userCode:", userCode);
		console.log("📊 Current appointments count:", appointments.length);

		// Clear current appointments first to force a visual update
		setApprovedAppointments([]);
		console.log("🧹 Cleared current appointments");

		// Fetch fresh data
		await fetchApprovedAppointments(userCode);
		console.log("🎯 Refetch completed");
	};

	const value = {
		appointments,
		isLoading,
		refetchAppointments,
		fetchAppointments,
		deleteAppointment,
		fetchStudentAdivers,
		studentAdvisers,
		pendingAdviserRequests,
		fetchPendingAdviserRequests,
		refetchPendingAdviserRequests,
		fetchAdviserStudents,
		adviserStudents,
		fetchApprovedAppointments,
		refetchApprovedAppointments,
		approvedAppointments,
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
