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
	if (["POST", "PUT", "PATCH"].includes(method)) {
		headers["Content-Type"] = "application/json";
		requestOptions.body = JSON.stringify(body);
	}

	const url = `${apiBase}${endpoint}`;

	const response = await fetch(url, requestOptions);
	const result = await response.json();
	result.ok = response.ok;

	return result;
}

//---------------------------------------------auth------------------------------------------
// singup
export async function signup(user) {
	const res = await fetch(`${apiBase}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const result = await res.json();
	if (res.ok) {
		localStorage.setItem(apiTokenName, result.token);
		result.ok = true;
	} else {
		result.ok = false;
	}

	return result;
}

// login
export async function login(handle, password) {
	if (!handle || !password) return false;

	const res = await fetch(`${apiBase}/auth/login`, {
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

// logout
export async function logout() {
	localStorage.removeItem(apiTokenName);
	return 1;
}

// check password
export async function checkPass(password) {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const res = await fetch(`${apiBase}/auth/check_pass`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password }),
	});

	const result = await res.json();
	if (res.ok) {
		result.ok = true;
	} else {
		result.ok = false;
	}
	return result;
}

// get user by token
export async function fetchUser() {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const res = await fetch(`${apiBase}/auth/user`, {
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

//---------------------------------------------users------------------------------------------
// update profile picture
export async function updateProfile(data) {
	return await makeApiRequest("/user", "PATCH", { data });
}

// get friend
export async function getFriend() {
	return await makeApiRequest("/user/friend", "GET");
}

// make friend request
export async function makeFriendRequest(handle) {
	return await makeApiRequest("/user/make_friend_request", "POST", { handle });
}

// undo friend request
export async function undoFriendRequest(handle) {
	return await makeApiRequest("/user/undo_friend_request", "POST", { handle });
}

// accept request
export async function acceptRequest(handle) {
	return await makeApiRequest("/user/accept_request", "POST", { handle });
}

//block request
export async function block_request(handle) {
	return await makeApiRequest("/user/block_request", "POST", { handle });
}

//unfriend
export async function unfriend(handle) {
	return await makeApiRequest("/user/unfriend", "POST", { handle });
}

// unblock
export async function unblock(handle) {
	return await makeApiRequest("/user/unblock", "POST", { handle });
}

// update total limit
export async function updateTotalLimit(data) {
	return await makeApiRequest("/user/total_limit", "PATCH", { data });
}

// update group default
export async function updateGroupDefault(data) {
	return await makeApiRequest("/user/group_default", "PATCH", { data });
}

//---------------------------------------------types------------------------------------------
// get types
export async function getTypes() {
	return await makeApiRequest("/type", "GET");
}

//---------------------------------------------groups------------------------------------------
// get all groups
export async function getGroups() {
	return await makeApiRequest("/group", "GET");
}

// get own groups
export async function getOwnGroups() {
	return await makeApiRequest("/group/own", "GET");
}

// get group by id
export async function getGroupById(id) {
	return await makeApiRequest(`/group/${id}`, "GET");
}

// create group
export async function createGroup(data) {
	return await makeApiRequest("/group", "POST", { data });
}

//-----------------------------------------------closeDays-----------------------------------------
// get close day
export async function getCloseDays() {
	return await makeApiRequest("/close_day", "GET");
}

//create close day
export async function createCloseDay(data) {
	return await makeApiRequest("/close_day", "POST", { data });
}

// delete close day id
export async function deleteCloseDay(id) {
	return await makeApiRequest(`/close_day/${id}`, "DELETE");
}

//------------------------------------------------winNumbers-------------------------------------------
// get win number by type
export async function getWinNumberByType(type) {
	return await makeApiRequest(`/win_number/${type}`, "GET");
}

// create win number
export async function createWinNumber(data) {
	return await makeApiRequest("/win_number", "POST", { data });
}

export async function deleteWinNumberById(id) {
	return await makeApiRequest(`/win_number/${id}`, "DELETE");
}
