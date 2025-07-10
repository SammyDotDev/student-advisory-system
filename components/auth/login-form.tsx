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

import { Eye, EyeOff, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Branding from "./components/branding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import { useUser } from "@/context/userContext";
import MobiusLoader from "../loader/mobius-loader";

export default function LoginForm() {
	const router = useRouter();
	const { login, isLoading } = useUser();

	// show passowrd states for eye button
	const [showStudentPassword, setShowStudentPassword] = useState(false);
	const [showAdviseryPassword, setShowAdviseryPassword] = useState(false);

	// user details
	const [userDetails, setUserDetails] = useState({
		userId: "",
		password: "",
	});
	const [adviserDetails, setAdviserDetails] = useState({
		staffId: "",
		password: "",
	});

	const handleStudentLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await login({
			userId: studentDetails.userId,
			password: studentDetails.password,
		});
		console.log(result, "USER RESULT");
		if (result.success) {
			if (result.user) {
				document.cookie = `token=${result.user.token}; path=/; secure; samesite=strict`;
			}
			// console.log(document.cookie);
			// const cookieString = document.cookie;
			// const params = new URLSearchParams(cookieString.replace(/; /g, "&"));
			// const token = params.get("token");
			// console.log(token);
			// const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
			// const role = payload.roles[0]
			// console.log(role)
			router.push("/dashboard/student");
		}
	};

	const handleAdviserLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await login({
			userId: adviserDetails.staffId,
			password: adviserDetails.password,
		});
		console.log(result, "ADVISER RESULT");
		if (result.success) {
			if (result.user) {
				document.cookie = `token=${result.user.token}; path=/; secure; samesite=strict`;
			}
			toast.success("Login successful");
			if (result.user && !result.user.onboarded) {
				router.replace("/onboarding");
				// Redirect to student dashboard
			} else {
				router.push("/dashboard/adviser");
			}
		} else {
			toast.error(result.message);
		}
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await login({
			userId: userDetails.userId,
			password: userDetails.password,
		});
		console.log(result, "USER RESULT");
		if (result.success) {
			toast.success("Login successful");
			if (result.user) {
				document.cookie = `token=${result.user.token}; path=/; secure; samesite=strict`;
				if (
					result.user &&
					result.user.role === "ADVISER" &&
					!result.user.onboarded
				) {
					router.replace("/onboarding");
					// Redirect to user dashboard based on role
				} else {
					router.push(
						`/dashboard/${
							result.user.role === "ADVISER" ? "adviser" : "student"
						}`
					);
				}
			}
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="min-h-screen flex">
			{isLoading && (
				<div className="absolute w-full h-full bg-[#00000078]">
					<MobiusLoader />
				</div>
			)}
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
							<CardTitle className="text-white">Sign In</CardTitle>
							<CardDescription className="text-slate-400">
								Access your student portal
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleLogin} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="user_id" className="text-white">
										Matric Number / Staff ID
									</Label>
									<Input
										id="user_id"
										placeholder="Enter your matric number or staff ID"
										value={userDetails.userId}
										onChange={(e) =>
											setUserDetails((prev) => ({
												...prev,
												userId: e.target.value.trim(),
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
											value={userDetails.password}
											onChange={(e) =>
												setUserDetails((prev) => ({
													...prev,
													password: e.target.value.trim(),
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
				</div>
			</div>

			{/* Right side - Branding */}
			<Branding />
		</div>
	);
}
