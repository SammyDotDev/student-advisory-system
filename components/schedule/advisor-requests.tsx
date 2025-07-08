import React from "react";
import AdvisorHeader from "../headers/advisor/advisor-header";
import Sidebar from "../layout/sidebar";
import { BarChart3, Calendar, Clock, Users } from "lucide-react";

const AdvisorRequests = () => {
	const advisorNavItems = [
		{
			icon: BarChart3,
			label: "Dashboard",
			href: "/dashboard/advisor",
		},
		{
			icon: Users,
			label: "My Advisees",
			href: "/dashboard/advisor/advisees",
			active: true,
		},
		{
			icon: Calendar,
			label: "Appointments",
			href: "/dashboard/advisor/appointments",
		},
		{
			icon: Clock,
			label: "Requests",
			href: "/dashboard/advisor/requests",
		},
	];

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar navItems={advisorNavItems} userRole="advisor" />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<AdvisorHeader user={userAdvisor} />

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

export default AdvisorRequests;
