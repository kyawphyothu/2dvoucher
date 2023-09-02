const friend = [
	{
		$lookup: {
			from: "users",
			localField: "friend.friends",
			foreignField: "handle",
			as: "friends",
		},
	},
	{
		$lookup: {
			from: "users",
			localField: "friend.requests",
			foreignField: "handle",
			as: "requests",
		},
	},
	{
		$lookup: {
			from: "users",
			localField: "friend.pending",
			foreignField: "handle",
			as: "pending",
		},
	},
	{
		$lookup: {
			from: "users",
			localField: "friend.cancled",
			foreignField: "handle",
			as: "cancled",
		},
	},
	{
		$project: {
			"friends.handle": 1,
			"friends.picture": 1,
			"requests.handle": 1,
			"requests.picture": 1,
			"pending.handle": 1,
			"pending.picture": 1,
			"cancled.handle": 1,
			"cancled.picture": 1,
		},
	},
];

const groups = [
	{
		$lookup: {
			from: "groups",
			localField: "group.own",
			foreignField: "_id",
			pipeline: [
				{
					$sort: { _id: -1 },
				},
			],
			as: "own",
		},
	},
	{
		$lookup: {
			from: "groups",
			localField: "group.admin",
			foreignField: "_id",
			pipeline: [
				{
					$sort: { _id: -1 },
				},
			],
			as: "admin",
		},
	},
	{
		$lookup: {
			from: "groups",
			localField: "group.member",
			foreignField: "_id",
			pipeline: [
				{
					$sort: { _id: -1 },
				},
			],
			as: "member",
		},
	},
	{
		$project: {
			"own._id": 1,
			"own.owner": 1,
			"own.admin": 1,
			"own.name": 1,
			"own.type": 1,
			"admin._id": 1,
			"admin.owner": 1,
			"admin.admin": 1,
			"admin.name": 1,
			"admin.type": 1,
			"member._id": 1,
			"member.owner": 1,
			"member.admin": 1,
			"member.name": 1,
			"member.type": 1,
		},
	},
];
module.exports = { friend, groups };
