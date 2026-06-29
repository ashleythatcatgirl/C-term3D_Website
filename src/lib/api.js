import { toast } from "sonner";

const API_BASE_URL = "https://api.polyhaven.com";

export async function api(endpoint, fetchOptions={}) {
    	const api_url = `${API_BASE_URL}${endpoint}`;

	const retries = 2;
	let response;
	let lastError;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			response = await fetch(api_url, {
				...fetchOptions,
				headers: {
					"Content-Type": "application/json",
				},
			});
			break;
		} catch (error) {
			lastError = error;
			if (attempt < retries) {
				await new Promise((resolve) => setTimeout(resolve, 400));
			}
		}
	}

	if (!response) {
		console.error("API Error:", lastError);
		toast.error("Failed to communicate with the server.", {
			description: "Please check your connection and try again.",
			duration: 4000,
		});
		throw lastError;
	}

	const contentType = response.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		return (await response.json());
    	}
}

