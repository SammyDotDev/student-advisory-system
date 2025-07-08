"use client";

import { BarChart3, Calendar, Users } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

import StudentHeader from "../headers/student/student-header";
import { user } from "../dashboard/student-dashboard";
import ScheduleDateSortedItem from "./components/scheduleDateSortedItem";
import { groupAndSortSchedules } from "@/lib/utils";
import CreateAppointmentDialog from "./components/create-appointment-dialog";

const StudentSchedule = () => {
	const [filterSchedule, setFilterSchedule] = useState<
		"upcoming" | "pending" | "past" | "declined"
	>("upcoming");

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
			active: true,
		},
		{ icon: Users, label: "Advisors", href: "/dashboard/student/advisors" },
	];

	const scheduleTimelines: ("upcoming" | "pending" | "past" | "declined")[] = [
		"upcoming",
		"pending",
		"past",
		"declined",
	];

	const schedules = [
		{
			date: "2025-03-12",
			fromTime: "09:00AM",
			toTime: "11:00AM",
			course: "Introduction to Special Topics",
			advisor: "John Doe",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-13",
			fromTime: "01:00PM",
			toTime: "03:00PM",
			course: "Cybersecurity Principles",
			advisor: "Jane Smith",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-12",
			fromTime: "02:00PM",
			toTime: "04:00PM",
			course: "Mass Media Communication",
			advisor: "Dr. Susan Blake",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-14",
			fromTime: "10:00AM",
			toTime: "12:00PM",
			course: "Software Design Patterns",
			advisor: "Mr. Kelvin Ross",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-15",
			fromTime: "11:30AM",
			toTime: "01:00PM",
			course: "Human-Computer Interaction",
			advisor: "Prof. Linda George",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-12",
			fromTime: "04:30PM",
			toTime: "06:00PM",
			course: "Digital Storytelling",
			advisor: "Mrs. Carol Finn",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-16",
			fromTime: "08:00AM",
			toTime: "10:00AM",
			course: "IT Project Management",
			advisor: "Dr. Isaac Newton",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-11",
			fromTime: "03:00PM",
			toTime: "05:00PM",
			course: "Network Security",
			advisor: "Mr. Alfred Mensah",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-13",
			fromTime: "08:00AM",
			toTime: "09:30AM",
			course: "Journalism Ethics",
			advisor: "Ms. Daniella Okoro",
			profileImage: "profile-image.png",
		},
		{
			date: "2025-03-14",
			fromTime: "02:00PM",
			toTime: "03:30PM",
			course: "Artificial Intelligence Fundamentals",
			advisor: "Dr. Philip Iroegbu",
			profileImage: "profile-image.png",
		},
	];

	const sortedSchedules = groupAndSortSchedules(schedules);

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={studentNavItems} userRole="student" />

			<div className="flex-1 flex flex-col overflow-hidden  m-4">
				{/* Header */}
				<StudentHeader user={user} />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					{/* Schedule page header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
							<div className="flex items-center justify-between mb-6 gap-2">
								{scheduleTimelines.map((timeline, index) => {
									return (
										<Button
											key={index}
											className={`rounded-full border-2 ${
												filterSchedule === timeline && timeline !== "declined"
													? "bg-slate-600 text-white hover:bg-slate-700 border-slate-600"
													: filterSchedule === "declined" &&
													  timeline === "declined"
													? "bg-red-500 text-white border-red-500"
													: timeline === "declined"
													? "border-red-500 text-red-500 bg-white hover:bg-red-300 hover:text-red-500"
													: "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300"
											} cursor-pointer flex justify-center items-center px-4 py-2`}
											onClick={() => setFilterSchedule(timeline)}
										>
											{timeline}
										</Button>
									);
								})}
							</div>
						</div>
						<div>
							<CreateAppointmentDialog />
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{sortedSchedules.map((dates, index) => {
							return <ScheduleDateSortedItem key={index} dates={dates} />;
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

export default StudentSchedule;
