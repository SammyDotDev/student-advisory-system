"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, Clock, BarChart3 } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { User } from "@/lib/types";
import AdvisorHeader from "../headers/advisor/advisor-header";
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
import { advisorAdvisees } from "../advisors-and-advisees/advisees/advisor-advisees";
import appointments from "@/app/dashboard/advisor/appointments/page";
import { getDateRelativeToThisWeek, getRoleFromToken } from "@/lib/utils";
import { useEffect } from "react";

export const userAdvisor: User = {
	fullname: "Dr.John Doe",
	email: "johndoe@gmail.com",
};

const advisorNavItems = [
	{
		icon: BarChart3,
		label: "Dashboard",
		href: "/dashboard/advisor",
		active: true,
	},
	{ icon: Users, label: "My Advisees", href: "/dashboard/advisor/advisees" },
	{
		icon: Calendar,
		label: "Appointments",
		href: "/dashboard/advisor/appointments",
	},
	{
		icon: Clock,
		label: "Requests",
		href: "/dashboard/advisor/requests",
	},
];

export default function AdvisorDashboard() {
	const router = useRouter();
	const advisees = [
		{
			name: "John Smith",
			id: "ST001",
			level: "200",
			gpa: 3.8,
			status: "good",
			lastMeeting: "2024-09-28",
		},
		{
			name: "Sarah Johnson",
			id: "ST002",
			level: "100",
			gpa: 2.1,
			status: "at-risk",
			lastMeeting: "2024-09-25",
		},
		{
			name: "Mike Brown",
			id: "ST003",
			level: "300",
			gpa: 3.5,
			status: "good",
			lastMeeting: "2024-09-30",
		},
		{
			name: "Lisa Davis",
			id: "ST004",
			level: "200",
			gpa: 2.8,
			status: "needs-attention",
			lastMeeting: "2024-09-20",
		},
	];

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

	const recentActivities = [
		{
			type: "meeting",
			student: "John Smith",
			action: "Completed academic review meeting",
			time: "2 hours ago",
		},
		{
			type: "alert",
			student: "Sarah Johnson",
			action: "GPA dropped below 2.5 threshold",
			time: "1 day ago",
		},
		{
			type: "message",
			student: "Lisa Davis",
			action: "Sent course recommendation",
			time: "2 days ago",
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={advisorNavItems} userRole="advisor" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdvisorHeader user={userAdvisor} />

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
											{advisorAdvisees.length}
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
												upcomingAppointments.filter((item) => {
													console.log(
														item.date,
														getDateRelativeToThisWeek(item.date)
													);
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
									{advisorAdvisees.slice(6).map((advisee, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div className="flex items-center gap-3">
												<Avatar>
													<AvatarFallback>
														{advisee.fullname
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{advisee.fullname}</p>
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
									))}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
									onClick={() => router.push("/dashboard/advisor/advisees")}
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
									{upcomingAppointments.map((appointment, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium">{appointment.student}</p>
												<p className="text-sm text-gray-600">
													{appointment.type}
												</p>
												<p className="text-sm text-gray-500">
													{appointment.date} at {appointment.time}
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
									))}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
									onClick={() => router.push("/dashboard/advisor/appointments")}
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
