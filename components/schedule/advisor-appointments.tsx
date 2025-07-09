"use client";

import React from "react";
import Sidebar from "../layout/sidebar";
import AdviserHeader from "../headers/adviser/adviser-header";
import { userAdviser } from "../dashboard/adviser-dashboard";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import ScheduleItem from "./components/scheduleItem";

const AdviserAppointments = () => {
	const adviserNavItems = [
		{
			icon: BarChart3,
			label: "Dashboard",
			href: "/dashboard/adviser",
		},
		{ icon: Users, label: "My Advisees", href: "/dashboard/adviser/advisees" },
		{
			icon: Calendar,
			label: "Appointments",
			href: "/dashboard/adviser/appointments",
			active: true,
		},
		{
			icon: Clock,
			label: "Requests",
			href: "/dashboard/adviser/requests",
		},
	];
	const appointments = [
		{
			advisee: "Joyce Obinna",
			fromTime: "09:00 AM",
			toTime: "10:00 AM",
			date: "2024-10-15",
			course: "Project Supervision",
			profileImage: "https://randomuser.me/api/portraits/women/11.jpg",
		},
		{
			advisee: "Michael Yusuf",
			fromTime: "10:30 AM",
			toTime: "11:30 AM",
			date: "2024-10-15",
			course: "Academic Review",
			profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
		},
		{
			advisee: "Amarachi Okafor",
			fromTime: "12:00 PM",
			toTime: "01:00 PM",
			date: "2024-10-16",
			course: "Internship Planning",
			profileImage: "https://randomuser.me/api/portraits/women/26.jpg",
		},
		{
			advisee: "David Suleiman",
			fromTime: "02:00 PM",
			toTime: "03:00 PM",
			date: "2024-10-16",
			course: "Graduation Clearance",
			profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
		},
		{
			advisee: "Nneka Aliyu",
			fromTime: "11:00 AM",
			toTime: "12:00 PM",
			date: "2024-10-17",
			course: "Course Registration",
			profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
		},
		{
			advisee: "Chinedu Eze",
			fromTime: "01:00 PM",
			toTime: "02:00 PM",
			date: "2024-10-17",
			course: "Academic Probation Review",
			profileImage: "https://randomuser.me/api/portraits/men/59.jpg",
		},
		{
			advisee: "Fatima Bello",
			fromTime: "08:00 AM",
			toTime: "09:00 AM",
			date: "2024-10-18",
			course: "Freshman Orientation",
			profileImage: "https://randomuser.me/api/portraits/women/19.jpg",
		},
		{
			advisee: "Emeka Nwosu",
			fromTime: "03:00 PM",
			toTime: "04:00 PM",
			date: "2024-10-18",
			course: "Security Course Briefing",
			profileImage: "https://randomuser.me/api/portraits/men/20.jpg",
		},
		{
			advisee: "Grace Udom",
			fromTime: "10:00 AM",
			toTime: "11:00 AM",
			date: "2024-10-19",
			course: "Study Plan Assistance",
			profileImage: "https://randomuser.me/api/portraits/women/37.jpg",
		},
		{
			advisee: "Tunde Iroko",
			fromTime: "11:30 AM",
			toTime: "12:30 PM",
			date: "2024-10-19",
			course: "Final Year Project Discussion",
			profileImage: "https://randomuser.me/api/portraits/men/36.jpg",
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
						{appointments.map((appointmentItem, index) => {
							return (
								<ScheduleItem
									key={index}
									schedule={appointmentItem}
									isAdviser
								/>
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

export default AdviserAppointments;
