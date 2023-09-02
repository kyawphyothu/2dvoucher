const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { database } = require("../config/db");
const auth = require("./authMiddleware");
const { groups } = require("../config/pipeline");

const db = database();
const secret = process.env.SECRET_KEY; //for jwt

// get all groups
router.get("/", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		const result = await db
			.collection("users")
			.aggregate([{ $match: { handle: user.handle } }, ...groups])
			.toArray();

		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ msg: JSON.stringify(e) });
	}
});

// get own groups
router.get("/own", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		const groups = await db
			.collection("groups")
			.find({ owner: user.handle }, { projection: { name: 1, type: 1, owner: 1 } })
			.toArray();

		return res.status(200).json(groups);
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// get group by id
router.get("/:id", auth, async (req, res) => {
	const user = res.locals.user;
	const group_id = req.params.id;

	try {
		const group = await db.collection("groups").findOne(
			{ _id: new ObjectId(group_id) },
			{
				projection: {
					name: 1,
					type: 1,
					owner: 1,
					admin: 1,
					"members.handle": 1,
					"setting.closeTime": 1,
				},
			}
		);

		return res.status(200).json(group);
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// create group
router.post("/", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;
	data.owner = user.handle;

	try {
		const result = await db.collection("groups").insertOne(data);

		const userUpdate = await db
			.collection("users")
			.updateOne(
				{ handle: user.handle },
				{ $push: { "group.own": new ObjectId(result.insertedId) } }
			);
		if (data.admin) {
			const adminUpdate = await db
				.collection("users")
				.updateOne(
					{ handle: data.admin },
					{ $push: { "group.admin": new ObjectId(result.insertedId) } }
				);
		}

		return res.status(200).json({ msg: `created "${data.name}" group` });
	} catch (e) {
		return res.status(500).json({ msg: `server error` });
	}
});

module.exports = router;
