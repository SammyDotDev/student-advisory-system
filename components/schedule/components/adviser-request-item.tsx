import { ApiClient } from "@/api/api";
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
import { useSchedule } from "@/context/scheduleContext";
import { useUser } from "@/context/userContext";
import { AppointmentResponse } from "@/lib/types";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const AdviserRequestItem = ({
	appointment,
}: {
	appointment: AppointmentResponse;
}) => {
	const appointmentApi = ApiClient();
	const { user } = useUser();
	const { fetchPendingAdviserRequests, refetchPendingAdviserRequests } =
		useSchedule();

	const approveAppointmentRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await appointmentApi.put(
				`/appointments/advisers/change-status/${appointment.code}`,
				{},
				{
					params: {
						status: "APPROVED",
					},
				}
			);
			if (res.data.success) {
				await refetchPendingAdviserRequests(user?.code);
			}
			console.log(res.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.result.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	};
	const declineAppointmentRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await appointmentApi.put(
				`/appointments/advisers/change-status/${appointment.code}`,
				{},
				{
					params: {
						status: "DECLINED",
					},
				}
			);
			if (res.data.success) {
				await refetchPendingAdviserRequests(user?.code);
			}
			console.log(res.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.result.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	};
	return (
		<Card className="flex flex-row justify-between border-0 rounded-xl p-4 bg-slate-100 shadow-none">
			<div className="flex flex-col justify-between gap-4">
				<p className="font-medium">{appointment.advisee}</p>
				<p className="text-2xl font-medium text-gray-700">
					{appointment.courseResponse.courseTitle}
				</p>
				<p className="text-sm text-gray-500">
					{appointment.date} at {appointment.fromTime}
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
							<Button
								className="border border-transparent bg-red-500 text-white hover:bg-red-400"
								onClick={declineAppointmentRequest}
							>
								<Label>Decline</Label>
							</Button>
						</div>
					</DialogContent>
				</Dialog>

				<Button
					className={"bg-slate-800 text-white hover:bg-slate-600"}
					onClick={approveAppointmentRequest}
				>
					<Label>Approve</Label>
				</Button>
			</div>
		</Card>
	);
};

export default AdviserRequestItem;
