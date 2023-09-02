const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const hash = bcrypt.hashSync("password", 10);

export const users = [
	{
		_id: new ObjectId("646fa2ef0d7361b34925370a"),
		name: "Alice",
		handle: "alice",
		password: hash,
		role: "superadmin",
	},
	{
		_id: new ObjectId("646fa2f78b6443983ac9e6f2"),
		name: "Bob",
		handle: "bob",
		password: hash,
		friend: {
			friends: ["chris", "dave"],
			requests: ["eve"],
			pending: ["frank"],
			cancled: ["gina", "joy"],
		},
		group: {
			own: [1, 2, 6],
			admin: [3, 9],
			member: [8],
		},
		setting: {
			limit: { "2d": 200000, "3d": 30000 },
			defaultCloseAfterLimit: false,
			defaultLimit: { "2d": 10000, "3d": 10000 },
			defaultZ: { "2d": 80, "3d": 550 },
			defaultPercent: { "2d": 10, "3d": 12 },
			defaultCloseTime: { "2d": ["11:55", "4:25"], "3d": ["4:55"] },
		},
	},
];

export const groups = [
	{
		_id: new ObjectId("6144c3b05b1198e53e6e792f"),
		name: "group 1",
		type: "2d",
		owner: "bob",
		admin: "chris",
		members: [
			{
				handle: "dave",
				setting: { limit: 20000, z: 80, percent: 10, closeAfterLimit: false },
				bets: [{ numbers: "[[55,100],[22,10]]", resultTime: "2/2/2023T12:00" }],
			},
		],
		setting: {
			defaultLimit: 200000,
			defaultZ: 80,
			defaultPercent: 10,
			defaultCloseAfterLimit: false,
			closeTime: ["11:55", "4:55"],
		},
	},
];

export const types = [
	{ name: "MM 2D", code: "2d", resultTime: ["12:00", "16:30"], color: "red" },
	{ name: "3D", code: "3d", resultTime: ["16:30"], interval: "15", color: "yellow" },
];
