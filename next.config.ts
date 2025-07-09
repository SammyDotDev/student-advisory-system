import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["randomuser.me"],
	},
	// matchers: ["/dashboard/advisor/:path*", "/dashboard/student/:path*"],
};

export default nextConfig;
