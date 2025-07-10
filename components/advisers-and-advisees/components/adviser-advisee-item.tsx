import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { User } from "@/lib/types";
import Image from "next/image";
import React from "react";

const AdviserAdviseeItem = ({ advisee }: { advisee: User }) => {
	return (
		<Card className="border-0 shadow-none rounded-xl p-4 bg-slate-100">
			<div className="flex items-center justify-between space-x-4 px-4">
				<div className="flex gap-3">
					<Image
						src={"/profile-image.png"}
						width={40}
						height={40}
						alt="profile-image-placeholder"
						className="rounded-full mb-2 w-auto h-auto"
					/>
					<div>
						<CardDescription className="text-gray-500">Advisee</CardDescription>
						<CardAction>{advisee.fullName}</CardAction>
						<div className="flex gap-2 items-center">
							<CardDescription>{advisee.department}</CardDescription>
							<CardDescription>•</CardDescription>
							<CardDescription>{advisee.level} level</CardDescription>
						</div>
					</div>
				</div>
				{/* matric number */}
				<CardAction className="text-gray-800 font-bold">
					{advisee.userId}
				</CardAction>
			</div>
		</Card>
	);
};

export default AdviserAdviseeItem;
