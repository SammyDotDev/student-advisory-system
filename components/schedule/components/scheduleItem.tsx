import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CardAction, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Schedule } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";

const ScheduleItem = ({ schedule }: { schedule: Schedule }) => {
	const [openAccordionTrigger, setOpenAccordionTrigger] =
		useState<boolean>(false);

	return (
		<Accordion
			collapsible={true}
			type="single"
			className={`border rounded-xl p-4 ${
				openAccordionTrigger ? "border-blue-500" : "border-gray-300"
			}`}
			value={openAccordionTrigger ? "item-1" : ""}
			onValueChange={(value) => setOpenAccordionTrigger(value === "item-1")}
		>
			<AccordionItem value="item-1">
				{/* <CardHeader></CardHeader> */}
				<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
					{/* timeframe */}
					<div className="flex flex-col space-y-4">
						<div className="flex gap-8">
							<div>
								<CardDescription className="text-gray-500">
									From
								</CardDescription>
								<CardAction>{schedule.fromTime}</CardAction>
							</div>
							<div>
								<CardDescription className="text-gray-500">To</CardDescription>
								<CardAction>{schedule.toTime}</CardAction>
							</div>
						</div>
					</div>
					{/* lecture */}
					<div>
						<div>
							<CardDescription className="text-gray-500">
								Course
							</CardDescription>
							<CardAction>{schedule.course}</CardAction>
						</div>
					</div>
					{/* advisor */}
					<div className="flex items-start justify-between space-x-4">
						<div className="flex gap-3">
							<Image
								src={`/${schedule.profileImage}`}
								width={40}
								height={40}
								alt="profile-image-placeholder"
								className="rounded-full mb-2"
							/>
							<div>
								<CardDescription className="text-gray-500">
									Advisor
								</CardDescription>
								<CardAction>{schedule.advisor}</CardAction>
							</div>
						</div>
						<AccordionTrigger className="flex items-start justify-start p-0 text-blue-500 ml-auto">
							<Label>
								Show
								{openAccordionTrigger ? "  Less" : " More"}
							</Label>
						</AccordionTrigger>
						{/* <AccordionChevron /> */}
					</div>
				</div>
				<AccordionContent className="mt-7">
					<div className="flex items-end justify-end gap-5">
						<Button className="bg-white border border-red-500 text-red-500">
							<Label>Cancel</Label>
						</Button>
						<Button className="bg-white border border-blue-500 text-blue-500">
							<Label>Reschedule</Label>
						</Button>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ScheduleItem;
