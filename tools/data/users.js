
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);

// const userss = [
// 	{
// 		_id: new ObjectId("646fa2ef0d7361b34925370a"),
// 		name: "Alice",
// 		handle: "alice",
// 		password: hash,
// 		role: "superadmin",
// 	},
// 	{
// 		_id: new ObjectId("646fa2f78b6443983ac9e6f2"),
// 		name: "Bob",
// 		handle: "bob",
// 		password: hash,
// 		friend: {
// 			friends: ["chris", "dave"],
// 			requests: ["eve"],
// 			pending: ["frank"],
// 			cancled: ["gina", "joy"],
// 		},
// 		group: {
// 			own: [new ObjectId("6144c3b05b1198e53e6e792f"), 2, 6],
// 			admin: [3, 9],
// 			member: [8],
// 		},
// 		setting: {
// 			limit: { "2d": 200000, "3d": 30000 },
// 			defaultCloseAfterLimit: false,
// 			defaultLimit: { "2d": 10000, "3d": 10000 },
// 			defaultZ: { "2d": 80, "3d": 550 },
// 			defaultPercent: { "2d": 10, "3d": 12 },
// 			defaultCloseTime: { "2d": ["11:55", "4:25"], "3d": ["4:55"] },
// 		},
// 	},
// ]

const userss = [
	{
	  "_id": {
		"$oid": "646fa2f78b6443983ac9e6f2"
	  },
	  "name": "Bob",
	  "handle": "bob",
	  "password": "$2b$10$O3hjZwuz8p7KOZ8cR0bTl.GAHtnCO3K.Nbu3I8OVmOcyjuoL5DXfC",
	  "friend": {
		"friends": [
		  "chris",
		  "dave"
		],
		"requests": [
		  "eve",
		  "alice"
		],
		"pending": [
		  "frank"
		],
		"cancled": [
		  "gina",
		  "joy"
		]
	  },
	  "group": {
		"own": [
		  {
			"$oid": "6144c3b05b1198e53e6e792f"
		  },
		  2,
		  6
		],
		"admin": [
		  3,
		  9
		],
		"member": [
		  8
		]
	  },
	  "setting": {
		"limit": {
		  "2d": 200000,
		  "3d": 30000
		},
		"defaultCloseAfterLimit": false,
		"defaultLimit": {
		  "2d": 10000,
		  "3d": 10000
		},
		"defaultZ": {
		  "2d": 80,
		  "3d": 550
		},
		"defaultPercent": {
		  "2d": 10,
		  "3d": 12
		},
		"defaultCloseTime": {
		  "2d": [
			"11:55",
			"4:25"
		  ],
		  "3d": [
			"4:55"
		  ]
		}
	  },
	  "picture": "b11"
	},
	{
	  "_id": {
		"$oid": "646fa2ef0d7361b34925370a"
	  },
	  "name": "Alice",
	  "handle": "alice",
	  "password": "$2b$10$O3hjZwuz8p7KOZ8cR0bTl.GAHtnCO3K.Nbu3I8OVmOcyjuoL5DXfC",
	  "role": "superadmin"
	},
	{
	  "_id": {
		"$oid": "64b0376ddfc87f5103132c43"
	  },
	  "name": "eve",
	  "handle": "eve",
	  "phone": "123",
	  "picture": "defaultPic",
	  "password": "$2b$10$j8rRADmrZjDXMG4fynCjt.ZINqIB/aB10fcP3xAzBVorHwF.ATyk.",
	  "created": {
		"$date": {
		  "$numberLong": "1689270125528"
		}
	  }
	},
	{
	  "_id": {
		"$oid": "64b03850dfc87f5103132c44"
	  },
	  "name": "Dave",
	  "handle": "dave",
	  "phone": "123",
	  "picture": "defaultPic",
	  "password": "$2b$10$0PQW5BpL9sgay.7xUmtTq.gEBMO7TCq28IpzhmyyBmdJvZ.4jbWMK",
	  "created": {
		"$date": {
		  "$numberLong": "1689270352836"
		}
	  }
	},
	{
	  "_id": {
		"$oid": "64b078e1a28fdb09f39fbffe"
	  },
	  "name": "Frank",
	  "handle": "frank",
	  "phone": "123",
	  "picture": "b4",
	  "password": "$2b$10$skAChLTdhipOcmJyfoYqZ.TQJiYznVHYyYOVVzVUrqtFt1ZXFTuXW",
	  "created": {
		"$date": {
		  "$numberLong": "1689286881441"
		}
	  }
	},
	{
	  "_id": {
		"$oid": "64b079f6a28fdb09f39fbfff"
	  },
	  "name": "Gina",
	  "handle": "gina",
	  "phone": "123",
	  "picture": "defaultPic",
	  "password": "$2b$10$0GGylOO1U2HAYUsNCxAWheFThpgjC2jNFkWK0N0QyRMgCli7BHJqa",
	  "created": {
		"$date": {
		  "$numberLong": "1689287158182"
		}
	  }
	},
	{
	  "_id": {
		"$oid": "64b07a03a28fdb09f39fc000"
	  },
	  "name": "Joy",
	  "handle": "joy",
	  "phone": "123",
	  "picture": "defaultPic",
	  "password": "$2b$10$evgBm4X/.IGZqCPKKFenUuS6VLFaZeEMtj1xYaLXtdhqO6A4J0VKG",
	  "created": {
		"$date": {
		  "$numberLong": "1689287171768"
		}
	  }
	}
  ]

module.exports = userss