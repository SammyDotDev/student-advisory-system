export type Schedule = {
	date: string;
	fromTime: string;
	toTime: string;
	course: string;
	adviser?: string;
	profileImage?: string;
	advisee?: string;
	status?: "" | "" | "";
	venue?: "";
	userCode?: string;
	courseCode?: string;
};

export type User = {
	fullName: string;
	email?: string;
	matricNumber?: string;
	staffId?: string;
	department?: string;
	level?: string;
	honorifics?: string;
	profileImage?: string;
};

export type RegisterResponse = {
	result: { message: string };
};

export type LoginResponse = {
	code: string;
	userId: string;
	fullName: string;
	email: string;
	department?: string;
	level?: string;
	onboarded: boolean;
	token: string;
	role: "STUDENT" | "ADVISER";
};

export type AppointmentResponse = {
	code: string;
	fromTime: string;
	toTime: string;
	status: string;
	date: string;
	adviserResponse: {
		adviserOffice: string;
		fullName: string;
	};
	courseResponse: {
		code: string;
		courseTitle: string;
		courseCodes: string[];
	};
	message?: string;
};
