"use client";

import type React from "react";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import Branding from "./components/branding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function LoginForm() {
	const [showStudentPassword, setShowStudentPassword] = useState(false);
	const [showAdvisoryPassword, setShowAdvisoryPassword] = useState(false);
	const [studentDetails, setStudentDetails] = useState({
		matricNumber: "",
		password: "",
	});
	const [advisorDetails, setAdvisorDetails] = useState({
		staffID: "",
		password: "",
	});
	const router = useRouter();

	const handleStudentLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock authentication - in real app, validate credentials
		if (studentDetails.matricNumber && studentDetails.password) {
			// Redirect based on role
			router.push("/dashboard/student");
		}
	};

	const handleAdvisorLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock authentication - in real app, validate credentials
		if (advisorDetails.staffID && advisorDetails.password) {
			// Redirect based on role
			router.push("/dashboard/advisory");
		}
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
					<Tabs defaultValue="student" className="mb-6 gap-5">
						<TabsList className="bg-slate-800 border-slate-700">
							<TabsTrigger
								value="student"
								className="text-slate-300 bg-transparent p-4 "
							>
								Student
							</TabsTrigger>
							<TabsTrigger
								value="advisor"
								className="text-slate-300 bg-transparent p-4"
							>
								Advisor
							</TabsTrigger>
						</TabsList>
						<TabsContent value="student">
							<Card className="bg-slate-800 border-slate-700">
								<CardHeader>
									<CardTitle className="text-white">Sign In</CardTitle>
									<CardDescription className="text-slate-400">
										Access your student portal
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleStudentLogin} className="space-y-4">
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
													onClick={() => setShowStudentPassword(!showStudentPassword)}
												>
													{showStudentPassword ? (
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
											Don&apos;t have an account?{" "}
											<Link
												href="/auth/register"
												className="text-slate-200 hover:text-slate-100"
											>
												Sign up
											</Link>
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="advisor">
							<Card className="bg-slate-800 border-slate-700">
								<CardHeader>
									<CardTitle className="text-white">Sign In</CardTitle>
									<CardDescription className="text-slate-400">
										Access your advisory portal
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleAdvisorLogin} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="staff_id" className="text-white">
												Staff ID
											</Label>
											<Input
												id="staff_id"
												placeholder="Enter your staff ID"
												value={advisorDetails.staffID}
												onChange={(e) =>
													setAdvisorDetails((prev) => ({
														...prev,
														staffID: e.target.value,
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
													type={showAdvisoryPassword ? "text" : "password"}
													placeholder="Enter your password"
													value={advisorDetails.password}
													onChange={(e) =>
														setAdvisorDetails((prev) => ({
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
													onClick={() => setShowAdvisoryPassword(!showAdvisoryPassword)}
												>
													{showAdvisoryPassword ? (
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
											Don&apos;t have an account?{" "}
											<Link
												href="/auth/register"
												className="text-slate-200 hover:text-slate-100"
											>
												Sign up
											</Link>
										</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>

			{/* Right side - Branding */}
			<Branding />
		</div>
	);
}
