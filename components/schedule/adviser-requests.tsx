"use client";

import React, { useEffect } from "react";
import AdviserHeader from "../headers/adviser/adviser-header";
import Sidebar from "../layout/sidebar";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import AdviserRequestItem from "./components/adviser-request-item";
import { useUser } from "@/context/userContext";
import MobiusLoader from "../loader/mobius-loader";
import ListEmpty from "../general/list-empty";
import { useSchedule } from "@/context/scheduleContext";

const AdviserRequests = () => {
	const { isLoading, user: currentUser } = useUser();
	const { fetchPendingAdviserRequests, pendingAdviserRequests } = useSchedule();

	const fetchAppointmentsRequests = async () => {
		const requests = await fetchPendingAdviserRequests(currentUser?.code);
		if (requests) {
			// setPendingAdviserRequests(requests);
		}
	};
	useEffect(() => {
		// console.log(currentUser, "CURRENT USER");
		fetchAppointmentsRequests();
		console.log(pendingAdviserRequests, "PENDING rEQ");
	}, [currentUser]);
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
							<h1 className="text-2xl font-bold text-gray-900">All Advisers</h1>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
						{/* Today's Schedule */}
						{isLoading ? (
							<MobiusLoader />
						) : pendingAdviserRequests.length === 0 ? (
							<ListEmpty label="No pending requests" />
						) : (
							pendingAdviserRequests.map((appointment, index) => {
								return (
									<AdviserRequestItem key={index} appointment={appointment} />
								);
							})
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AdviserRequests;
