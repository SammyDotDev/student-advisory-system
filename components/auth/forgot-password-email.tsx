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
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const submitEmail = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle email submission logic here
		console.log("Email submitted for password reset");
		if (email !== "") {
			router.push("/auth/forgot-password/new-password");
		}

		// Redirect or show success message
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
						<CardTitle className="text-white">Enter your email</CardTitle>
						<CardDescription className="text-slate-400">
							Enter the email associated with your account to reset your
							password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={submitEmail} className="space-y-4">
							<div className="space-y-2">
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
									required
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
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

export default ForgotPassword;
