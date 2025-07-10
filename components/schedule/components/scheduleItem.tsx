import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CardAction, CardDescription } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AppointmentResponse } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import CreateAppointmentDialog from "./create-appointment-dialog";
import { useSchedule } from "@/context/scheduleContext";

const ScheduleItem = ({
	appointment,
	isAdviser,
	filter,
}: {
	appointment: AppointmentResponse;
	isAdviser?: boolean;
	filter?: "APPROVED" | "PENDING" | "DECLINED" | "COMPLETED";
}) => {
	const [openAccordionTrigger, setOpenAccordionTrigger] =
		useState<boolean>(false);

	const { deleteAppointment, refetchAppointments } = useSchedule();
	return (
		<Accordion
			collapsible={true}
			type="single"
			className={`border rounded-xl p-4 bg-slate-100 ${
				openAccordionTrigger
					? "border-slate-500"
					: isAdviser && openAccordionTrigger
					? "border-slate-900"
					: "border-transparent"
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
								<CardAction>{appointment.fromTime}</CardAction>
							</div>
							<div>
								<CardDescription className="text-gray-500">To</CardDescription>
								<CardAction>{appointment.toTime}</CardAction>
							</div>
						</div>
					</div>
					{/* lecture */}
					<div>
						<div>
							<CardDescription className="text-gray-500">
								Course
							</CardDescription>
							<CardAction>{appointment.courseResponse.courseTitle}</CardAction>
						</div>
					</div>
					{/* adviser */}
					<div className="flex items-start justify-between space-x-4">
						<div className="flex gap-3">
							<Image
								src={"/profile-image.png"}
								width={40}
								height={40}
								alt="profile-image-placeholder"
								className="rounded-full mb-2"
							/>
							<div>
								<CardDescription className="text-gray-500">
									{isAdviser ? "Advisee" : "Adviser"}
								</CardDescription>
								<CardAction>{appointment.adviserResponse.fullName}</CardAction>
							</div>
						</div>
						{!isAdviser && (
							<AccordionTrigger className="flex items-start justify-start p-0 text-slate-900 ml-auto">
								<Label>
									Show
									{openAccordionTrigger ? "  Less" : " More"}
								</Label>
							</AccordionTrigger>
						)}
						{/* <AccordionChevron /> */}
					</div>
				</div>
				{!isAdviser && (
					<AccordionContent className="mt-7">
						<div className="flex items-end justify-end gap-5">
							<Dialog>
								<DialogTrigger asChild>
									<Button className="bg-white border border-red-500 text-red-500">
										<Label>{isAdviser ? "Decline" : "Delete"}</Label>
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Are you absolutely sure?</DialogTitle>
										<DialogDescription>
											{isAdviser
												? "Are you sure you want to decline this request? This action cannot be undone"
												: "This action cannot be undone. This will permanently delete your schedule."}
										</DialogDescription>
									</DialogHeader>
									<div className="ml-auto flex gap-3">
										<Button
											className="border border-transparent bg-red-500 text-white hover:bg-red-300"
											onClick={() => {
												console.log(filter, "DELETE FILTER");
												deleteAppointment(appointment.code);
												refetchAppointments(filter);
											}}
										>
											<Label>{isAdviser ? "Decline" : "Delete"}</Label>
										</Button>
									</div>
								</DialogContent>
							</Dialog>
							{isAdviser ? (
								<Button
									className={"bg-white border border-blue-500 text-blue-500"}
								>
									<Label>{"Approve"}</Label>
								</Button>
							) : (
								<CreateAppointmentDialog
									schedule={appointment}
									rescheduleAppointment
									filter={filter}
								/>
							)}
						</div>
					</AccordionContent>
				)}
			</AccordionItem>
		</Accordion>
	);
};

export default ScheduleItem;
