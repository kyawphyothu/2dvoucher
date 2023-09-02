const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { database } = require("../config/db");
const auth = require("./authMiddleware");
const moment = require("moment");

const db = database();
const secret = process.env.SECRET_KEY; //for jwt

// get close days
router.get("/", auth, async (req, res) => {
	const user = res.locals.user;

	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	try {
		const result = await db
			.collection("close_days")
			.find(
				{
					owner: user.handle,
					$expr: {
						$gte: [
							{
								$month: {
									$dateFromString: { dateString: "$date", format: "%m/%d/%Y" },
								},
							},
							{ $month: new Date() },
						],
					},
				},
				{ sort: { date: -1 } }
			)
			.toArray();

		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// create close day
router.post("/", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;

	try {
		const result = await db.collection("close_days").insertOne(data);

		return res.status(200).json({ msg: "close day created", id: result.insertedId });
	} catch (e) {
		return res.status(500).json({ msg: "server error" });
	}
});

// delete close day by id
router.delete("/:id", auth, async (req, res) => {
	const user = res.locals.user;

	const id = req.params.id;

	try{
		// is owner
		const isOnwer = await db
			.collection("close_days").findOne({_id: new ObjectId(id), owner: user.handle})
		if(!isOnwer) return res.status(500).json({msg: "unauthorized!"})

		await db.collection("close_days").deleteOne({_id: new ObjectId(id)});

		return res.status(200).json({msg: "close day deleted!"})
	}catch(e){
		return res.status(500).json({msg: "server error"})
	}

})

module.exports = router;
