const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_DB_DEV);

const connectToMongoDB = async () => {
	try {
		await mongo.connect();
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

const database = () => mongo.db("two_d_voucher");

module.exports = { connectToMongoDB, database };
