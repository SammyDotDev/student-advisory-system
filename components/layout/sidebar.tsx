"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

interface NavItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	href: string;
	active?: boolean;
}

interface SidebarProps {
	navItems: NavItem[];
	userRole: "student" | "adviser" | "admin";
}

export default function Sidebar({ navItems, userRole }: SidebarProps) {
	const router = useRouter();
	const { logout } = useUser();

	const handleLogout = () => {
		logout();
		// router.push("/");
	};

	const getRoleColor = () => {
		switch (userRole) {
			case "student":
				return "bg-slate-600";
			case "adviser":
				return "bg-slate-900";
			case "admin":
				return "bg-purple-600";
			default:
				return "bg-gray-600";
		}
	};

	return (
		<div
			className={`w-64 ${getRoleColor()} text-white flex flex-col rounded-3xl m-4`}
		>
			{/* Logo */}
			<div className="p-6 border-b border-white/10">
				<div className="flex items-center gap-3">
					<GraduationCap className="h-8 w-8" />
					<div>
						<h2 className="text-xl font-bold">EduPortal</h2>
						<p className="text-sm opacity-80 capitalize">
							{userRole} Dashboard
						</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{navItems.map((item, index) => (
						<li key={index}>
							<Link href={item.href}>
								<Button
									variant={item.active ? "secondary" : "ghost"}
									className={`w-full justify-start gap-3 text-white hover:bg-white/10 cursor-pointer ${
										item.active ? "bg-white/20 text-white" : "hover:text-white"
									}`}
								>
									<item.icon className="h-5 w-5" />
									{item.label}
								</Button>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* User Profile */}
			<div className="p-4 border-t border-white/10">
				<div className="flex items-center gap-3 mb-4">
					<Avatar>
						<AvatarImage src="/placeholder.svg" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<p className="font-medium">Jane Doe</p>
						<p className="text-sm opacity-80">jane.doe@edu.com</p>
					</div>
				</div>
				<Button
					variant="ghost"
					className="w-full justify-start gap-3 text-white hover:bg-white/10 hover:text-white"
					onClick={handleLogout}
				>
					<LogOut className="h-5 w-5" />
					Logout
				</Button>
			</div>
		</div>
	);
}
