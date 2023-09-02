const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { database } = require("../config/db");
const auth = require("./authMiddleware");

const db = database();
const secret = process.env.SECRET_KEY; //for jwt

// get win number by type
router.get("/:type", auth, async (req, res) => {
	const user = res.locals.user;

	const type = req.params.type;

	try{
		const result = await db
			.collection("win_numbers").find({owner: user.handle, type}, {sort: {date: -1, time: -1}}).limit(10).toArray();

		return res.status(200).json(result);
	}catch(e){
		return res.status(500).json({msg: "server error"});
	}
})

// create win number
router.post("/", auth, async (req, res) => {
	const user = res.locals.user;

	const { data } = req.body;

	data.owner = user.handle;

	try{
		const isAlreadyExist = await db
			.collection("win_numbers").findOne({type: data.type, date: data.date, time: data.time, owner: data.owner})

		if(isAlreadyExist) return res.status(409).json({msg: "already created!"});

		const result = await db
			.collection("win_numbers").insertOne(data)

		if(!result.insertedId) return res.status(500).json({msg: "failed!"})

		return res.status(200).json({msg: "win number created!", id: result.insertedId})
	}catch(e){
		return res.status(500).json({msg: "server error"})
	}
})

router.delete("/:id", auth, async (req, res) => {
	const user = res.locals.user;

	const id = req.params.id;

	try{
		const result = await db
			.collection("win_numbers").deleteOne({_id: new ObjectId(id)});

		if(!result.deletedCount) return res.status(500).json({msg: "failed to delete!"})

		return res.status(200).json({msg: "delete success"})
	}catch(e){
		return res.status(500).json({msg: "server error"})
	}
})

module.exports = router;
