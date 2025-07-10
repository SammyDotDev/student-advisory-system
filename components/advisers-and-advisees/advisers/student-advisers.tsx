"use client";

import StudentHeader from "@/components/headers/student/student-header";
import Sidebar from "@/components/layout/sidebar";
import { BarChart3, Calendar, Users } from "lucide-react";
import React, { useEffect } from "react";
import StudentAdviserItem from "../components/student-adviser-item";
import { user } from "@/components/dashboard/student-dashboard";
import { useSchedule } from "@/context/scheduleContext";
import MobiusLoader from "@/components/loader/mobius-loader";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/userContext";
import ListEmpty from "@/components/general/list-empty";

const StudentAdvisers = () => {
	const { fetchStudentAdivers, studentAdvisers, isLoading } = useSchedule();
	const { user } = useUser();
	useEffect(() => {
		fetchStudentAdivers(user?.code);
	}, [user]);
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
			label: "Advisers",
			href: "/dashboard/student/advisers",
			active: true,
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={studentNavItems} userRole="student" />

			<div className="flex-1 flex flex-col overflow-hidden  m-4">
				{/* Header */}
				<StudentHeader />

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
						{isLoading ? (
							<MobiusLoader />
						) : studentAdvisers.length === 0 ? (
							<ListEmpty label="You have not interacted with any advisers" />
						) : (
							studentAdvisers.map((adviser, index) => {
								return <StudentAdviserItem key={index} adviser={adviser} />;
							})
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default StudentAdvisers;
