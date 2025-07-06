import CreateAppointmentDialog from "@/components/schedule/components/create-appointment-dialog";
import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { User } from "@/lib/types";
import Image from "next/image";
import React from "react";

const StudentAdvisorItem = ({ advisor }: { advisor: User }) => {
	return (
		<Card className="border-0">
			<div className="flex items-start justify-between space-x-4 px-4">
				<div className="flex gap-3">
					<Image
						src={`${
							advisor.profileImage?.includes("profile-image")
								? "/" + advisor.profileImage
								: advisor.profileImage
						}`}
						width={40}
						height={40}
						alt="profile-image-placeholder"
						className="rounded-full mb-2 w-auto h-auto"
					/>
					<div>
						<CardDescription className="text-gray-500">Advisor</CardDescription>
						<CardAction>{advisor.fullname}</CardAction>
					</div>
				</div>
				<CreateAppointmentDialog advisorFullname={advisor.fullname} />

				{/* <AccordionChevron /> */}
			</div>
		</Card>
	);
};

export default StudentAdvisorItem;
