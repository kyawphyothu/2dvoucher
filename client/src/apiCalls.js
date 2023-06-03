const apiBase = process.env.REACT_APP_API_BASE;
const apiTokenName = process.env.REACT_APP_API_TOKEN_NAME;

export function getToken() {
	return localStorage.getItem(apiTokenName) || false;
}

export async function login(handle, password) {
	if (!handle || !password) return false;

	const res = await fetch(`${apiBase}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ handle, password }),
	});

	if (res.ok) {
		const result = await res.json();
		localStorage.setItem(apiTokenName, result.token);

		return result;
	}

	return false;
}

export async function logout() {
	localStorage.removeItem(apiTokenName);
	return 1;
}

export async function fetchUser() {
	const token = getToken();

	if (!token) return false;

	const res = await fetch(`${apiBase}/user`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		const result = await res.json();
		return result;
	}

	return false;
}
