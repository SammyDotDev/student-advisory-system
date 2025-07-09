"use client";

import { GraduationCap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { MultiSelect } from "../ui/multi-select";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { CourseCodeChips } from "./components/course-code-chips";
import { Input } from "../ui/input";
import { ApiClient } from "@/api/api";
import { useUser } from "@/context/userContext";

type CourseForm = {
	adviserOffice: string;
	courses: {
		courseTitle: string;
		courseCodes: string[];
	}[];
};

const Onboarding = () => {
	const ApiService = ApiClient();
	const { user } = useUser();
	const [adviserOffice, setAdviserOffice] = useState<string>("");
	const { register, control, handleSubmit, reset } = useForm<CourseForm>({
		defaultValues: {
			courses: [
				{
					courseTitle: "",
					courseCodes: [""], // initial empty course code
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "courses",
	});
	useEffect(() => {
		console.log(user);
	}, [user]);

	// const router = useRouter();
	const onSubmit = async (data: CourseForm) => {
		console.log(data, "COURSE FORM");
		try {
			const res = await ApiService.put(`/user/onboard/${user.code}`, {
				adviserOffice,
				adviserCourses: data,
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
		// returning unique course code
		console.log("Final data:", data.courses);
		// router.push("/dashboard/adviser");
	};

	return (
		<div className="min-h-screen flex">
			{/* Left side - Login Form */}
			<div className="flex-1 flex items-center justify-center bg-slate-900 p-8">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-4">
							<GraduationCap className="h-12 w-12 text-slate-400" />
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">Get Started</h1>
						<p className="text-slate-400">
							Get started by adding courses you offer as a lecturer
						</p>
					</div>

					<Card className="bg-slate-800 border-slate-700">
						<CardHeader>
							<CardTitle className="text-white">Add courses</CardTitle>
							<CardDescription className="text-slate-400">
								Please provide the following details to continue
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div className="flex flex-col gap-3">
									<Label className="text-white">Office</Label>
									<Input
										placeholder="e.g. ROOM 34"
										className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
										required
										onChange={(e) => setAdviserOffice(e.target.value)}
										value={adviserOffice}
									/>
								</div>
								{fields.map((field, index) => (
									<Card
										key={field.id}
										className="bg-slate-800 border-slate-700 p-3"
									>
										<div className="flex flex-col gap-3">
											<Label className="text-white">Course Title</Label>
											<Input
												{...register(`courses.${index}.courseTitle` as const)}
												placeholder="e.g. Human Computer Interaction"
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>

										<div className="flex flex-col gap-3">
											<Label className="text-white">Course Codes</Label>
											<Controller
												control={control}
												name={`courses.${index}.courseCodes`}
												render={({ field }) => (
													<CourseCodeChips
														value={field.value}
														onChange={field.onChange}
													/>
												)}
											/>
										</div>

										<Button
											type="button"
											onClick={() => remove(index)}
											className="w-full bg-red-500 hover:bg-red-700"
										>
											Remove Course
										</Button>
									</Card>
								))}

								<Button
									onClick={() =>
										append({
											courseTitle: "",
											courseCodes: [""],
										})
									}
									className="w-full bg-slate-900 hover:bg-slate-700"
								>
									+ Add Course
								</Button>

								<div>
									<Button
										type="submit"
										className="w-full bg-gray-400 hover:bg-slate-600"
									>
										Submit
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
