"use client";

import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { GraduationCap } from "lucide-react";

const PasswordUpdateSuccessful = () => {
	const handleLoginRedirect = () => {
		// Redirect to login page
		window.location.href = "/auth/login";
	};
	return (
		<div className="flex-1 flex items-center justify-center bg-slate-900 p-8 h-screen">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="flex items-center justify-center mb-4">
						<GraduationCap className="h-12 w-12 text-purple-400" />
					</div>
					<h1 className="text-4xl font-bold text-white mb-2">
						Password Update Successful
					</h1>
				</div>

				<Card className="bg-slate-800 border-slate-700">
					<CardContent>
						<Button
							onClick={handleLoginRedirect}
							type="submit"
							className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
						>
							Go back to Login
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default PasswordUpdateSuccessful;
