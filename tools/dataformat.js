/** @format */

const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync('password', 10);

//users
const users = [
	{
		_id: new ObjectId('646fa2ef0d7361b34925370a'),
		name: 'Alice',
		handle: 'alice',
		password: hash,
		role: 'superadmin',
	},
	{
		_id: new ObjectId('646fa2f78b6443983ac9e6f2'),
		name: 'Bob',
		phone: '0912345678',
		handle: 'bob',
		password: hash,
		friends: ['chris', 'dave', 'eve'],
		fRequest: ['frank', 'gina', 'hugo'],
		fCancled: ['joe', 'kate'],
		defaultType: '2d',
		defaultAcceptor: [
			{
				type: '2d',
				handle: 'chris',
			},
			{
				type: 'du2d',
				name: 'U Myint',
			},
		],
		limit: {
			'2d': 200000,
			du2d: 4000000,
		},
		betFrom: [
			{
				type: '2d',
				dateTime: '12pm',
				bettorHandle: 'dave',
				voucher: [
					['12', 20000],
					['53', 10000],
				],
			},
			{
				type: 'du2d',
				dateTime: '5pm',
				bettorName: 'Aung Lin',
				voucher: [
					['09', 500],
					['43', 200],
				],
			},
		],
		betTo: [
			{
				type: '2d',
				dateTime: '12pm',
				bettorName: 'saw',
				acceptorHandle: 'chris',
				voucher: [
					['12', 1000],
					['53', 1000],
				],
			},
			{
				type: 'du2d',
				dateTime: '5pm',
				acceptorName: 'Tim',
				voucher: [['09', 100]],
			},
		],
	},
	{
		name: 'Chris',
		phone: '0912345678',
		handle: 'chris',
		password: hash,
		friends: ['alice'],
		fRequest: ['frank', 'gina', 'hugo'],
		fCancled: ['joe', 'kate'],
		defaultType: '2d',
		defaultAcceptor: [
			{
				type: '2d',
				handle: '',
			},
			{
				type: 'du2d',
				name: 'U Myint',
			},
		],
		limit: {
			'2d': 200000,
			du2d: 4000000,
		},
		betFrom: [
			{
				type: '2d',
				dateTime: '12pm',
				handle: 'bob',
				voucher: [
					['12', 1000],
					['53', 1000],
				],
			},
			{
				type: 'du2d',
				dateTime: '5pm',
				name: 'Aung Lin',
				voucher: [
					['09', 500],
					['43', 200],
				],
			},
		],
		betTo: [],
	},
	{
		name: 'Dave',
		phone: '0912345678',
		handle: 'dave',
		password: hash,
		friends: ['bob'],
		fRequest: ['frank', 'gina', 'hugo'],
		fCancled: ['joe', 'kate'],
		defaultType: '2d',
		defaultAcceptor: [
			{
				type: '2d',
				handle: 'bob',
			},
			{
				type: 'du2d',
				name: 'U Myint',
			},
		],
		limit: {},
		betFrom: [],
		betTo: [
			{
				type: '2d',
				dateTime: '12pm',
				handle: 'bob',
				voucher: [
					['12', 20000],
					['53', 10000],
				],
			},
			{
				type: 'du2d',
				dateTime: '5pm',
				name: 'Tim',
				voucher: [['09', 100]],
			},
		],
	},
];

//hists
const hits = [
	{
		type: '2d',
		dateTime: '12pm',
		hitNumber: '32',
	},
	{
		type: '2d',
		dateTime: '4pm',
		hitNumber: '10',
	},
];

//bet_types
const bet_types = [
	{
		type: 'mm2d',
		name: 'MM 2D',
	},
	{
		type: 'du2d',
		name: 'Dubai 2D',
	},
	{
		type: 'ga2d',
		name: 'Golden ACE 2D',
	},
	{
		type: 'mg2d',
		name: 'Mega 2D',
	},
	{
		type: '3d',
		name: '3D',
	},
];

//user_types
const user_types = [
	{
		type: 'superadmin',
	},
	{
		type: 'agent',
	},
	{
		type: 'subagent',
	},
];

module.exports = {
	users,
	bet_types,
	user_types,
};

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
