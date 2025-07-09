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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Users,
	GraduationCap,
	BookOpen,
	TrendingUp,
	Bell,
	Settings,
	UserPlus,
	FileText,
	BarChart3,
	Shield,
	Database,
	Activity,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";

const adminNavItems = [
	{
		icon: BarChart3,
		label: "Dashboard",
		href: "/dashboard/admin",
		active: true,
	},
	{ icon: Users, label: "User Management", href: "/dashboard/admin/users" },
	{
		icon: GraduationCap,
		label: "Academic Management",
		href: "/dashboard/admin/academic",
	},
	{
		icon: BookOpen,
		label: "Course Management",
		href: "/dashboard/admin/courses",
	},
	{
		icon: FileText,
		label: "Reports & Analytics",
		href: "/dashboard/admin/reports",
	},
	{ icon: Shield, label: "System Security", href: "/dashboard/admin/security" },
	{ icon: Database, label: "Data Management", href: "/dashboard/admin/data" },
];

export default function AdminDashboard() {
	const systemStats = [
		{ label: "Total Students", value: "2,847", change: "+12%", trend: "up" },
		{ label: "Active Advisers", value: "156", change: "+3%", trend: "up" },
		{ label: "Total Courses", value: "342", change: "+8%", trend: "up" },
		{ label: "System Uptime", value: "99.9%", change: "0%", trend: "stable" },
	];

	const recentActivities = [
		{
			type: "user",
			action: "New student registration",
			user: "John Doe",
			time: "5 minutes ago",
		},
		{
			type: "system",
			action: "Database backup completed",
			user: "System",
			time: "1 hour ago",
		},
		{
			type: "course",
			action: "New course added: Advanced Physics",
			user: "Dr. Smith",
			time: "2 hours ago",
		},
		{
			type: "alert",
			action: "High server load detected",
			user: "System Monitor",
			time: "3 hours ago",
		},
	];

	const pendingApprovals = [
		{
			type: "Course",
			title: "Introduction to AI",
			requestedBy: "Dr. Johnson",
			date: "2024-10-10",
		},
		{
			type: "User",
			title: "New Adviser Account",
			requestedBy: "Prof. Williams",
			date: "2024-10-09",
		},
		{
			type: "Schedule",
			title: "Room Change Request",
			requestedBy: "Academic Office",
			date: "2024-10-08",
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={adminNavItems} userRole="admin" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white shadow-sm border-b px-6 py-4">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								System Administration
							</h1>
							<p className="text-gray-600">Welcome back, Administrator</p>
						</div>
						<div className="flex items-center space-x-4">
							<Button variant="ghost" size="sm">
								<Bell className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="sm">
								<Settings className="h-5 w-5" />
							</Button>
							<Avatar>
								<AvatarImage src="/placeholder.svg" />
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto p-6">
					{/* System Stats */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
						{systemStats.map((stat, index) => (
							<Card
								key={index}
								className="bg-gradient-to-r from-purple-600 to-purple-700 text-white"
							>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-purple-100">{stat.label}</p>
											<p className="text-3xl font-bold">{stat.value}</p>
											<p className="text-sm text-purple-200">
												{stat.change} from last month
											</p>
										</div>
										<TrendingUp className="h-12 w-12 text-purple-200" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5" />
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button
									className="w-full justify-start bg-transparent"
									variant="outline"
								>
									<UserPlus className="h-4 w-4 mr-2" />
									Add New User
								</Button>
								<Button
									className="w-full justify-start bg-transparent"
									variant="outline"
								>
									<BookOpen className="h-4 w-4 mr-2" />
									Create Course
								</Button>
								<Button
									className="w-full justify-start bg-transparent"
									variant="outline"
								>
									<FileText className="h-4 w-4 mr-2" />
									Generate Report
								</Button>
								<Button
									className="w-full justify-start bg-transparent"
									variant="outline"
								>
									<Database className="h-4 w-4 mr-2" />
									Backup System
								</Button>
							</CardContent>
						</Card>

						{/* Pending Approvals */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Bell className="h-5 w-5" />
									Pending Approvals
								</CardTitle>
								<CardDescription>
									Items requiring your attention
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{pendingApprovals.map((item, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium text-sm">{item.title}</p>
												<p className="text-xs text-gray-600">
													{item.type} • {item.requestedBy}
												</p>
												<p className="text-xs text-gray-500">{item.date}</p>
											</div>
											<div className="flex gap-1">
												<Button size="sm" variant="outline">
													Deny
												</Button>
												<Button size="sm">Approve</Button>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* System Health */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Activity className="h-5 w-5" />
									System Health
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-sm">Database</span>
										<Badge variant="default">Healthy</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">API Services</span>
										<Badge variant="default">Operational</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">File Storage</span>
										<Badge variant="secondary">Warning</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">Email Service</span>
										<Badge variant="default">Healthy</Badge>
									</div>
								</div>
								<Button
									className="w-full mt-4 bg-transparent"
									variant="outline"
								>
									View Detailed Status
								</Button>
							</CardContent>
						</Card>

						{/* Recent System Activities */}
						<Card className="lg:col-span-3">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Activity className="h-5 w-5" />
									Recent System Activities
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
													activity.type === "user"
														? "bg-blue-500"
														: activity.type === "system"
														? "bg-green-500"
														: activity.type === "course"
														? "bg-purple-500"
														: "bg-red-500"
												}`}
											></div>
											<div className="flex-1">
												<p className="font-medium text-sm">{activity.action}</p>
												<p className="text-sm text-gray-600">
													by {activity.user}
												</p>
												<p className="text-xs text-gray-500">{activity.time}</p>
											</div>
											<Badge variant="outline" className="text-xs capitalize">
												{activity.type}
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
