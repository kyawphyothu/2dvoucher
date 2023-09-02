const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { database } = require("../config/db");
const auth = require("./authMiddleware");

const db = database();
const secret = process.env.SECRET_KEY; //for jwt

router.post("/signup", async (req, res) => {
	const { name, handle, phone, password } = req.body;

	if (!name || !handle || !phone || !password) {
		return res.status(400).json({
			msg: "name, username, phone and password fields are required",
		});
	}

	let userExist = await db.collection("users").findOne({ handle });
	if (userExist) {
		return res.status(409).json({ msg: "username already taken" });
	}

	const hash = await bcrypt.hash(password, 10);

	try {
		let result = await db.collection("users").insertOne({
			name,
			handle,
			phone,
			picture: "defaultPic",
			password: hash,
			created: new Date(),
		});

		let user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(result.insertedId) }, { projection: { password: 0 } });
		let tokenUser = { _id: user._id, handle: user.handle };
		let token = jwt.sign(tokenUser, secret);

		return res.status(201).json({ token, user });
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

router.post("/login", async (req, res) => {
	const { handle, password } = req.body;

	if (!handle || !password) {
		return res.status(403).json({
			msg: "both handle and password are required",
		});
	}

	let user = await db.collection("users").findOne({ handle });
	if (!user) return res.status(403).json({ msg: "user not found" });

	const match = await bcrypt.compare(password, user.password);

	if (match) {
		delete user.password;
		let tokenUser = { _id: user._id, handle: user.handle };
		const token = jwt.sign(tokenUser, secret);
		return res.status(201).json({ token, user });
	}

	return res.status(403).json({ msg: "incorrect password" });
});

// Get user by token (through auth middleware)
router.get("/user", auth, async (req, res) => {
	const user = res.locals.user;

	let result = await db
		.collection("users")
		.findOne({ _id: new ObjectId(user._id) }, { projection: { password: 0 } });
	if (result) {
		return res.status(200).json(result);
	}

	return res.status(401).json({ msg: "user not found" });
});

//check password
router.post("/check_pass", auth, async (req, res) => {
	const user = res.locals.user;

	const { password } = req.body;
	if (!password) return res.status(403).json({ msg: "current password is required" });

	let result = await db
		.collection("users")
		.findOne({ _id: new ObjectId(user._id) }, { projection: { password: 1 } });

	const match = await bcrypt.compare(password, result.password);
	if (!match) return res.status(401).json({ match, msg: "Incorrect Password!" });

	return res.status(200).json({ match });
});

module.exports = router;
