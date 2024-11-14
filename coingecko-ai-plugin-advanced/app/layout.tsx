import type { Metadata } from "next";

import { DEPLOYMENT_URL } from "vercel-url";
import "@scalar/api-reference-react/style.css";

export const metadata: Metadata = {
	title: "Coingecko Agent Plugin",
	description:
		"AI-friendly endpoints for prices, market trends, and detailed analytics provided by CoinGecko API.  Using Bitte.ai Agent Plugin spec.",
	metadataBase: new URL(DEPLOYMENT_URL),
	openGraph: {
		images: ["/opengraph-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		site: "@bitteprotocol",
		images: ["/twitter-image.png"],
	},
	icons: {
		icon: "/icon.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
