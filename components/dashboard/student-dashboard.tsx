"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	BookOpen,
	Calendar,
	Clock,
	GraduationCap,
	Users,
	BarChart3,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import StudentHeader from "../headers/student/student-header";
import { AppointmentResponse } from "@/lib/types";
import { useUser } from "@/context/userContext";
import { useSchedule } from "@/context/scheduleContext";
import MobiusLoader from "../loader/mobius-loader";
import { Label } from "../ui/label";
import ListEmpty from "../general/list-empty";
import { toast } from "sonner";

const studentNavItems = [
	{
		icon: BarChart3,
		label: "Dashboard",
		href: "/dashboard/student",
		active: true,
	},
	{ icon: Calendar, label: "Schedule", href: "/dashboard/student/schedule" },
	{ icon: Users, label: "Advisers", href: "/dashboard/student/advisers" },
];

export default function StudentDashboard() {
	const { user: currentUser } = useUser();
	const { isLoading, fetchAppointments, fetchStudentAdivers, studentAdvisers } =
		useSchedule();
	const [upcomingAppointments, setUpcomingAppointments] = useState<
		AppointmentResponse[]
	>([]);
	const [pendingAppointments, setPendingAppointments] = useState<
		AppointmentResponse[]
	>([]);

	const fetchDoubleAppointments = async () => {
		try {
			// Fetch both appointment types concurrently
			const [approvedData, pendingData] = await Promise.all([
				fetchAppointments("APPROVED", currentUser?.code),
				fetchAppointments("PENDING", currentUser?.code),
			]);

			// Extract the actual appointment arrays from the response
			if (approvedData) {
				setUpcomingAppointments(approvedData);
			}

			if (pendingData) {
				setPendingAppointments(pendingData);
			}
			console.log(pendingData, "PENDING DATA");

			console.log("✅ Both appointment types fetched successfully");
		} catch (error) {
			toast.error("❌ Error fetching appointments");
		}
	};

	useEffect(() => {
		if (currentUser?.code) {
			fetchDoubleAppointments();
			fetchStudentAdivers(currentUser?.code);
		}
	}, [currentUser?.code]);

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={studentNavItems} userRole="student" />

			<div className="flex-1 flex flex-col overflow-hidden m-4">
				{/* Header */}
				<StudentHeader />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
						{/* Academic Stats */}
						<Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-3xl border-0">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-100">Level</p>
										<p className="text-3xl font-bold">{currentUser?.level}</p>
									</div>
									<GraduationCap className="h-12 w-12 text-gray-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-cyan-900 to-cyan-700 text-white rounded-3xl border-0">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-cyan-100">No. of Advisers</p>
										<p className="text-3xl font-bold">
											{studentAdvisers.length}
										</p>
									</div>
									<BookOpen className="h-12 w-12 text-cyan-200" />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Today's Classes */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Calendar className="h-5 w-5" />
									Upcoming Appointments
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{isLoading ? (
										<MobiusLoader />
									) : upcomingAppointments.length === 0 ? (
										<ListEmpty label="No upcoming appointments" />
									) : (
										upcomingAppointments.map((appointment, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div>
													<p className="font-medium">
														{appointment.courseResponse.courseTitle}
													</p>
													<p className="text-sm text-gray-600">
														{appointment.fromTime}
													</p>
													<p className="text-sm text-gray-500">
														{appointment.adviserResponse.adviserOffice} •{" "}
														{appointment.adviserResponse.fullName}
													</p>
												</div>
												<Badge variant="outline">Upcoming</Badge>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>

						{/* pending approvals */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									Pending Approval
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{isLoading ? (
										<MobiusLoader />
									) : pendingAppointments.length === 0 ? (
										<ListEmpty label="No pending appointments" />
									) : (
										pendingAppointments.map((appointment, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div>
													<p className="font-medium">
														{appointment.courseResponse.courseTitle}
													</p>
													<p className="text-sm text-gray-600">
														{appointment.adviserResponse.fullName}
													</p>
													<p className="text-sm text-gray-500">
														{appointment.fromTime}
													</p>
												</div>
												<Badge
													variant={
														appointment.status === "submitted"
															? "default"
															: "destructive"
													}
													className="font-medium"
												>
													{appointment.status.toLowerCase()}
												</Badge>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
