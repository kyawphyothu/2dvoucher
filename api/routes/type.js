const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { database } = require("../config/db");
const auth = require("./authMiddleware");

const db = database();
const secret = process.env.SECRET_KEY; //for jwt

router.get("/", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		const result = await db
			.collection("types")
			.find({}, { projection: { name: 1, code: 1, resultTime: 1 } })
			.toArray();

		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

module.exports = router;
