/** @format */

const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const userss  = require('./data/users');
const hash = bcrypt.hashSync('password', 10);

const users = [
	...userss
];

const groups = [
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
		defaultAccept: false,
	},
];

const messages = [
	{
		_id: new ObjectId(),
		groupd_id: new ObjectId("6144c3b05b1198e53e6e792f"),
		sender_id: new ObjectId("646fa2f78b6443983ac9e6f2"),
		is_bet: false,
		subject: "some"
	},
	{
		_id: new ObjectId(),
		groupd_id: new ObjectId("6144c3b05b1198e53e6e792f"),
		sender_id: new ObjectId("646fa2f78b6443983ac9e6f2"),
		is_bet: true,
		subject: [["34", "200"], ["67", "100"]],
		is_accepted: false,
		type: "mm",
		time: ""
	}
]

// const bets = [
// 	{
// 		_id: new ObjectId(),
// 		group_id: new ObjectId("6144c3b05b1198e53e6e792f"),
// 		bettor: "chris",
// 		values: [["34", "200"], ["67", "100"]],

// 	}
// ]

const types = [
	{ name: "MM 2D", code: "2d", resultTime: ["12:00", "16:30"], color: "red" },
	{ name: "3D", code: "3d", resultTime: ["16:30"], interval: "15", color: "yellow" },
];

module.exports = {
	users, groups, types, messages
}
