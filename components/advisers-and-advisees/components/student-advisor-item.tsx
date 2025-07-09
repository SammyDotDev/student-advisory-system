import CreateAppointmentDialog from "@/components/schedule/components/create-appointment-dialog";
import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { User } from "@/lib/types";
import Image from "next/image";
import React from "react";

const StudentAdvisorItem = ({ adviser }: { adviser: User }) => {
	return (
		<Card className="border-0 shadow-none rounded-xl p-4 bg-slate-100">
			<div className="flex items-start justify-between space-x-4 px-4">
				<div className="flex gap-3">
					<Image
						src={`${
							adviser.profileImage?.includes("profile-image")
								? "/" + adviser.profileImage
								: adviser.profileImage
						}`}
						width={40}
						height={40}
						alt="profile-image-placeholder"
						className="rounded-full mb-2 w-auto h-auto"
					/>
					<div>
						<CardDescription className="text-gray-500">Advisor</CardDescription>
						<CardAction>{adviser.fullname}</CardAction>
					</div>
				</div>
				<CreateAppointmentDialog advisorFullname={adviser.fullname} />

				{/* <AccordionChevron /> */}
			</div>
		</Card>
	);
};

export default StudentAdvisorItem;
