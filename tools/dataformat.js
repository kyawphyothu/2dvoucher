const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

// let hash;
// hash = await bcrypt.hash("password", 10);

const hash = bcrypt.hashSync("password", 10);


//users
const users =
[
	{
		_id: new ObjectId('646fa2ef0d7361b34925370a'),
		name: 'Alice',
		handle: 'alice',
		password: hash,
		role: 'superadmin'
	},
	{
		_id: new ObjectId('646fa2f78b6443983ac9e6f2'),
		name: 'U Myint',
		handle: 'myint',
		password: hash,
		role: 'agent',
		multiply: [
			{
				type: 'mm2d',
				z: 80,
				limit: 100000,
			},
			{
				type: 'dubai2d',
				z: 85,
				limit: 50000,
			},
			{
				type: '3d',
				z: 500,
				limit: 0,
			}
		]
	},
	{
		_id: new ObjectId('646fa330bbcfdeb412db44bc'),
		name: 'U Soe',
		handle: 'soe',
		password: hash,
		role: 'agent',
		multiply: [
			{
				type: 'mm2d',
				z: 80,
				limit: 0,
			},
			{
				type: 'dubai2d',
				z: 85,
				limit: 400000,
			},
			{
				type: '3d',
				z: 500,
				limit: 0,
			}
		]
	},

]

//bettors
const bettors =
[
	{
		name: 'Bob',
		handle: 'b_randomText',	//b_ mean bettors
		password: hash,
		phone: '0912345678',
		agentId: new ObjectId('646fa2f78b6443983ac9e6f2'),
		role: 'subagent',
		bets: [
			{
				type: 'mm2d',
				name: 'မောင်ညွန့်',
				date: new Date('2023-01-01'),
				morning: true,
				voucher: "43 200 /n 23.24.60 100 /n 45 100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				// note: '',
				invest: 2400,
				win: ['43', 200], //only one
				revenue: 18000,
			},
			{
				type: 'mm2d',
				name: 'အောင်ထွေး',
				date: new Date('2023-01-01'),
				morning: false,
				voucher: "43 200 /n 23.24.60 100 /n 45 100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				// note: '',
				invest: 2400,
				win: false, //only one
				// revenue: 0,
			},
			{
				type: '3d',
				name: 'စောမင်း',
				date: new Date('2023-01-01'),
				voucher: "012.200 /n 567r100",
				threeD: {
					numbers: ['012', '567r'],
					prices: [200, 100]
				},
				// note: '',
				invest: 800,
				win: ['012', 200], //only one
				revenue: 100000,
			}
		],
	},
	{
		name: 'Mary',
		phone: '0912345677',
		agentId: new ObjectId('646fa2f78b6443983ac9e6f2'),
		bets: [
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: true,
				voucher: "48 200 /n 23.24.60 100 /n 45 100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				// note: '',
				invest: 2400,
				win: false, //only one
				// revenue: 0,
			},
			{
				type: 'mm2d',
				date: new Date('2023-01-01'),
				morning: false,
				voucher: "43 200 /n 23.24.60 100 /n 45 100R200 /n 56R700 /n 9p100 /n 2468k200 /n os100 /n es200 /n 4t100 /n 5n200",
				twoD: {
					numbers: ['43', '23', '24', '60', '45', '54', '56R', '9P', '2468k', 'os', 'es', '4t', '5n'],
					prices: [200, 100, 100, 100, 100, 200, 700, 100, 200, 100, 200, 100, 200]
				},
				// note: '',
				invest: 2400,
				win: false, //only one
				// revenue: 0,
			},
			{
				type: '3d',
				date: new Date('2023-01-01'),
				voucher: "012.011.013.200 /n 567r100 ",
				threeD: {
					numbers: ['012', '567r'],
					prices: [200, 100]
				},
				// note: '',
				invest: 800,
				win: [['012', 200], ['011', 200], ['013', 100]], //only one
				revenue: 115000,
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
		type: 'agent'
	},
	{
		type: 'subagent'
	}
]

module.exports = {
	users,
	bettors,
	bet_types,
	user_types,
	win_numbers
}



/*
ဂဏာန်းနှစ်ခုကြား (.) ထည့်
money ရှေ့မှာ R P T N K တို့မရှိရင် (space) ထည့်

43 200										43 200 ဖိုး
43.21 200									43 နဲ့ 21 200 ဖိုးစီ

43R200										43 R 200 ဖိုး
43.21R200									43 နဲ့ 21 R 200 ဖိုးစီ

43 200R100									43 200 ဖိုး 34 100 ဖိုး

4P100 ပတ်
4.5.6P100

4T100 ထိပ်
4.5.6T100

4N100 နောက်
4.5.6N100

12345K100 ခွေ

OS100	=>(odd same)မပူး
ES100	=>(even same)စုံပူး
AS100	=>(all same)အပူး ၁၀ ကွက်

*/

/*
const numbers = [

]
43R
43 34

4P
40 41 42 43 44 45 46 47 48 49 50

*/