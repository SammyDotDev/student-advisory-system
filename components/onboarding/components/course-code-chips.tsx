import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import React, { useState } from "react";

type CourseCodeChipsProps = {
	value: string[];
	onChange: (newCodes: string[]) => void;
};

export const CourseCodeChips = ({ value, onChange }: CourseCodeChipsProps) => {
	const [input, setInput] = useState("");

	const addCode = () => {
		const trimmed = input.trim();
		if (trimmed && !value.includes(trimmed)) {
			onChange([...value, trimmed]);
			setInput("");
		}
	};

	const removeCode = (code: string) => {
		onChange(value.filter((c) => c !== code));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addCode();
		}
	};

	return (
		<div className="rounded flex flex-wrap gap-2">
			{value
				.filter((item) => item !== "")
				.map((code, i) => (
					<span
						key={i}
						className="bg-slate-500 px-2 border-slate-200 rounded-xl flex items-center text-slate-300 gap-2"
					>
						{code}
						<Button
							type="button"
							onClick={() => removeCode(code)}
							className="text-white bg-transparent rounded-full hover:bg-slate-600"
						>
							<X strokeWidth={2} />
						</Button>
					</span>
				))}
			<div className="flex w-full gap-2">
				<Input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="e.g. SEN 404"
					className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
				/>
				<Button
					className="bg-white hover:bg-gray-200"
					onClick={() => addCode()}
				>
					<Label className="text-black">Add</Label>
				</Button>
			</div>
		</div>
	);
};
