"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ForgotPasswordNewPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const updatePassword = (e: React.FormEvent) => {
		e.preventDefault();
		if (password === confirmPassword) {
			// Handle password update logic here
			toast.success("Password updated successfully");
			// Redirect or show success message
            router.push("/auth/forgot-password/password-reset-success");
		} else {
			toast.error("Passwords do not match");
		}
	};

	return (
		<div className="flex-1 flex items-center justify-center bg-slate-900 p-8 h-screen">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="flex items-center justify-center mb-4">
						<GraduationCap className="h-12 w-12 text-purple-400" />
					</div>
					<h1 className="text-4xl font-bold text-white mb-2">
						Forgot Password
					</h1>
				</div>

				<Card className="bg-slate-800 border-slate-700">
					<CardHeader>
						<CardTitle className="text-white">
							Enter your new password
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={updatePassword} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password" className="text-white">
									Password
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
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
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
								Continue
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPasswordNewPassword;
