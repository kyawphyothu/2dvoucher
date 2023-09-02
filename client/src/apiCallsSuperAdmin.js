const apiBase = process.env.REACT_APP_API_BASE;
const apiTokenName = process.env.REACT_APP_API_TOKEN_NAME;

export function getToken() {
	return localStorage.getItem(apiTokenName) || false;
}

async function makeApiRequest(endpoint, method, body = {}) {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const headers = {
		Authorization: `Bearer ${token}`,
	};

	let requestOptions = {
		method,
		headers,
	};

	// Add request body for POST, PUT, and PATCH requests
	if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
		headers["Content-Type"] = "application/json";
		requestOptions.body = JSON.stringify(body);
	}

	const url = `${apiBase}${endpoint}`;

	const response = await fetch(url, requestOptions);
	const result = await response.json();
	result.ok = response.ok;

	return result;
}
