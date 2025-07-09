"use client";

import { userAdvisor } from "@/components/dashboard/adviser-dashboard";
import AdvisorHeader from "@/components/headers/adviser/adviser-header";
import Sidebar from "@/components/layout/sidebar";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import React from "react";
import AdvisorAdviseeItem from "../components/adviser-advisee-item";

export const advisorAdvisees = [
	{
		fullname: "Joyce Obinna",
		matricNumber: "SENG/2020/014",
		department: "Software Engineering",
		level: "400",
		profileImage: "https://randomuser.me/api/portraits/women/11.jpg",
	},
	{
		fullname: "Michael Yusuf",
		matricNumber: "CSC/2021/033",
		department: "Computer Science",
		level: "300",
		profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
	},
	{
		fullname: "Amarachi Okafor",
		matricNumber: "CYB/2022/017",
		department: "Cyber Security",
		level: "200",
		profileImage: "https://randomuser.me/api/portraits/women/26.jpg",
	},
	{
		fullname: "David Suleiman",
		matricNumber: "IT/2019/006",
		department: "Information Technology",
		level: "500",
		profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		fullname: "Nneka Aliyu",
		matricNumber: "MASS/2021/021",
		department: "Mass Communication",
		level: "300",
		profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
	},
	{
		fullname: "Chinedu Eze",
		matricNumber: "COMART/2020/019",
		department: "Communication Art",
		level: "400",
		profileImage: "https://randomuser.me/api/portraits/men/59.jpg",
	},
	{
		fullname: "Fatima Bello",
		matricNumber: "IT/2023/003",
		department: "Information Technology",
		level: "100",
		profileImage: "https://randomuser.me/api/portraits/women/19.jpg",
	},
	{
		fullname: "Emeka Nwosu",
		matricNumber: "CYB/2020/024",
		department: "Cyber Security",
		level: "400",
		profileImage: "https://randomuser.me/api/portraits/men/20.jpg",
	},
	{
		fullname: "Grace Udom",
		matricNumber: "SENG/2022/018",
		department: "Software Engineering",
		level: "200",
		profileImage: "https://randomuser.me/api/portraits/women/37.jpg",
	},
	{
		fullname: "Tunde Iroko",
		matricNumber: "CSC/2021/047",
		department: "Computer Science",
		level: "300",
		profileImage: "https://randomuser.me/api/portraits/men/36.jpg",
	},
];
const AdvisorAdvisees = () => {
	const advisorNavItems = [
		{
			icon: BarChart3,
			label: "Dashboard",
			href: "/dashboard/adviser",
		},
		{
			icon: Users,
			label: "My Advisees",
			href: "/dashboard/adviser/advisees",
			active: true,
		},
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

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={advisorNavItems} userRole="adviser" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdvisorHeader user={userAdvisor} />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					{/* adviser page header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-gray-900">All Advisors</h1>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{advisorAdvisees.map((advisee, index) => {
							return <AdvisorAdviseeItem key={index} advisee={advisee} />;
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

export default AdvisorAdvisees;
