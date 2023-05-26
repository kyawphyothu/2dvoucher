const { MongoClient, ObjectId } = require("mongodb");

//users
const users =
[
	{
		_id: new ObjectId('646fa2ef0d7361b34925370a'),
		name: 'Alice',
		username: 'alice',
		password: 'somepass',
		role: 'superadmin'
	},
	{
		_id: new ObjectId('646fa2f78b6443983ac9e6f2'),
		name: 'U Myint',
		username: 'myint',
		password: 'somepass',
		role: 'owner',
		multiply: [
			{
				type: 'mm2d',
				z: 80,
			},
			{
				type: 'dubai2d',
				z: 85,
			},
			{
				type: '3d',
				z: 500,
			}
		]
	},
	{
		_id: new ObjectId('646fa330bbcfdeb412db44bc'),
		name: 'U Soe',
		username: 'soe',
		password: 'somepass',
		role: 'owner',
		multiply: [
			{
				type: 'mm2d',
				z: 80,
			},
			{
				type: 'dubai2d',
				z: 85,
			},
			{
				type: '3d',
				z: 500,
			}
		]
	},

]

//bettors
const bettors =
[
	{
		name: 'Bob',
		phone: '0912345678',
		ownerId: new ObjectId('646fa2f78b6443983ac9e6f2'),
		bets: [
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: true,
				voucher: "43.200 /n 23.24.60.100 /n 45.100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				note: '',
				invest: 2400,
				paid: 2400,
				win: [43, 200], //only one
				revenue: 18000,
				get: 18000,
				// debt: 0,
			},
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: false,
				voucher: "43.200 /n 23.24.60.100 /n 45.100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				note: '',
				invest: 2400,
				paid: 2000,
				win: false, //only one
				// revenue: 0,
				// get: 0,
				debt: 400,
			},
			{
				type: '3d',
				date: new Date('2023-01-01'),
				voucher: "012.200 /n 567r100",
				threeD: {
					numbers: ['012', '567r'],
					prices: [200, 100]
				},
				note: '',
				invest: 800,
				paid: 100,
				win: [012, 200], //only one
				revenue: 100000,
				get: 99300,
				// debt: 0,
			}
		],
	},
	{
		name: 'Mary',
		phone: '0912345677',
		ownerId: new ObjectId('646fa2f78b6443983ac9e6f2'),
		bets: [
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: true,
				voucher: "48.200 /n 23.24.60.100 /n 45.100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				note: '',
				invest: 2400,
				paid: 2400,
				win: false, //only one
				// revenue: 0,
				// get: 0,
				// debt: 0,
			},
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: false,
				voucher: "43.200 /n 23.24.60.100 /n 45.100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				note: '',
				invest: 2400,
				paid: 2100,
				win: false, //only one
				// revenue: 0,
				// get: 0,
				debt: 300,
			},
			{
				type: '3d',
				date: new Date('2023-01-01'),
				voucher: "012.011.013.200 /n 567r100 ",
				threeD: {
					numbers: ['012', '567r'],
					prices: [200, 100]
				},
				note: '',
				invest: 800,
				paid: 800,
				win: [012, 200], //only one
				toot: [[011, 200], [013, 100]],
				revenue: 115000,
				get: 115000,
				// debt: 0,
			}
		],
	}
]

//win_numbers
const win_numbers =
[
	{
		type: 'mm2d',
		date: new Date("2023-01-01"),
		morning: true,
		number: 43,
	},
	{
		type: 'mm2d',
		date: new Date("2023-01-01"),
		morning: false,
		number: 00,
	},
	{
		type: '3d',
		date: new Date("2023-01-01"),
		number: 666,
	},

]

//bet_types
const bet_types =
[
	{
		type: 'mm2d',
	},
	{
		type: 'dubai2d',
	},
	{
		type: '3d'
	}
]

//user_types
const user_types =
[
	{
		type: 'superadmin',
	},
	{
		type: 'owner'
	}
]

module.exports = {
	users,
	bettors,
	bet_types,
	user_types,
	win_numbers
}