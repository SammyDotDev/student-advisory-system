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

export function getGreeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour < 12) {
		return "Good morning";
	} else if (currentHour < 17) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}
export const emailRegex = RegExp(
	"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);
export const formatDate = (date: Date) => {
	return date.toISOString().split("T")[0];
};
export function getDateRelativeToThisWeek(
	inputDateStr: string
): "past" | "this week" | "next week" | "not upcoming soon" {
	const inputDate = new Date(inputDateStr);
	const today = new Date();

	// Strip time for consistent comparison
	inputDate.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);

	// Past check
	if (inputDate < today) return "past";

	// Get Sunday of current week
	const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
	const sundayThisWeek = new Date(today);
	sundayThisWeek.setDate(today.getDate() - dayOfWeek);

	const saturdayThisWeek = new Date(sundayThisWeek);
	saturdayThisWeek.setDate(sundayThisWeek.getDate() + 6);

	// Next week range
	const sundayNextWeek = new Date(sundayThisWeek);
	sundayNextWeek.setDate(sundayThisWeek.getDate() + 7);
	const saturdayNextWeek = new Date(saturdayThisWeek);
	saturdayNextWeek.setDate(saturdayThisWeek.getDate() + 7);

	if (inputDate >= sundayThisWeek && inputDate <= saturdayThisWeek) {
		return "this week";
	}

	if (inputDate >= sundayNextWeek && inputDate <= saturdayNextWeek) {
		return "next week";
	}

	return "not upcoming soon";
}
