import { Label } from "@/components/ui/label";
import { Schedule } from "@/lib/types";
import { formatFullDate } from "@/lib/utils";
import React from "react";
import ScheduleItem from "./scheduleItem";

const ScheduleDateSortedItem = ({
	dates,
}: {
	dates: {
		date: string;
		schedules: Schedule[];
	};
}) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
			<Label>
				
				<span className="text-gray-500">
					{formatFullDate(new Date(dates.date))}
				</span>
			</Label>
			{dates.schedules.map((schedule: Schedule, scheduleIndex: number) => (
				<ScheduleItem key={scheduleIndex} schedule={schedule} />
			))}
		</div>
	);
};

export default ScheduleDateSortedItem;
