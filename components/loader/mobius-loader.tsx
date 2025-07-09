import React from "react";
import Lottie from "lottie-react";
import mobiusLoaderAnimation from "@/public/mobiusLoader.json";
import { Card } from "../ui/card";
const MobiusLoader = () => {
	return (
		<Card className="absolute w-full left-1/2 top-1/2 rounded-full w-[80px] h-[80px] flex items-center justify-center">
			<Lottie
				animationData={mobiusLoaderAnimation}
				loop={true}
				style={{
					width: 70,
					height: 70,
				}}
			/>
		</Card>
	);
};

export default MobiusLoader;
