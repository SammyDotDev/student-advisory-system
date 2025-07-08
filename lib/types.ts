export type Schedule = {
	date: string;
	fromTime: string;
	toTime: string;
	course: string;
	advisor?: string;
	profileImage?: string;
	advisee?: string;
	status?: "" | "" | "";
	venue?: "";
};

export type User = {
	fullname: string;
	email?: string;
	matricNumber?: string;
	staffId?: string;
	department?: string;
	level?: string;
	honorifics?: string;
	profileImage?: string;
};

export type RegisterResponse = {
	message: string;
};

export type LoginResponse = {
	userId: string;
	fullname: string;
	email: string;
	department?: string;
	level?: string;
	onboarded: boolean;
};
