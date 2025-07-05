import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Schedule } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function sortSchedulesByDateDescending(schedules: Schedule[]) {
	// console.log(schedules)
	return schedules.sort((a, b) => {
		console.log(new Date(b.date).getTime() - new Date(a.date).getTime());
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
export function groupAndSortSchedules(schedules: Schedule[]) {
	const grouped = {};

	schedules.forEach((schedule) => {
		if (!grouped[schedule.date]) {
			grouped[schedule.date] = [];
		}
		grouped[schedule.date].push(schedule);
	});

	return Object.keys(grouped)
		.sort() // Sort dates ascending (chronologically)
		.map((date) => ({
			date,
			schedules: grouped[date],
		}));
}
export const formatFullDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	// e.g., "May 10, 2025"
	const formatted = date.toLocaleDateString("en-US", options);

	// Convert to "May, 10 2025"
	const [monthDay, year] = formatted.split(", ");
	const [month, day] = monthDay.split(" ");
	return `${month}, ${day} ${year}`;
};
