const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const auth = require("./authMiddleware");
const { database } = require("../config/db");
const { friend } = require("../config/pipeline");

const db = database();

// get user friends
router.get("/friend", auth, async (req, res) => {
	const user = res.locals.user;

	try {
		const result = await db
			.collection("users")
			.aggregate([{ $match: { handle: user.handle } }, ...friend])
			.toArray();

		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

// update user
router.patch("/", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;
	if (data.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}

	let result = await db
		.collection("users")
		.updateOne({ _id: new ObjectId(user._id) }, { $set: data });

	if (result.modifiedCount === 1) {
		return res.status(200).json({ msg: "Profile updated successfully" });
	} else {
		return res.status(500).json({ msg: "Profile update failed" });
	}
});

// make friend request
router.post("/make_friend_request", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "Username is required!" });

	const isExist = await db.collection("users").findOne({ handle }, { projection: { _id: 1 } });
	if (!isExist) return res.status(400).json({ msg: "username doesn't exist!" });

	const isFriend = await db
		.collection("users")
		.findOne(
			{ handle, "friend.friends": user.handle },
			{ projection: { "friend.friends": 1 } }
		);
	if (isFriend) return res.status(400).json({ msg: "Already Friends!" });

	const isRequested = await db
		.collection("users")
		.findOne(
			{ handle, "friend.requests": user.handle },
			{ projection: { "friend.requests": 1 } }
		);
	if (isRequested) return res.status(400).json({ msg: "Already send request!" });

	const isPending = await db
		.collection("users")
		.findOne(
			{ handle, "friend.pending": user.handle },
			{ projection: { "friend.pending": 1 } }
		);
	if (isPending) return res.status(400).json({ msg: `Already send request by ${handle}!` });

	const isCancled = await db
		.collection("users")
		.findOne(
			{ handle, "friend.cancled": user.handle },
			{ projection: { "friend.cancled": 1 } }
		);
	if (isCancled) return res.status(400).json({ msg: `Blocked by ${handle}!` });

	try {
		const sender = await db
			.collection("users")
			.updateOne({ handle: user.handle }, { $push: { "friend.pending": handle } });
		const acceptor = await db
			.collection("users")
			.updateOne({ handle }, { $push: { "friend.requests": user.handle } });
		const result = await db
			.collection("users")
			.findOne({ handle }, { _id: 0, handle: 1, picture: 1 });

		return res.status(200).json({ msg: "Friend Request send successfully", user: result });
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// undo friend request
router.post("/undo_friend_request", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "username is required" });

	const isExist = await db.collection("users").findOne({ handle }, { projection: { _id: 1 } });
	if (!isExist) return res.status(400).json({ msg: "username doesn't exist" });

	//is you were in my friend list
	const isFriend = await db
		.collection("users")
		.findOne({ handle, "friend.friends": user.handle }, { projection: { _id: 1 } });
	if (isFriend)
		return res.status(400).json({ msg: `${handle} have already accepted (reload page)` });

	//is you blocked me
	const isCancled = await db
		.collection("users")
		.findOne({ handle, "friend.cancled": user.handle }, { projection: { _id: 1 } });
	if (isCancled) return res.status(400).json({ msg: `${handle} blocked already (reload page)` });

	try {
		const sender = await db
			.collection("users")
			.updateOne({ handle: user.handle }, { $pull: { "friend.pending": handle } });
		const acceptor = await db
			.collection("users")
			.updateOne({ handle }, { $pull: { "friend.requests": user.handle } });

		return res.status(200).json({ msg: "undo friend request!", user: handle });
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// accept request
router.post("/accept_request", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "username is required!" });

	const isExist = await db.collection("users").findOne({ handle }, { projection: { _id: 1 } });
	if (!isExist) return res.status(400).json({ msg: "username doesn't exist" });

	//is he requesting me
	const isPending = await db
		.collection("users")
		.findOne({ handle, "friend.pending": user.handle }, { projection: { _id: 1 } });
	if (!isPending)
		return res.status(400).json({ msg: `${handle} doesn't request you to friend!` });

	try {
		const sender = await db.collection("users").updateOne(
			{ handle },
			{
				$pull: { "friend.pending": user.handle },
				$push: { "friend.friends": user.handle },
			}
		);
		const acceptor = await db
			.collection("users")
			.updateOne(
				{ handle: user.handle },
				{ $pull: { "friend.requests": handle }, $push: { "friend.friends": handle } }
			);

		return res.status(200).json({ msg: `${handle} and you are now friends` });
	} catch (e) {
		return res.status(500).json({ msg: `server error` });
	}
});

// block request
router.post("/block_request", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "username is required!" });

	const isExist = await db.collection("users").findOne({ handle }, { projection: { _id: 1 } });
	if (!isExist) return res.status(400).json({ msg: "username doesn't exist" });

	//is he requesting me
	const isPending = await db
		.collection("users")
		.findOne({ handle, "friend.pending": user.handle }, { projection: { _id: 1 } });
	if (!isPending)
		return res.status(400).json({ msg: `${handle} didn't requested you to friend!` });

	try {
		const u_1 = await db
			.collection("users")
			.updateOne(
				{ handle: user.handle },
				{ $pull: { "friend.requests": handle }, $push: { "friend.cancled": handle } }
			);
		const u_2 = await db
			.collection("users")
			.updateOne({ handle }, { $pull: { "friend.pending": user.handle } });

		return res.status(200).json({ msg: `blocked ${handle}` });
	} catch (e) {
		return res.status(500).json({ msg: `server error` });
	}
});

//unfriend
router.post("/unfriend", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "username is required!" });

	//is we are friend
	const isFriend = await db
		.collection("users")
		.find(
			{
				$or: [
					{ handle: user.handle, "friend.friends": handle },
					{ handle, "friend.friends": user.handle },
				],
			},
			{ projection: { handle: 1 } }
		)
		.toArray();
	if (isFriend.length !== 2) {
		return res.status(400).json({ msg: "you are not friends" });
	}

	try {
		const u_1 = await db
			.collection("users")
			.updateOne({ handle: user.handle }, { $pull: { "friend.friends": handle } });
		const u_2 = await db
			.collection("users")
			.updateOne({ handle }, { $pull: { "friend.friends": user.handle } });

		return res.status(200).json({ msg: `unfriend successful!` });
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// unblock
router.post("/unblock", auth, async (req, res) => {
	const user = res.locals.user;

	const { handle } = req.body;
	if (!handle) return res.status(403).json({ msg: "username is required!" });

	const isExist = await db.collection("users").findOne({ handle }, { projection: { _id: 1 } });
	if (!isExist) return res.status(400).json({ msg: "username doesn't exist" });

	//is i block him
	const isBlocked = await db
		.collection("users")
		.findOne({ handle: user.handle, "friend.cancled": handle }, { projection: { _id: 1 } });
	if (!isBlocked) return res.status(400).json({ msg: `you didn't blocked ${handle}` });

	try {
		const result = await db
			.collection("users")
			.updateOne({ handle: user.handle }, { $pull: { "friend.cancled": handle } });

		return res.status(200).json({ msg: `unblocked ${handle}` });
	} catch (e) {
		return res.status(500).json({ msg: `server error` });
	}
});

// update total limit
router.patch("/total_limit", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;

	try {
		const result = await db
			.collection("users")
			.updateOne({ handle: user.handle }, { $set: { "setting.limit": data } });

		return res.status(200).json({ msg: "update successful!" });
	} catch (e) {
		return res.status(200).json({ msg: "server error" });
	}
});

// update group default
router.patch("/group_default", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;

	try {
		const result = db.collection("users").updateOne(
			{ handle: user.handle },
			{
				$set: {
					"setting.defaultLimit": data.defaultLimit,
					"setting.defaultZ": data.defaultZ,
					"setting.defaultPercent": data.defaultPercent,
				},
			}
		);

		return res.status(200).json({ msg: "update successful" });
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

module.exports = router;
