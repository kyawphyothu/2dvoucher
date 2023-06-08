const { users, bettors, win_numbers, bet_types, user_types } = require('./dataformat')



require('dotenv').config();

const { MongoClient, ObjectId } = require("mongodb");

const mongo = new MongoClient(process.env.MONGO_DB_DEV);
const db = mongo.db("two_d_voucher");


const number_of_users = 80;
const number_of_tweets = 40;
const number_of_shares = 5;
const number_of_comments = 120;
const number_of_notis = 10;

async function seedUsers() {
	await db.collection("users").deleteMany({});

	let data = users;

	try {
		return await db.collection("users").insertMany(data);
	} finally {
		console.log("User seeding done.");
	}
}

// async function seedBettors(){
// 	await db.collection('bettors').deleteMany({});

// 	let data = bettors;

// 	try{
// 		return await db.collection('bettors').insertMany(data);
// 	} finally {
// 		console.log('Bettors seeding done.');
// 	}
// }

// async function seedWinNumbers(){
// 	await db.collection('win_numbers').deleteMany({});

// 	try{
// 		return await db.collection('win_numbers').insertMany(win_numbers);
// 	} finally {
// 		console.log('win number seeding done.')
// 	}
// }

async function seedBetTypes(){
	await db.collection('bet_types').deleteMany({});

	try {
		return await db.collection('bet_types').insertMany(bet_types);
	} finally {
		console.log("bet types seding done.");
	}
}

async function seedUserTypes(){
	await db.collection('user_types').deleteMany({});

	try {
		return await db.collection('user_types').insertMany(user_types);
	} finally {
		console.log("user types seding done.");
	}
}


// async function seedFollows() {
// 	let sample = Math.floor((Math.random() * number_of_users) / 2) + 5;

// 	let randomUsers = await db
// 		.collection("users")
// 		.aggregate([
// 			{
// 				$match: {
// 					_id: {
// 						$not: { $eq: ObjectId("63969fc7526a2ee4e61451db") },
// 					},
// 				},
// 			},
// 			{ $sample: { size: sample } },
// 		])
// 		.toArray();

// 	let followers = randomUsers.map(user => user._id);

// 	sample = Math.floor((Math.random() * number_of_users) / 2) + 5;
// 	randomUsers = await db
// 		.collection("users")
// 		.aggregate([
// 			{
// 				$match: {
// 					_id: {
// 						$not: { $eq: ObjectId("63969fc7526a2ee4e61451db") },
// 					},
// 				},
// 			},
// 			{ $sample: { size: sample } },
// 		])
// 		.toArray();

// 	let following = randomUsers.map(user => user._id);

// 	try {
// 		await db.collection("users").updateOne(
// 			{ _id: ObjectId("63969fc7526a2ee4e61451db") },
// 			{
// 				$set: { followers, following },
// 			},
// 		);

// 		for (let i = 0; i < following.length; i++) {
// 			await db.collection("users").updateOne(
// 				{ _id: ObjectId(following[i]) },
// 				{
// 					$set: { followers: [ObjectId("63969fc7526a2ee4e61451db")] },
// 				},
// 			);
// 		}

// 		for (let i = 0; i < followers.length; i++) {
// 			await db.collection("users").updateOne(
// 				{ _id: ObjectId(followers[i]) },
// 				{
// 					$set: { following: [ObjectId("63969fc7526a2ee4e61451db")] },
// 				},
// 			);
// 		}
// 	} finally {
// 		console.log("Done adding follows for user Alice");
// 	}
// }

// async function seedTweets(users) {
// 	await db.collection("tweets").deleteMany({});

// 	let data = [];
// 	for (let i = 0; i < number_of_tweets; i++) {
// 		let likes = [];
// 		let count = Math.floor(Math.random() * 40);
// 		for (let i = 0; i < count; i++) {
// 			likes.push(users[Math.floor(Math.random() * number_of_users)]);
// 		}

// 		likes = [...new Set(likes)];

// 		data.push({
// 			type: "post",
// 			body: faker.lorem.paragraph(),
// 			owner: users[Math.floor(Math.random() * number_of_users)],
// 			created: new Date(),
// 			likes: likes,
// 		});
// 	}

// 	try {
// 		return await db.collection("tweets").insertMany(data);
// 	} finally {
// 		console.log("Tweet seeding done.");
// 	}
// }

// async function seedShares(tweets, users) {
// 	let data = [];

// 	for (let i = 0; i < number_of_shares; i++) {
// 		let likes = [];
// 		let count = Math.floor(Math.random() * 40);
// 		for (let i = 0; i < count; i++) {
// 			likes.push(users[Math.floor(Math.random() * number_of_users)]);
// 		}

// 		likes = [...new Set(likes)];

// 		data.push({
// 			type: "share",
// 			origin: tweets[Math.floor(Math.random() * number_of_tweets)],
// 			body: faker.lorem.sentence(),
// 			owner: users[Math.floor(Math.random() * number_of_users)],
// 			created: new Date(),
// 			likes: likes,
// 		});
// 	}

// 	try {
// 		return await db.collection("tweets").insertMany(data);
// 	} finally {
// 		console.log("Share seeding done.");
// 	}
// }

// async function seedComments(tweetsNshares, users) {
// 	let data = [];

// 	for (let i = 0; i < number_of_comments; i++) {
// 		let likes = [];
// 		let count = Math.floor(Math.random() * 40);
// 		for (let i = 0; i < count; i++) {
// 			likes.push(users[Math.floor(Math.random() * number_of_users)]);
// 		}

// 		likes = [...new Set(likes)];

// 		data.push({
// 			type: "comment",
// 			origin: tweetsNshares[
// 				Math.floor(
// 					Math.random() * (number_of_tweets + number_of_shares),
// 				)
// 			],
// 			body: faker.lorem.sentence(),
// 			owner: users[Math.floor(Math.random() * number_of_users)],
// 			created: new Date(),
// 			likes: likes,
// 		});
// 	}

// 	try {
// 		return await db.collection("tweets").insertMany(data);
// 	} finally {
// 		console.log("Comment seeding done.");
// 	}
// }

// async function seedNotis(tweetsNshares, users) {
// 	try {
// 		await db.collection("notis").deleteMany({});

// 		let noti_types = ["comment", "like", "share"];

// 		let data = [];
// 		for (let i = 0; i < number_of_notis; i++) {
// 			let notiType = noti_types[Math.floor(Math.random() * 3)];
// 			data.push({
// 				type: notiType,
// 				actor: users[Math.floor(Math.random() * number_of_users)],
// 				msg: `${notiType}s your tweet.`,
// 				target: tweetsNshares[
// 					Math.floor(
// 						Math.random() * (number_of_tweets + number_of_shares),
// 					)
// 				],
// 				owner: ObjectId("63969fc7526a2ee4e61451db"),
// 				read: false,
// 				created: new Date(),
// 			});
// 		}

// 		await db.collection("notis").insertMany(data);
// 	} finally {
// 		console.log("Noti seeding done.");
// 	}
// }

async function seed() {
	console.log("Started seeding users...");
	let users = await seedUsers();

	// console.log("Started seeding bettors...");
	// await seedBettors();

	// console.log("Started seeding win numbers...");
	// await seedWinNumbers();

	console.log("Started seeding bet types...");
	await seedBetTypes();

	console.log("Started seeding user types...");
	await seedUserTypes();

	// console.log("Started seeding follows for user Alice");
	// await seedFollows();

	// console.log("Started seeding tweets...");
	// let tweets = await seedTweets(users.insertedIds);

	// console.log("Started seeding shares...");
	// let shares = await seedShares(tweets.insertedIds, users.insertedIds);

	// console.log("Started seeding comments...");
	// await seedComments(
	// 	{ ...tweets.insertedIds, ...shares.insertedIds },
	// 	users.insertedIds,
	// );

	// console.log("Started seeding notis...");
	// await seedNotis(
	// 	{ ...tweets.insertedIds, ...shares.insertedIds },
	// 	users.insertedIds,
	// );

	process.exit(0);
}

seed();
