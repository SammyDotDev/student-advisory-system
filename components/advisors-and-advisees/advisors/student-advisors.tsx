"use client";

import StudentHeader from "@/components/headers/student/student-header";
import Sidebar from "@/components/layout/sidebar";
import { BarChart3, Calendar, Users } from "lucide-react";
import React from "react";
import StudentAdvisorItem from "../components/student-advisor-item";
import { user } from "@/components/dashboard/student-dashboard";

const StudentAdvisors = () => {
	const studentNavItems = [
		{
			icon: BarChart3,
			label: "Dashboard",
			href: "/dashboard/student",
		},
		{
			icon: Calendar,
			label: "Schedule",
			href: "/dashboard/student/schedule",
		},
		{
			icon: Users,
			label: "Advisors",
			href: "/dashboard/student/advisors",
			active: true,
		},
	];

	const studentAdvisors = [
		{
			fullname: "Dr. Angela Martins",
			profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
			email: "amartins@college.edu",
		},
		{
			fullname: "Prof. Samuel Osei",
			profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
			email: "sosei@college.edu",
		},
		{
			fullname: "Dr. Clara Nwankwo",
			profileImage: "https://randomuser.me/api/portraits/women/34.jpg",
			email: "cnwankwo@college.edu",
		},
		{
			fullname: "Mr. Benjamin Adedeji",
			profileImage: "https://randomuser.me/api/portraits/men/38.jpg",
			email: "badedeji@college.edu",
		},
		{
			fullname: "Dr. Halima Yusuf",
			profileImage: "https://randomuser.me/api/portraits/women/42.jpg",
			email: "hyusuf@college.edu",
		},
		{
			fullname: "Mrs. Irene Okoro",
			profileImage: "https://randomuser.me/api/portraits/women/51.jpg",
			email: "iokoro@college.edu",
		},
		{
			fullname: "Mr. Daniel Ekene",
			profileImage: "https://randomuser.me/api/portraits/men/29.jpg",
			email: "dekene@college.edu",
		},
		{
			fullname: "Prof. Fatima Bello",
			profileImage: "https://randomuser.me/api/portraits/women/55.jpg",
			email: "fbello@college.edu",
		},
		{
			fullname: "Dr. Peter Mensah",
			profileImage: "https://randomuser.me/api/portraits/men/60.jpg",
			email: "pmensah@college.edu",
		},
		{
			fullname: "Mrs. Chidinma Uche",
			profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
			email: "cuche@college.edu",
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={studentNavItems} userRole="student" />

			<div className="flex-1 flex flex-col overflow-hidden  m-4">
				{/* Header */}
				<StudentHeader user={user} />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					{/* advisor page header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-gray-900">All Advisors</h1>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{studentAdvisors.map((advisor, index) => {
							return <StudentAdvisorItem key={index} advisor={advisor} />;
						})}

						{/* Assignments */}

						{/* Course Progress */}

						{/* Announcements */}
					</div>
				</main>
			</div>
		</div>
	);
};

export default StudentAdvisors;
