"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Branding from "./components/branding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { emailRegex, isEmptyString, PASSWORD_MISMATCH } from "@/lib/utils";
import { ApiClient } from "@/api/api";
import { RegisterResponse } from "@/lib/types";
import axios from "axios";

export default function RegisterForm() {
	const AuthApi = ApiClient();

	// show passowrd states for eye button
	const [showStudentPassword, setShowStudentPassword] = useState(false);
	const [showAdviseryPassword, setShowAdviseryPassword] = useState(false);
	const [showConfirmStudentPassword, setShowConfirmStudentPassword] =
		useState(false);
	const [showConfirmAdviseryPassword, setShowConfirmAdviseryPassword] =
		useState(false);

	// validation for input fields
	const [studentFieldsInValid, setStudentFieldsInValid] = useState(false);
	const [adviserFieldsInValid, setAdviserFieldsInValid] = useState(false);

	// user details
	const [studentDetails, setStudentDetails] = useState({
		matricNumber: "",
		department: "",
		level: "",
		email: "",
		firstname: "",
		lastname: "",
		password: "",
	});

	const [adviserDetails, setAdviserDetails] = useState({
		staffId: "",
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		honorifics: "",
	});
	// confirm password details for users
	const [confirmStudentPassword, setConfirmStudentPassword] = useState("");
	const [confirmAdviseryPassword, setConfirmAdviseryPassword] = useState("");

	// input field validation
	useEffect(() => {
		setStudentFieldsInValid(
			isEmptyString(studentDetails.matricNumber) &&
				isEmptyString(studentDetails.password)
		);
		setAdviserFieldsInValid(
			isEmptyString(adviserDetails.staffId) &&
				isEmptyString(adviserDetails.password)
		);
	}, [studentDetails, adviserDetails]);

	// register student
	const handleStudentRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (emailRegex.test(studentDetails.email)) {
			// defining fullname of the user
			const fullname = `${studentDetails.firstname} ${studentDetails.lastname}`;
			// validate password and confirm password
			if (studentDetails.password === confirmStudentPassword) {
				try {
					// api call
					const res = await AuthApi.post<unknown, RegisterResponse>(
						"/auth/register",
						{
							email: studentDetails.email,
							fullName: fullname,
							userId: studentDetails.matricNumber,
							password: studentDetails.password,
							department: studentDetails.department,
							level: studentDetails.level,
						},
						{
							params: {
								role: "STUDENT",
							},
						}
					);
					if (res.status === 201) {
						console.log(res.data.result.message);
						// toast success
						toast.success(res.data.result.message);
						// toast to navigate to login
						setTimeout(() => {
							toast(
								<div>
									Go to login page{" "}
									<a
										href="/auth/login"
										// target="_blank"
										rel="noopener noreferrer"
										className="underline"
									>
										Here
									</a>
								</div>
							);
						}, 2000);
					}
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						toast.error(error.response.data.result.message);
					} else {
						toast.error("An unexpected error occurred");
					}
				}
				// password mismatch
			} else {
				toast.error(PASSWORD_MISMATCH);
				throw PASSWORD_MISMATCH;
			}
		}
	};

	// register adviser
	const handleAdviseryRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			adviserDetails.email &&
			adviserDetails.staffId &&
			adviserDetails.firstname &&
			adviserDetails.password &&
			confirmAdviseryPassword
		) {
			// defining fullname of the adviser
			const fullname = `${adviserDetails.honorifics} ${adviserDetails.firstname} ${adviserDetails.lastname}`;
			// validate password and confirm password
			if (adviserDetails.password === confirmAdviseryPassword) {
				try {
					// api call
					const res = await AuthApi.post<unknown, RegisterResponse>(
						"/auth/register",
						{
							email: adviserDetails.email,
							fullName: fullname,
							userId: adviserDetails.staffId,
							password: adviserDetails.password,
						},
						{
							params: {
								role: "ADVISER",
							},
						}
					);
					if (res.status === 201) {
						// success toast
						toast.success(res.data.result.message);
						// toast to navigate to login
						setTimeout(() => {
							toast(
								<div>
									Go to login page{" "}
									<a
										href="/auth/login"
										// target="_blank"
										rel="noopener noreferrer"
										className="underline"
									>
										Here
									</a>
								</div>
							);
						}, 2000);
					}
				} catch (error) {
					toast.error(`${error.response.data.result.message}`);
				}
				// password mismatch
			} else {
				toast.error(PASSWORD_MISMATCH);
				throw PASSWORD_MISMATCH;
			}
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left side - Branding */}
			<Branding />
			{/* Right side - Signin Form */}
			<div className="flex-1 flex items-center justify-center bg-slate-900 p-8">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-4">
							<GraduationCap className="h-12 w-12 text-slate-400" />
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">
							Create your Account
						</h1>
						<p className="text-slate-400">
							Enter your account details to continue
						</p>
					</div>

					<Tabs defaultValue="student" className="mb-6 gap-5">
						<TabsList className="bg-slate-800 border-slate-700">
							<TabsTrigger
								value="student"
								className="text-slate-300 bg-transparent p-4 "
							>
								Student
							</TabsTrigger>
							<TabsTrigger
								value="adviser"
								className="text-slate-300 bg-transparent p-4"
							>
								Adviser
							</TabsTrigger>
						</TabsList>
						<TabsContent value="student">
							<Card className="bg-slate-800 border-slate-700">
								<CardHeader>
									<CardTitle className="text-white">Register</CardTitle>
									<CardDescription className="text-slate-400">
										Create your student account
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleStudentRegister} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="matric_number" className="text-white">
												Matric Number
											</Label>
											<Input
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
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="department" className="text-white">
												Department
											</Label>
											<Select
												value={studentDetails.department}
												onValueChange={(text) =>
													setStudentDetails((prev) => ({
														...prev,
														department: text,
													}))
												}
												required
											>
												<SelectTrigger className="bg-slate-700 border-slate-600 text-white">
													<SelectValue placeholder="Select your department" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="software-engineering">
														Software Engineering
													</SelectItem>
													<SelectItem value="computer-science">
														Computer Science
													</SelectItem>
													<SelectItem value="cyber-security">
														Cyber Security
													</SelectItem>
													<SelectItem value="information-technology">
														Information Technology
													</SelectItem>
													<SelectItem value="mass-communication">
														Mass Communication
													</SelectItem>
													<SelectItem value="communication-art">
														Communication Art
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="level" className="text-white">
												Level
											</Label>
											<Select
												value={studentDetails.level}
												onValueChange={(text) =>
													setStudentDetails((prev) => ({
														...prev,
														level: text,
													}))
												}
												required
											>
												<SelectTrigger className="bg-slate-700 border-slate-600 text-white">
													<SelectValue placeholder="Select your level" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="100">100</SelectItem>
													<SelectItem value="200">200</SelectItem>
													<SelectItem value="300">300</SelectItem>
													<SelectItem value="400">400</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												Email
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="Enter your email"
												value={studentDetails.email}
												onChange={(e) =>
													setStudentDetails((prev) => ({
														...prev,
														email: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												First Name
											</Label>
											<Input
												id="firstname"
												placeholder="Enter your first name"
												value={studentDetails.firstname}
												onChange={(e) =>
													setStudentDetails((prev) => ({
														...prev,
														firstname: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												Last Name
											</Label>
											<Input
												id="lastname"
												placeholder="Enter your last name"
												value={studentDetails.lastname}
												onChange={(e) =>
													setStudentDetails((prev) => ({
														...prev,
														lastname: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="password" className="text-white">
												Password
											</Label>
											<div className="relative">
												<Input
													id="password"
													type={showStudentPassword ? "text" : "password"}
													placeholder="Enter your password"
													value={studentDetails.password}
													onChange={(e) =>
														setStudentDetails((prev) => ({
															...prev,
															password: e.target.value,
														}))
													}
													className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
													required
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() =>
														setShowStudentPassword(!showStudentPassword)
													}
												>
													{showStudentPassword ? (
														<EyeOff className="h-4 w-4 text-slate-400" />
													) : (
														<Eye className="h-4 w-4 text-slate-400" />
													)}
												</Button>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="confirm_password" className="text-white">
												Confirm Password
											</Label>
											<div className="relative">
												<Input
													id="confirm_password"
													type={
														showConfirmStudentPassword ? "text" : "password"
													}
													placeholder="Enter your password again"
													value={confirmStudentPassword}
													onChange={(e) =>
														setConfirmStudentPassword(e.target.value)
													}
													className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
													required
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() =>
														setShowConfirmStudentPassword(
															!showConfirmStudentPassword
														)
													}
												>
													{showConfirmStudentPassword ? (
														<EyeOff className="h-4 w-4 text-slate-400" />
													) : (
														<Eye className="h-4 w-4 text-slate-400" />
													)}
												</Button>
											</div>
										</div>

										<Button
											type="submit"
											className="w-full bg-slate-400 hover:bg-slate-700"
										>
											Sign In
										</Button>
									</form>

									<div className="mt-6 text-center">
										<p className="text-slate-400 text-sm">
											Already have an account?{" "}
											<Link
												href="/auth/login"
												className="text-slate-200 hover:text-slate-100"
											>
												Sign In
											</Link>
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="adviser">
							<Card className="bg-slate-800 border-slate-700">
								<CardHeader>
									<CardTitle className="text-white">Register</CardTitle>
									<CardDescription className="text-slate-400">
										Create your adviser account
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleAdviseryRegister} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="staff_id" className="text-white">
												Staff ID
											</Label>
											<Input
												id="staff_id"
												placeholder="Enter your staff ID"
												value={adviserDetails.staffId}
												onChange={(e) =>
													setAdviserDetails((prev) => ({
														...prev,
														staffId: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												Email
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="Enter your email"
												value={adviserDetails.email}
												onChange={(e) =>
													setAdviserDetails((prev) => ({
														...prev,
														email: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												First Name
											</Label>
											<Input
												id="firstname"
												placeholder="Enter your first name"
												value={adviserDetails.firstname}
												onChange={(e) =>
													setAdviserDetails((prev) => ({
														...prev,
														firstname: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-white">
												Last Name
											</Label>
											<Input
												id="lastname"
												placeholder="Enter your last name"
												value={adviserDetails.lastname}
												onChange={(e) =>
													setAdviserDetails((prev) => ({
														...prev,
														lastname: e.target.value,
													}))
												}
												className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="password" className="text-white">
												Password
											</Label>
											<div className="relative">
												<Input
													id="password"
													type={showAdviseryPassword ? "text" : "password"}
													placeholder="Enter your password"
													value={adviserDetails.password}
													onChange={(e) =>
														setAdviserDetails((prev) => ({
															...prev,
															password: e.target.value,
														}))
													}
													className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
													required
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() =>
														setShowAdviseryPassword(!showAdviseryPassword)
													}
												>
													{showAdviseryPassword ? (
														<EyeOff className="h-4 w-4 text-slate-400" />
													) : (
														<Eye className="h-4 w-4 text-slate-400" />
													)}
												</Button>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="confirm_password" className="text-white">
												Confirm Password
											</Label>
											<div className="relative">
												<Input
													id="confirm_password"
													type={
														showConfirmAdviseryPassword ? "text" : "password"
													}
													placeholder="Enter your password again"
													value={confirmAdviseryPassword}
													onChange={(e) =>
														setConfirmAdviseryPassword(e.target.value)
													}
													className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
													required
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() =>
														setShowConfirmAdviseryPassword(
															!showConfirmAdviseryPassword
														)
													}
												>
													{showConfirmAdviseryPassword ? (
														<EyeOff className="h-4 w-4 text-slate-400" />
													) : (
														<Eye className="h-4 w-4 text-slate-400" />
													)}
												</Button>
											</div>
										</div>

										<Button
											type="submit"
											className="w-full bg-slate-400 hover:bg-slate-700"
										>
											Sign In
										</Button>
									</form>

									<div className="mt-6 text-center">
										<p className="text-slate-400 text-sm">
											Already have an account?{" "}
											<Link
												href="/auth/login"
												className="text-slate-200 hover:text-slate-100"
											>
												Sign In
											</Link>
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
