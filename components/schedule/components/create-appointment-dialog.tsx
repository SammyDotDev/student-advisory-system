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
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronsUpDownIcon,
	Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar as CalendarDialog } from "@/components/ui/calendar";
import { cn, formatDate, formatTo12Hour, getDateOnly } from "@/lib/utils";
import { Schedule } from "@/lib/types";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { ApiClient } from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { useSchedule } from "@/context/scheduleContext";

const CreateAppointmentDialog = ({
	adviserFullname,
	rescheduleAppointment,
	schedule,
	filter,
}: {
	adviserFullname?: string;
	rescheduleAppointment?: boolean;
	schedule?: Schedule;
	filter?: "APPROVED" | "PENDING" | "DECLINED" | "COMPLETED";
}) => {
	const appointmentApi = ApiClient();
	const { user } = useUser();
	const { refetchAppointments } = useSchedule();

	// schedule
	const [newSchedule, setNewSchedule] = useState<Schedule>({
		date: formatDate(new Date()),
		fromTime: rescheduleAppointment && schedule ? schedule.fromTime : "",
		toTime: rescheduleAppointment && schedule ? schedule.toTime : "",
		course: "",
		adviser: adviserFullname ? adviserFullname : "",
	});
	useEffect(() => {
		console.log(schedule && schedule.code, "SCHEDULE");
	}, [schedule]);
	const [openPopover, setOpenPopover] = useState(false);
	const [openSearchSelect, setOpenSearchSelect] = useState(false);
	const [searchSelectValue, setSearchSelectValue] = useState("");
	const [date, setDate] = useState<Date | undefined>(
		rescheduleAppointment && schedule ? new Date(schedule.date) : undefined
	);

	const [courses, setCourses] = useState<
		{
			adviser: string;
			courseTitle: string;
			courseCodes: string[];
			coursesCode: string;
		}[]
	>([]);
	const [courseKey, setCourseKey] = useState<string>("");
	const [selectedCourse, setSelectedCourse] = useState<{
		adviser: string;
		courseTitle: string;
		courseCodes: string[];
		coursesCode: string;
	} | null>(null);
	console.log(schedule);
	const fetchCourseFilter = async (val: string) => {
		const res = await appointmentApi.get("/courses/filter", {
			params: {
				key: val,
			},
		});

		console.log(res.data.result, "COURSES RESPONSE");
		const formattedResponse = res.data.result.map((item) => {
			console.log(item, "COURSE IREM");
			return {
				adviser: item.adviserResponse.fullName,
				courseTitle: item.courseResponse.courseTitle,
				courseCodes: item.courseResponse.courseCodes,
				coursesCode: item.courseResponse.code,
			};
		});
		console.log(formattedResponse, "FORMATTED RESPONSE");
		setCourses(formattedResponse);
	};

	const handleCreateAppointment = async (e: React.FormEvent) => {
		e.preventDefault();
		// console.log(selectedCourse,"SELECTED COURSE");
		const coursesCode = courses?.find(
			(course) => course.courseTitle === searchSelectValue
		)?.coursesCode;
		console.log(
			{
				...newSchedule,
				fromTime: formatTo12Hour(newSchedule.fromTime),
				toTime: formatTo12Hour(newSchedule.toTime),
				userCode: user?.code,
				courseCode: coursesCode,
			},
			"APPOINTMENT OBJECT"
		);
		try {
			const res = await appointmentApi.post("/appointments", {
				...newSchedule,
				fromTime: formatTo12Hour(newSchedule.fromTime),
				toTime: formatTo12Hour(newSchedule.toTime),
				userCode: user?.code,
				courseCode: coursesCode,
			});

			if (res.status === 201) {
				toast.success(res.data.result.message);
				refetchAppointments(filter);
				setSearchSelectValue("");
				setNewSchedule({
					date: getDateOnly(new Date()),
					fromTime: "",
					toTime: "",
					course: "",
					adviser: "",
				});
			}
		} catch (error) {
			console.log(error);
		}
		// console.log(newSchedule, "NEW SCHEDULE");
	};
	console.log(filter,"FILTER");
	const handleRescheduleAppointment = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await appointmentApi.put(
				`/appointments/students/reschedule/${schedule?.code}`,
				{
					// ...newSchedule,

					date: newSchedule?.date,
					fromTime: formatTo12Hour(newSchedule.fromTime),
					toTime: formatTo12Hour(newSchedule.toTime),
					userCode: user?.code,
					courseCode: schedule?.courseResponse.code,
				}
			);

			if (res.status === 200) {
				toast.success("Appointment updated successfully");
				refetchAppointments(filter);
				setSearchSelectValue("");
				setNewSchedule({
					date: getDateOnly(new Date()),
					fromTime: "",
					toTime: "",
					course: "",
					adviser: "",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={`${
						rescheduleAppointment
							? "bg-white border border-blue-500 text-blue-500"
							: "bg-slate-600 text-white hover:bg-slate-700 border-2 border-transparent cursor-pointer flex justify-center items-center"
					} ${
						adviserFullname
							? "rounded-xl"
							: rescheduleAppointment
							? ""
							: "rounded-full"
					} ${rescheduleAppointment ? "" : "px-6 py-5"}`}
				>
					{!rescheduleAppointment && <Plus size={64} strokeWidth={3} />}
					<Label>
						{adviserFullname
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
							? `Reschedule Appointment with ${
									schedule && schedule.adviserResponse.fullName
							  }`
							: "Create a new appointment"}
					</DialogTitle>
					<DialogDescription>Fill in all details</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={
						rescheduleAppointment
							? handleRescheduleAppointment
							: handleCreateAppointment
					}
					className="space-y-4"
				>
					{!rescheduleAppointment && (
						<div className="space-y-2">
							<Label htmlFor="adviser" className="text-white">
								Key
							</Label>
							{/* <Input
								id="adviser"
								placeholder="Enter the name of the course, course title or adviser"
								value={newSchedule.adviser}
								onChange={(e) =>
									setNewSchedule((prev) => ({
										...prev,
										adviser: e.target.value,
										adviserFullname,
									}))
								}
								className="placeholder:text-slate-400"
								required
							/> */}
							<Popover
								open={openSearchSelect}
								onOpenChange={setOpenSearchSelect}
							>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={openSearchSelect}
										className="w-full justify-between"
									>
										{searchSelectValue
											? courses.find(
													(course) =>
														course.courseTitle === searchSelectValue ||
														course.courseCodes.includes(searchSelectValue)
											  )?.courseTitle
											: "Search courses, course titles or lecturers..."}
										<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[500px] p-0">
									<Command className="w-full">
										<CommandInput
											placeholder="Search by courses, course titles or lecturers..."
											value={courseKey}
											onValueChange={(val) => {
												setCourseKey(val);
												fetchCourseFilter(val);
											}}
										/>
										<CommandList>
											<CommandEmpty>No courses found.</CommandEmpty>
											<CommandGroup>
												{courses.map((course) => (
													<CommandItem
														key={course.courseTitle}
														value={course.courseTitle}
														onSelect={(currentValue) => {
															console.log(currentValue, "CURRENT SELECT VALUE");
															setSearchSelectValue(
																currentValue === searchSelectValue
																	? ""
																	: currentValue
															);
															setSelectedCourse(
																courses?.find(
																	(course) =>
																		course.courseTitle === searchSelectValue ||
																		course.courseCodes.includes(
																			searchSelectValue
																		)
																) || null
															);
															setOpenSearchSelect(false);
														}}
													>
														<CheckIcon
															className={cn(
																"mr-2 h-4 w-4",
																searchSelectValue === course.adviser ||
																	searchSelectValue === course.courseTitle
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
														<div className="w-full flex flex-col gap-4">
															<div className="flex justify-between items-center">
																<Label className=" flex flex-col items-start">
																	Adviser
																	<Label className="text-gray-500">
																		{course.adviser}
																	</Label>
																</Label>
																<Label className="font-sans flex flex-col items-end">
																	Course
																	<Label className="text-gray-500 justify-start items-start">
																		{course.courseTitle}
																	</Label>
																</Label>
															</div>

															<div className="flex flex-wrap gap-2">
																{course.courseCodes.map((codes, index) => (
																	<Badge
																		key={index}
																		className="px-1 rounded-full font-medium"
																	>
																		{codes}
																	</Badge>
																))}
															</div>
														</div>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
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
									selected={new Date(newSchedule.date)}
									captionLayout="dropdown"
									onSelect={(dateValue) => {
										setDate(dateValue);

										setNewSchedule((prev) => ({
											...prev,
											date: getDateOnly(dateValue),
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
						{rescheduleAppointment ? "Reschedule" : "Create"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateAppointmentDialog;
