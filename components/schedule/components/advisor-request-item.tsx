import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Schedule } from "@/lib/types";
import React from "react";

const AdvisorRequestItem = ({
	appointment,
}: {
	appointment: {
		advisee: string;
		schedule: Schedule;
	};
}) => {
	return (
		<Card className="flex flex-row justify-between border-0 rounded-xl p-4 bg-slate-100 shadow-none">
			<div className="flex flex-col justify-between gap-4">
				<p className="font-medium">{appointment.advisee}</p>
				<p className="text-2xl font-semibold text-gray-700">{appointment.schedule.course}</p>
				<p className="text-sm text-gray-500">
					{appointment.schedule.date} at {appointment.schedule.fromTime}
				</p>
			</div>
			<div className="flex items-end justify-end gap-5">
				<Dialog>
					<DialogTrigger asChild>
						<Button className=" bg-red-500 text-white hover:bg-red-400">
							<Label>Decline </Label>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								Are you sure you want to decline this request? This action
								cannot be undone
							</DialogDescription>
						</DialogHeader>
						<div className="ml-auto flex gap-3">
							<Button className="border border-transparent bg-red-500 text-white hover:bg-red-400">
								<Label>Decline</Label>
							</Button>
						</div>
					</DialogContent>
				</Dialog>

				<Button className={"bg-slate-800 text-white hover:bg-slate-600"}>
					<Label>Approve</Label>
				</Button>
			</div>
		</Card>
	);
};

export default AdvisorRequestItem;
