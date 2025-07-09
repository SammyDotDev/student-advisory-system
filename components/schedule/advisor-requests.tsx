"use client";

import React from "react";
import AdviserHeader from "../headers/adviser/adviser-header";
import Sidebar from "../layout/sidebar";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import { userAdviser } from "../dashboard/adviser-dashboard";
import AdviserRequestItem from "./components/adviser-request-item";

const AdviserRequests = () => {
	const adviserNavItems = [
		{
			icon: BarChart3,
			label: "Dashboard",
			href: "/dashboard/adviser",
		},
		{
			icon: Users,
			label: "My Advisees",
			href: "/dashboard/adviser/advisees",
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
			active: true,
		},
	];

	const adviserRequests = [
		{
			advisee: "John Smith",
			schedule: {
				date: "2025-03-12",
				fromTime: "09:00AM",
				toTime: "11:00AM",
				course: "Introduction to Special Topics",
				adviser: "John Doe",
				profileImage: "profile-image.png",
			},
		},
		{
			advisee: "David Osei",
			schedule: {
				date: "2025-04-15",
				fromTime: "10:00AM",
				toTime: "11:00AM",
				course: "Human Computer Interaction",
				adviser: "JDr. Susan Blake",
				profileImage: "profile-image.png",
			},
		},
		{
			advisee: "John Smith",
			schedule: {
				date: "2025-03-14",
				fromTime: "10:00AM",
				toTime: "12:00PM",
				course: "Software Design Patterns",
				adviser: "Mr. Kelvin Ross",
				profileImage: "profile-image.png",
			},
		},
		{
			advisee: "Samson Phillips",
			schedule: {
				date: "2025-03-12",
				fromTime: "04:30PM",
				toTime: "06:00PM",
				course: "Digital Storytelling",
				adviser: "Mrs. Carol Finn",
				profileImage: "profile-image.png",
			},
		},
		{
			advisee: "Frank Joel",
			schedule: {
				date: "2025-03-13",
				fromTime: "08:00AM",
				toTime: "09:30AM",
				course: "Journalism Ethics",
				adviser: "Ms. Daniella Okoro",
				profileImage: "profile-image.png",
			},
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={adviserNavItems} userRole="adviser" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdviserHeader user={userAdviser} />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					{/* adviser page header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-gray-900">All Advisers</h1>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{adviserRequests.map((appointment, index) => {
							return (
								<AdviserRequestItem key={index} appointment={appointment} />
							);
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

export default AdviserRequests;
