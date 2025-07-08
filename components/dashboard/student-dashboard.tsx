"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	BookOpen,
	Calendar,
	Clock,
	GraduationCap,
	TrendingUp,
	Bell,
	FileText,
	Users,
	BarChart3,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import StudentHeader from "../headers/student/student-header";
import { User } from "@/lib/types";

const studentNavItems = [
	{
		icon: BarChart3,
		label: "Dashboard",
		href: "/dashboard/student",
		active: true,
	},
	{ icon: Calendar, label: "Schedule", href: "/dashboard/student/schedule" },
	{ icon: Users, label: "Advisors", href: "/dashboard/student/advisors" },
];

export const user: User = {
	fullname: "John Doe",
	email: "johndoe@gmail.com",
};
export default function StudentDashboard() {
	const [currentTime] = useState(new Date());
	console.log(currentTime);

	const upcomingAppointments = [
		{
			time: "8:00 AM - 9:30 AM",
			courseTitle: "MAT110",
			venue: "ROOM 102",
			lecturer: "Dr. Asiedu",
		},
		{
			time: "10:00 AM - 11:30 AM",
			courseTitle: "CSC101",
			venue: "ICT LAB",
			lecturer: "Prof. Mensah",
		},
		{
			time: "2:00 PM - 3:30 PM",
			courseTitle: "ENG112",
			venue: "ROOM 205",
			lecturer: "Dr. Osei",
		},
	];

	const pendingApproval = [
		{
			lecturer: "Dr. Osei",
			courseTitle: "Calculus Assignment",
			dueDate: "10/10/2024",
			status: "pending",
		},
		{
			lecturer: "Dr. John",
			courseTitle: "Programming Project",
			dueDate: "12/10/2024",
			status: "submitted",
		},
		{
			lecturer: "Prof. Sam",
			courseTitle: "Essay Writing",
			dueDate: "15/10/2024",
			status: "pending",
		},
	];

	const announcements = [
		{ title: "Welcome Back to School", type: "general", date: "2024-10-01" },
		{ title: "Registration Deadline", type: "important", date: "2024-10-05" },
		{ title: "Mid-term Exams Schedule", type: "academic", date: "2024-10-08" },
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={studentNavItems} userRole="student" />

			<div className="flex-1 flex flex-col overflow-hidden m-4">
				{/* Header */}
				<StudentHeader user={user} />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
						{/* Academic Stats */}
						<Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-3xl border-0">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-100">Level</p>
										<p className="text-3xl font-bold">100</p>
									</div>
									<GraduationCap className="h-12 w-12 text-gray-200" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-r from-cyan-900 to-cyan-700 text-white rounded-3xl border-0">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-cyan-100">Courses/Units</p>
										<p className="text-3xl font-bold">10/24</p>
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
									{upcomingAppointments.map((class_, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium">{class_.courseTitle}</p>
												<p className="text-sm text-gray-600">{class_.time}</p>
												<p className="text-sm text-gray-500">
													{class_.venue} • {class_.lecturer}
												</p>
											</div>
											<Badge variant="outline">Upcoming</Badge>
										</div>
									))}
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
									{pendingApproval.map((assignment, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium">{assignment.courseTitle}</p>
												<p className="text-sm text-gray-600">
													{assignment.lecturer}
												</p>
												<p className="text-sm text-gray-500">
													{assignment.dueDate}
												</p>
											</div>
											<Badge
												variant={
													assignment.status === "submitted"
														? "default"
														: "destructive"
												}
											>
												{assignment.status}
											</Badge>
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
