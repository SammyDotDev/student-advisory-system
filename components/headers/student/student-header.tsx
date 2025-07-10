import MobiusLoader from "@/components/loader/mobius-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { getGreeting } from "@/lib/utils";
import { Settings } from "lucide-react";
import React from "react";

const StudentHeader = () => {
	const { user, isLoading } = useUser();

	console.log(user);
	const firstname = user?.fullName.split(" ")[0];
	const lastname = user?.fullName.split(" ")[1];
	const userNameInitials = `${firstname?.charAt(0)}${lastname?.charAt(0)}`;

	if (isLoading)
		<div>
			<MobiusLoader />
		</div>;
	return (
		<header className="bg-white border px-6 py-4 rounded-2xl">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						{getGreeting()}, {user?.fullName}
					</h1>
					<p className="text-gray-600 font-bold">{user?.userId}</p>
				</div>
				<div className="flex items-center space-x-4">
					<Button variant="ghost" size="sm">
						<Settings className="h-5 w-5" />
					</Button>
					<Avatar>
						<AvatarImage src="/placeholder.svg" />
						<AvatarFallback>{userNameInitials}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
};

export default StudentHeader;
