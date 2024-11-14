"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";

export const ApiReference = () => {
	return (
		<ApiReferenceReact
			configuration={{
				spec: {
					url: "/api/ai-plugin",
				},
				theme: "purple",
			}}
		/>
	);
};
