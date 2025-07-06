export type Schedule = {
	date: string;
	fromTime: string;
	toTime: string;
	course: string;
	advisor?: string;
	profileImage?: string;
	advisee?: string;
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
