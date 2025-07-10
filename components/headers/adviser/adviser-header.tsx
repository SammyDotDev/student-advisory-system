"use client";
import MobiusLoader from "@/components/loader/mobius-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/userContext";
import { getGreeting } from "@/lib/utils";
import React from "react";

const AdviserHeader = () => {
	const { user, isLoading } = useUser();
	const firstname = user && user.fullName.split(" ")[0];
	const lastname = user && user.fullName.split(" ")[1];
	const userNameInitials = `${firstname && firstname.charAt(0)}${
		lastname && lastname.charAt(0)
	}`;

	if (isLoading)
		<div>
			<MobiusLoader />
		</div>;
	return (
		<header className="bg-white shadow-sm border-b px-6 py-4 rounded-2xl">
			<div className="flex items-center justify-between m-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Adviser Dashboard
					</h1>
					<p className="text-gray-600">{`${getGreeting()}, ${firstname}`}</p>
				</div>
				<div className="flex items-center space-x-4">
					<Avatar>
						<AvatarImage src="/placeholder.svg" />
						<AvatarFallback>{userNameInitials}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
};

export default AdviserHeader;
