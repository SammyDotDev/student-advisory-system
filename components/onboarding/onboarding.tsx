"use client";

import { GraduationCap } from "lucide-react";
import React, { useState } from "react";
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

const Onboarding = () => {
	const router = useRouter();
	const departmentsList = [
		{ value: "software-engineering", label: "Software Engineering" },
		{ value: "computer-science", label: "Computer Science" },
		{ value: "cyber-security", label: "Cyber Security" },
		{ value: "information-technology", label: "Information Technology" },
		{ value: "mass-communication", label: "Mass Communication" },
		{ value: "communication-art", label: "Communication Art" },
	];

	const [departments, setDepartments] = useState<string[]>([]);
	const [advisorCourses, setAdvisorCourses] = useState<string[]>([]);
	const handleCompleteOnboarding = async (e) => {
		e.preventDefault();
        router.push("/dashboard/advisor")
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
						<h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
						<p className="text-slate-400">
							Enter your account details to continue
						</p>
					</div>

					<Card className="bg-slate-800 border-slate-700">
						<CardHeader>
							<CardTitle className="text-white">Welcome back</CardTitle>
							<CardDescription className="text-slate-400">
								Please provide the following details to continue
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleCompleteOnboarding} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="matric_number" className="text-white">
										Departments lecturing
									</Label>
									<MultiSelect
										className="border border-slate-500 bg-slate-600 my-4"
										options={departmentsList}
										onValueChange={setDepartments}
										defaultValue={departments}
										placeholder="Select departments"
										variant="inverted"
										animation={0}
										maxCount={8}
									/>
									{/* <Input
										id="matric_number"
										placeholder="Enter your matric number"
										value={studentDetails.matricNumber}
										onChange={(e) =>
											setStudentDetails((prev) => ({
												...prev,
												matricNumber: e.target.value,
											}))
										}
										className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
										required
									/> */}
								</div>

								<Button
									type="submit"
									className="w-full bg-slate-400 hover:bg-slate-700"
								>
									Continue to Dashboard
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
