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
import {
	Users,
	Calendar,
	//   MessageSquare,
	TrendingUp,
	//   BookOpen,
	Clock,
	AlertCircle,
	BarChart3,
	//   FileText,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { User } from "@/lib/types";
import AdvisorHeader from "../headers/advisor/advisor-header";

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
	//   { icon: MessageSquare, label: "Messages", href: "/dashboard/advisor/messages" },
	//   { icon: FileText, label: "Reports", href: "/dashboard/advisor/reports" },
	//   { icon: BookOpen, label: "Resources", href: "/dashboard/advisor/resources" },
];

export default function AdvisorDashboard() {
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
			date: "2024-10-15",
			type: "Academic Review",
		},
		{
			student: "Sarah Johnson",
			time: "2:00 PM",
			date: "2024-10-15",
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
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
						<Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-green-100">Total Advisees</p>
										<p className="text-3xl font-bold">24</p>
									</div>
									<Users className="h-12 w-12 text-green-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-blue-100">This Week&apos;s Meetings</p>
										<p className="text-3xl font-bold">8</p>
									</div>
									<Calendar className="h-12 w-12 text-blue-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-yellow-100">At-Risk Students</p>
										<p className="text-3xl font-bold">3</p>
									</div>
									<AlertCircle className="h-12 w-12 text-yellow-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-purple-100">Avg. Advisee GPA</p>
										<p className="text-3xl font-bold">3.2</p>
									</div>
									<TrendingUp className="h-12 w-12 text-purple-200" />
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
									{advisees.map((advisee, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div className="flex items-center gap-3">
												<Avatar>
													<AvatarFallback>
														{advisee.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{advisee.name}</p>
													<p className="text-sm text-gray-600">
														{advisee.id} • Level {advisee.level}
													</p>
													<p className="text-sm text-gray-500">
														GPA: {advisee.gpa}
													</p>
												</div>
											</div>
											<div className="text-right">
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
											</div>
										</div>
									))}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
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
									Upcoming Appointments
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
											<div className="flex gap-2">
												<Button size="sm" variant="outline">
													Reschedule
												</Button>
												<Button size="sm">Join</Button>
											</div>
										</div>
									))}
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
								>
									<Calendar className="h-4 w-4 mr-2" />
									Schedule New Meeting
								</Button>
							</CardContent>
						</Card>

						{/* Recent Activities */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									Recent Activities
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentActivities.map((activity, index) => (
										<div
											key={index}
											className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
										>
											<div
												className={`w-2 h-2 rounded-full mt-2 ${
													activity.type === "meeting"
														? "bg-green-500"
														: activity.type === "alert"
														? "bg-red-500"
														: "bg-blue-500"
												}`}
											></div>
											<div className="flex-1">
												<p className="font-medium text-sm">
													{activity.student}
												</p>
												<p className="text-sm text-gray-600">
													{activity.action}
												</p>
												<p className="text-xs text-gray-500">{activity.time}</p>
											</div>
											{activity.type === "alert" && (
												<Button size="sm" variant="outline">
													Review
												</Button>
											)}
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
