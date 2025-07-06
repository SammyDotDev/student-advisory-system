import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { User } from "@/lib/types";
import Image from "next/image";
import React from "react";

const AdvisorAdviseeItem = ({ advisee }: { advisee: User }) => {
	return (
		<Card className="border-0">
			<div className="flex items-center justify-between space-x-4 px-4">
				<div className="flex gap-3">
					<Image
						src={`${
							advisee.profileImage?.includes("profile-image")
								? "/" + advisee.profileImage
								: advisee.profileImage
						}`}
						width={40}
						height={40}
						alt="profile-image-placeholder"
						className="rounded-full mb-2 w-auto h-auto"
					/>
					<div>
						<CardDescription className="text-gray-500">Advisee</CardDescription>
						<CardAction>{advisee.fullname}</CardAction>
						<div className="flex gap-2 items-center">
							<CardDescription>{advisee.department}</CardDescription>
							<CardDescription>•</CardDescription>
							<CardDescription>{advisee.level} level</CardDescription>
						</div>
					</div>
				</div>
				{/* matric number */}
				<CardAction className="text-gray-800 font-bold">
					{advisee.matricNumber}
				</CardAction>
			</div>
		</Card>
	);
};

export default AdvisorAdviseeItem;
