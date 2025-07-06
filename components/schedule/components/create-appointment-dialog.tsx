"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar as CalendarDialog } from "@/components/ui/calendar";
import { formatDate } from "@/lib/utils";
import { Schedule } from "@/lib/types";

const CreateAppointmentDialog = ({
	advisorFullname,
	rescheduleAppointment,
	schedule,
}: {
	advisorFullname?: string;
	rescheduleAppointment?: boolean;
	schedule?: Schedule;
}) => {
	// schedule
	const [newSchedule, setNewSchedule] = useState<Schedule>({
		date: formatDate(new Date()),
		fromTime: rescheduleAppointment && schedule ? schedule.fromTime : "02:00PM",
		toTime: rescheduleAppointment && schedule ? schedule.toTime : "04:00PM",
		course: "",
		advisor: advisorFullname ? advisorFullname : "",
	});
	useEffect(() => {}, []);
	const [openPopover, setOpenPopover] = React.useState(false);
	const [date, setDate] = useState<Date | undefined>(
		rescheduleAppointment && schedule ? new Date(schedule.date) : undefined
	);

	const handleCreateAppointment = async () => {};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={`${
						rescheduleAppointment
							? "bg-white border border-blue-500 text-blue-500"
							: "bg-slate-600 text-white hover:bg-slate-700 border-2 border-transparent cursor-pointer flex justify-center items-center"
					} ${
						advisorFullname
							? "rounded-xl"
							: rescheduleAppointment
							? ""
							: "rounded-full"
					} ${rescheduleAppointment ? "" : "px-6 py-5"}`}
				>
					{!rescheduleAppointment && <Plus size={64} strokeWidth={3} />}
					<Label>
						{advisorFullname
							? "Schedule appointment"
							: rescheduleAppointment
							? "Reschedule"
							: "Create appointment"}
					</Label>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{rescheduleAppointment
							? `Reschedule Appointment with ${schedule && schedule.advisor}`
							: "Create a new appointment"}
					</DialogTitle>
					<DialogDescription>Fill in all details</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleCreateAppointment} className="space-y-4">
					{!rescheduleAppointment && (
						<>
							<div className="space-y-2">
								<Label htmlFor="course" className="text-white">
									Course
								</Label>
								<Input
									id="course"
									placeholder="Enter the course you have an issue with"
									value={newSchedule.course}
									onChange={(e) =>
										setNewSchedule((prev) => ({
											...prev,
											course: e.target.value,
										}))
									}
									className="placeholder:text-slate-400"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="advisor" className="text-white">
									Advisor
								</Label>
								<Input
									id="advisor"
									placeholder="Enter the name of the advisor"
									value={newSchedule.advisor}
									onChange={(e) =>
										setNewSchedule((prev) => ({
											...prev,
											advisor: e.target.value,
											advisorFullname,
										}))
									}
									className="placeholder:text-slate-400"
									required
								/>
							</div>
						</>
					)}
					<div className="flex flex-col gap-3">
						<Label htmlFor="date-picker" className="px-1">
							Date
						</Label>
						<Popover open={openPopover} onOpenChange={setOpenPopover}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									id="date-picker"
									className="w-32 justify-between font-normal"
								>
									{date ? date.toLocaleDateString() : "Select date"}
									<ChevronDownIcon />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto overflow-hidden p-0"
								align="start"
							>
								<CalendarDialog
									mode="single"
									selected={date}
									captionLayout="dropdown"
									onSelect={(date) => {
										setDate(date);
										setNewSchedule((prev) => ({
											...prev,
											date: formatDate(date),
										}));
										setOpenPopover(false);
									}}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col gap-3">
							<Label htmlFor="time-picker" className="px-1">
								From
							</Label>
							<Input
								type="time"
								id="time-picker"
								step="1"
								// defaultValue="10:30:00"
								value={newSchedule.fromTime}
								onChange={(e) =>
									setNewSchedule((prev) => ({
										...prev,
										fromTime: e.target.value,
									}))
								}
								className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="time-picker" className="px-1">
								To
							</Label>
							<Input
								type="time"
								id="time-picker"
								step="1"
								// defaultValue="10:30:00"
								value={newSchedule.toTime}
								onChange={(e) =>
									setNewSchedule((prev) => ({
										...prev,
										toTime: e.target.value,
									}))
								}
								className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
							/>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-slate-700 hover:bg-slate-800"
					>
						Create
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateAppointmentDialog;
