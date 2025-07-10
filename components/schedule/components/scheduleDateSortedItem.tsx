import { Label } from "@/components/ui/label";
import { Schedule } from "@/lib/types";
import { formatFullDate } from "@/lib/utils";
import React from "react";
import ScheduleItem from "./scheduleItem";

const ScheduleDateSortedItem = ({
	dates,
	filter,
}: {
	dates: {
		date: string;
		appointments: Schedule[];
	};
	filter: "APPROVED" | "PENDING" | "DECLINED" | "COMPLETED";
}) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
			<Label>
				<span className="text-gray-500">
					{formatFullDate(new Date(dates.date))}
				</span>
			</Label>
			{dates.appointments.map(
				(appointment: Schedule, scheduleIndex: number) => (
					<ScheduleItem
						key={scheduleIndex}
						appointment={appointment}
						filter={filter}
					/>
				)
			)}
		</div>
	);
};

export default ScheduleDateSortedItem;
