import React from "react";

const Branding = () => {
	return (
		<div className="hidden flex-1 bg-gradient-to-br from-slate-600 to-slate-800 md:flex lg:flex xl:flex 2xl:flex items-center justify-center p-8 ">
			<div className="text-center text-white">
				<h2 className="text-5xl font-bold mb-4">Student Advisery</h2>
				<h3 className="text-3xl font-light mb-8">Portal</h3>
				<div className="max-w-md mx-auto">
					<p className="text-slate-100 text-lg mb-8">
						Your comprehensive platform for academic guidance, course
						management, and student success.
					</p>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div className="bg-white/10 rounded-lg p-4">
							<h4 className="font-semibold mb-2">For Students</h4>
							<p className="text-slate-100">
								Track progress, view schedules, and connect with advisers
							</p>
						</div>
						<div className="bg-white/10 rounded-lg p-4">
							<h4 className="font-semibold mb-2">For Advisers</h4>
							<p className="text-slate-100">
								Manage advisees, schedule meetings, and monitor performance
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Branding;
