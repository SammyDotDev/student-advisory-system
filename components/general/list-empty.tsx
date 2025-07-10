import React from "react";
import { Label } from "../ui/label";

const ListEmpty = ({ label }: { label: string }) => {
	return (
		<div className="w-full flex items-center justify-center my-10">
			<Label className="font text-gray-500">{label}</Label>
		</div>
	);
};

export default ListEmpty;
