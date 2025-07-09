import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["randomuser.me"],
	},
	// matchers: ["/dashboard/adviser/:path*", "/dashboard/student/:path*"],
};

export default nextConfig;
