import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Schedule } from "./types";

export const PASSWORD_MISMATCH = "Passwords do not match";
export const INCORRECT_PASSWORD = "Incorrect Password";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function isEmptyString(text: string) {
	return text === "";
}
export function sortSchedulesByDateDescending(schedules: Schedule[]) {
	// console.log(schedules)
	return schedules.sort((a, b) => {
		console.log(new Date(b.date).getTime() - new Date(a.date).getTime());
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
export function groupAndSortSchedules(schedules: Schedule[]) {
	const grouped: {
		[date: string]: Schedule[];
	} = {};

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

export function getRoleFromToken(): string | null {
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

	if (!token) return null;

	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.role;
	} catch {
		return null;
	}
}
export function formatTo12Hour(time24: string): string {
	const [hourStr, minuteStr] = time24.split(":");
	let hour = parseInt(hourStr, 10);
	const minute = minuteStr;
	const period = hour >= 12 ? "PM" : "AM";

	if (hour === 0) {
		hour = 12; // Midnight
	} else if (hour > 12) {
		hour -= 12;
	}

	const hourFormatted = hour.toString().padStart(2, "0");
	return `${hourFormatted}:${minute} ${period}`;
}

/**
 * Groups appointments by date and sorts them chronologically
 * @param {Array} appointments - Array of appointment objects
 * @returns {Array} Array of objects with date and appointments grouped by that date
 */
export function groupAppointmentsByDate(appointments) {
	// Group appointments by date
	const grouped = appointments.reduce((acc, appointment) => {
		const date = appointment.date;

		if (!acc[date]) {
			acc[date] = [];
		}

		acc[date].push(appointment);

		return acc;
	}, {});

	// Convert to array format and sort by date
	const result = Object.entries(grouped)
		.map(([date, appointments]) => ({
			date,
			appointments: appointments.sort((a, b) => {
				// Sort appointments within the same date by time
				const timeA = convertTo24Hour(a.fromTime);
				const timeB = convertTo24Hour(b.fromTime);
				return timeA.localeCompare(timeB);
			}),
		}))
		.sort((a, b) => {
			// Sort groups by date (chronological order)
			return new Date(a.date) - new Date(b.date);
		});

	return result;
}

/**
 * Helper function to convert 12-hour format to 24-hour format for sorting
 * @param {string} time12h - Time in 12-hour format (e.g., "01:00 PM")
 * @returns {string} Time in 24-hour format (e.g., "13:00")
 */
export function convertTo24Hour(time12h) {
	const [time, modifier] = time12h.split(" ");
	let [hours, minutes] = time.split(":");

	if (hours === "12") {
		hours = "00";
	}

	if (modifier === "PM") {
		hours = parseInt(hours, 10) + 12;
	}

	return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/**
 * Alternative version with more formatting options
 * @param {Array} appointments - Array of appointment objects
 * @param {Object} options - Configuration options
 * @returns {Array} Formatted appointment groups
 */
export function groupAppointmentsByDateAdvanced(appointments, options = {}) {
	const {
		sortOrder = "asc", // 'asc' or 'desc'
		includeDateCount = false,
		formatDate = false,
	} = options;

	// Group appointments by date
	const grouped = appointments.reduce((acc, appointment) => {
		const date = appointment.date;

		if (!acc[date]) {
			acc[date] = [];
		}

		acc[date].push(appointment);

		return acc;
	}, {});

	// Convert to array format and sort
	const result = Object.entries(grouped)
		.map(([date, appointments]) => {
			const sortedAppointments = appointments.sort((a, b) => {
				const timeA = convertTo24Hour(a.fromTime);
				const timeB = convertTo24Hour(b.fromTime);
				return sortOrder === "asc"
					? timeA.localeCompare(timeB)
					: timeB.localeCompare(timeA);
			});

			return {
				date: formatDate ? formatDateString(date) : date,
				appointments: sortedAppointments,
				...(includeDateCount && { count: appointments.length }),
			};
		})
		.sort((a, b) => {
			const dateA = new Date(formatDate ? a.date.split(" - ")[0] : a.date);
			const dateB = new Date(formatDate ? b.date.split(" - ")[0] : b.date);

			return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
		});

	return result;
}

/**
 * Helper function to format date strings
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export function formatDateString(dateString:string) {
	const date = new Date(dateString);
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString("en-US", options);
}

// Example usage:
const appointments = [
	{
		date: "2025-07-13",
		code: "6f27dfa",
		fromTime: "01:00 PM",
		toTime: "12:00 PM",
		courseResponse: {
			code: "1c92fad",
			courseTitle: "Human Computer Interaction",
			courseCodes: ["SEN 404", "INS 202", "CSC 402"],
		},
		adviserResponse: {
			code: "035fecc",
			userId: "STAFF1",
			fullName: "Mr.Caldwell Dennis",
			email: "nisaniw@mailinator.com",
			role: "ADVISER",
			adviserOffice: "Room 1",
		},
		status: "PENDING",
	},
	{
		date: "2025-07-10",
		code: "11ae9b2",
		fromTime: "11:00 AM",
		toTime: "10:00 AM",
		courseResponse: {
			code: "6335710",
			courseTitle: "Introduction to Databases",
			courseCodes: ["SEN 403", "CSC 424"],
		},
		adviserResponse: {
			code: "035fecc",
			userId: "STAFF1",
			fullName: "Mr.Caldwell Dennis",
			email: "nisaniw@mailinator.com",
			role: "ADVISER",
			adviserOffice: "Room 1",
		},
		status: "PENDING",
	},
];

// Basic usage
const groupedAppointments = groupAppointmentsByDate(appointments);
console.log("Basic grouping:", groupedAppointments);

// Advanced usage with options
const advancedGrouped = groupAppointmentsByDateAdvanced(appointments, {
	sortOrder: "asc",
	includeDateCount: true,
	formatDate: true,
});
console.log("Advanced grouping:", advancedGrouped);

// Export for use in other files
export function getDateOnly(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
