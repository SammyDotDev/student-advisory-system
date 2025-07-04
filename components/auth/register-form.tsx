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
import { toast } from "sonner";

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const [userDetails, setUserDetails] = useState({
		role: "",
		email: "",
		firstname: "",
		lastname: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock authentication - in real app, validate credentials
		if (
			userDetails.email &&
			userDetails.firstname &&
			userDetails.password &&
			confirmPassword &&
			role
		) {
			if (userDetails.password === confirmPassword) {
				// Redirect based on role
				switch (role) {
					case "student":
						router.push("/dashboard/student");
						break;
					case "advisor":
						router.push("/dashboard/advisor");
						break;
					case "admin":
						router.push("/dashboard/admin");
						break;
					default:
						router.push("/dashboard/student");
				}
			} else {
				toast.error("Incorrect password");
				throw "incorrect password";
			}
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left side - Signin Form */}
			<div className="flex-1 flex items-center justify-center bg-slate-900 p-8">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-4">
							<GraduationCap className="h-12 w-12 text-purple-400" />
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">
							Create your Account
						</h1>
						<p className="text-slate-400">
							Enter your account details to continue
						</p>
					</div>

					<Card className="bg-slate-800 border-slate-700">
						<CardHeader>
							<CardTitle className="text-white">Register</CardTitle>
							<CardDescription className="text-slate-400">
								Access your student advisory portal
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleRegister} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="role" className="text-white">
										Role
									</Label>
									<Select value={role} onValueChange={setRole} required>
										<SelectTrigger className="bg-slate-700 border-slate-600 text-white">
											<SelectValue placeholder="Select your role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="student">Student</SelectItem>
											<SelectItem value="advisor">Advisor</SelectItem>
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
										value={userDetails.email}
										onChange={(e) =>
											setUserDetails((prev) => ({
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
										value={userDetails.firstname}
										onChange={(e) =>
											setUserDetails((prev) => ({
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
										value={userDetails.lastname}
										onChange={(e) =>
											setUserDetails((prev) => ({
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
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											value={userDetails.password}
											onChange={(e) =>
												setUserDetails((prev) => ({
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
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
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
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Enter your password again"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-4 w-4 text-slate-400" />
											) : (
												<Eye className="h-4 w-4 text-slate-400" />
											)}
										</Button>
									</div>
								</div>

								<Button
									type="submit"
									className="w-full bg-purple-600 hover:bg-purple-700"
								>
									Sign In
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-slate-400 text-sm">
									Already have an account?{" "}
									<Link
										href="/auth/login"
										className="text-purple-400 hover:text-purple-300"
									>
										Sign In
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Right side - Branding */}
			<div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-8">
				<div className="text-center text-white">
					<h2 className="text-5xl font-bold mb-4">Student Advisory</h2>
					<h3 className="text-3xl font-light mb-8">Portal</h3>
					<div className="max-w-md mx-auto">
						<p className="text-purple-100 text-lg mb-8">
							Your comprehensive platform for academic guidance, course
							management, and student success.
						</p>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div className="bg-white/10 rounded-lg p-4">
								<h4 className="font-semibold mb-2">For Students</h4>
								<p className="text-purple-100">
									Track progress, view schedules, and connect with advisors
								</p>
							</div>
							<div className="bg-white/10 rounded-lg p-4">
								<h4 className="font-semibold mb-2">For Advisors</h4>
								<p className="text-purple-100">
									Manage advisees, schedule meetings, and monitor performance
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
