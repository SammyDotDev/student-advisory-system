"use client";

import React, { useEffect } from "react";
import Sidebar from "../layout/sidebar";
import AdviserHeader from "../headers/adviser/adviser-header";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import ScheduleItem from "./components/scheduleItem";
import { useSchedule } from "@/context/scheduleContext";
import MobiusLoader from "../loader/mobius-loader";
import ListEmpty from "../general/list-empty";
import { useUser } from "@/context/userContext";

const AdviserAppointments = () => {
	const { fetchApprovedAppointments, isLoading, approvedAppointments } =
		useSchedule();
	const { user } = useUser();

	useEffect(() => {
		fetchApprovedAppointments(user?.code);
	}, [user]);
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
	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={adviserNavItems} userRole="adviser" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdviserHeader />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto py-6">
					{/* adviser page header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-medium text-gray-900">
								All Approved Appointmens
							</h1>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{isLoading ? (
							<MobiusLoader />
						) : approvedAppointments.length === 0 ? (
							<ListEmpty label="No appointments" />
						) : (
							approvedAppointments.map((appointmentItem, index) => {
								return (
									<ScheduleItem
										key={index}
										appointment={appointmentItem}
										isAdviser
									/>
								);
							})
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AdviserAppointments;
