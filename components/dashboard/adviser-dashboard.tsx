"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, Clock, BarChart3 } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { AppointmentResponse, User } from "@/lib/types";
import AdviserHeader from "../headers/adviser/adviser-header";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { adviserAdvisees } from "../advisers-and-advisees/advisees/adviser-advisees";
import appointments from "@/app/dashboard/adviser/appointments/page";
import { getDateRelativeToThisWeek, getRoleFromToken } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { useSchedule } from "@/context/scheduleContext";
import MobiusLoader from "../loader/mobius-loader";
import ListEmpty from "../general/list-empty";

export const userAdviser: User = {
	fullname: "Dr.John Doe",
	email: "johndoe@gmail.com",
};

const adviserNavItems = [
	{
		icon: BarChart3,
		label: "Dashboard",
		href: "/dashboard/adviser",
		active: true,
	},
	{ icon: Users, label: "My Advisees", href: "/dashboard/adviser/advisees" },
	{
		icon: Calendar,
		label: "Appointments",
		href: "/dashboard/adviser/appointments",
	},
	{
		icon: Clock,
		label: "Requests",
		href: "/dashboard/adviser/requests",
	},
];

export default function AdviserDashboard() {
	const router = useRouter();
	const { user: currentUser } = useUser();
	const [pendingAdviserRequests, setPendingAdviserRequests] = useState<
		AppointmentResponse[]
	>([]);
	const {
		fetchAdviserStudents,
		adviserStudents,
		fetchPendingAdviserRequests,
		fetchApprovedAppointments,
		isLoading,
		approvedAppointments,
	} = useSchedule();

	const fetchAppointmentsRequests = async () => {
		const requests = await fetchPendingAdviserRequests(currentUser?.code);
		if (requests) {
			setPendingAdviserRequests(requests);
		}
	};
	useEffect(() => {
		fetchAppointmentsRequests();
		fetchAdviserStudents(currentUser?.code);
        fetchApprovedAppointments(currentUser?.code)
		console.log(adviserStudents, "ADVISER STUDENTS");
	}, [currentUser]);

	const upcomingAppointments = [
		{
			student: "John Smith",
			time: "10:00 AM",
			date: "2025-07-07",
			type: "Academic Review",
		},
		{
			student: "Sarah Johnson",
			time: "2:00 PM",
			date: "2025-07-09",
			type: "Course Planning",
		},
		{
			student: "Mike Brown",
			time: "11:00 AM",
			date: "2024-10-16",
			type: "Career Guidance",
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={adviserNavItems} userRole="adviser" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdviserHeader />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto p-6">
					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<Card className="bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0 rounded-3xl">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-100">Total Advisees</p>
										<p className="text-3xl font-bold">
											{adviserStudents.length}
										</p>
									</div>
									<Users className="h-12 w-12 text-gray-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white border-0 rounded-3xl">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-cyan-100">This Week&apos;s Meetings</p>
										<p className="text-3xl font-bold">
											{
												approvedAppointments.filter((item) => {
													return (
														getDateRelativeToThisWeek(item.date) === "this week"
													);
												}).length
											}
										</p>
									</div>
									<Calendar className="h-12 w-12 text-cyan-200" />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Advisee Overview */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									My Advisees
								</CardTitle>
								<CardDescription>
									Recent advisee status and performance
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{isLoading ? (
										<MobiusLoader />
									) : adviserStudents.length === 0 ? (
										<ListEmpty label="No recent " />
									) : (
										(adviserStudents.length > 6
											? adviserStudents.slice(6)
											: adviserStudents
										).map((advisee, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div className="flex items-center gap-3">
													<Avatar>
														<AvatarFallback>
															{advisee.fullName
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-medium">{advisee.fullName}</p>
														<p className="text-sm text-gray-600">
															{advisee.department} • Level {advisee.level}
														</p>
														{/* <p className="text-sm text-gray-500">
														GPA: {advisee.gpa}
													</p> */}
													</div>
												</div>
												{/* <div className="text-right">
												<Badge
													variant={
														advisee.status === "good"
															? "default"
															: advisee.status === "at-risk"
															? "destructive"
															: "secondary"
													}
												>
													{advisee.status.replace("-", " ")}
												</Badge>
												<p className="text-xs text-gray-500 mt-1">
													Last: {advisee.lastMeeting}
												</p>
											</div> */}
											</div>
										))
									)}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
									onClick={() => router.push("/dashboard/adviser/advisees")}
								>
									View All Advisees
								</Button>
							</CardContent>
						</Card>

						{/* Upcoming Appointments */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Calendar className="h-5 w-5" />
									Requests
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{isLoading ? (
										<MobiusLoader />
									) : pendingAdviserRequests.length === 0 ? (
										<ListEmpty label="No pending requests" />
									) : (
										pendingAdviserRequests.map((appointment, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div>
													<p className="font-medium">{appointment.student}</p>
													<p className="text-sm text-gray-600">
														{appointment.courseResponse.courseTitle}
													</p>
													<p className="text-sm text-gray-500">
														{appointment.date} at {appointment.fromTime}
													</p>
												</div>
												<div className="flex items-end justify-end gap-5">
													<Dialog>
														<DialogTrigger asChild>
															<Button className=" bg-red-500 text-white hover:bg-red-400">
																<Label>Decline </Label>
															</Button>
														</DialogTrigger>
														<DialogContent>
															<DialogHeader>
																<DialogTitle>
																	Are you absolutely sure?
																</DialogTitle>
																<DialogDescription>
																	Are you sure you want to decline this request?
																	This action cannot be undone
																</DialogDescription>
															</DialogHeader>
															<div className="ml-auto flex gap-3">
																<Button className="border border-transparent bg-red-500 text-white hover:bg-red-400">
																	<Label>Decline</Label>
																</Button>
															</div>
														</DialogContent>
													</Dialog>

													<Button
														className={
															"bg-slate-800 text-white hover:bg-slate-600"
														}
													>
														<Label>Approve</Label>
													</Button>
												</div>
											</div>
										))
									)}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
									onClick={() => router.push("/dashboard/adviser/appointments")}
								>
									View All Requests
								</Button>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
