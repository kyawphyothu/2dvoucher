/* eslint-disable no-plusplus */
/* eslint-disable */

import {
	Bformat,
	EEOOformat,
	EO_Nformat,
	EO_Tformat,
	EOformat,
	Nformat,
	OEformat,
	Pformat,
	Tformat,
} from "./functions";
import {
	isBreak,
	isDPuu,
	isDotBreak,
	isDotEN,
	isDotET,
	isDotNaud,
	isDotON,
	isDotOT,
	isDotPatt,
	isDotR,
	isDotSpaceR,
	isDotTade,
	isEE,
	isEN,
	isEO,
	isEPuu,
	isET,
	isKhway,
	isKhwayPuu,
	isKoNyi,
	isNaud,
	isNyiKo,
	isOE,
	isON,
	isOO,
	isOPuu,
	isOT,
	isPatt,
	isPuu,
	isR,
	isSpace,
	isSpaceR,
	isTade,
} from "./validation";

const stringToCalculteArr = (string) => {
	let r = [];

	const sperateWithNextLine = string
		.replaceAll("ညီကို", "NK")
		.replaceAll("ကိုညီ", "KN")
		.replaceAll("စုံထိပ်", "ET")
		.replaceAll("မထိပ်", "OT")
		.replaceAll("စုံကပ်", "EN")
		.replaceAll("မကပ်", "ON")
		.replaceAll("အာ", "R")
		.replaceAll("ပတ်", "P")
		.replaceAll("ထိပ်", "T")
		.replaceAll("နောက်", "N")
		.replaceAll("ဘရိတ်", "B")
		.replaceAll("စုံမ", "EO")
		.replaceAll("မစုံ", "OE")
		.replaceAll("စုံစုံ", "EE")
		.replaceAll("မမ", "OO")
		.replaceAll("အပူး", "S")
		.replaceAll("စုံပူး", "ES")
		.replaceAll("မပူး", "OS")
		.replaceAll("ပူး", "S")
		.replaceAll("ခွေပူး", "KS")
		.replaceAll("ခွေ", "K")
		.replaceAll(",", "")
		.replaceAll("၀", "0")
		.replaceAll("၁", "1")
		.replaceAll("၂", "2")
		.replaceAll("၃", "3")
		.replaceAll("၄", "4")
		.replaceAll("၅", "5")
		.replaceAll("၆", "6")
		.replaceAll("၇", "7")
		.replaceAll("၈", "8")
		.replaceAll("၉", "9")
		.replace(/(\s+|\.\s|-\s|\s\.|\s-)/g, " ")
		.toUpperCase()
		.split("\n");

	const sperateWithNumAndMoney = sperateWithNextLine.map((i) => {
		i = i.trim();
		if (/[ptnbkeos]/i.test(i) && !/r/i.test(i)) {
			i = i.replaceAll(" ", "");
		} else {
			i = i.replaceAll(/\s+/g, " ");
		}

		if (isSpace(i)) {
			//23 200
			const value = i.split(" ")[0];
			const money = i.split(" ")[1];
			r = [...r, [value, money]];
		} else if (isR(i)) {
			// 45R100
			const money = i.split("R")[1];
			const arr = [];
			arr[0] = [i.split("R")[0], money];
			arr[1] = [i.split("R")[0].split("").reverse().join(""), money];
			r = [...r, ...arr];
			return 1;
		} else if (isDotR(i)) {
			// 45.67R200
			const money = i.split("R")[1];
			i.split("R")[0]
				.split(".")
				.map((value, index) => {
					const arr = [];
					arr[0] = [value, money];
					arr[1] = [value.split("").reverse().join(""), money];
					r = [...r, ...arr];
					return 1;
				});
			return 1;
		} else if (isSpaceR(i)) {
			// 45 200R100
			const money = i.split(/[ R]/)[1];
			const moneyR = i.split(/[ R]/)[2];
			const arr = [];
			arr[0] = [i.split(/[ R]/)[0], money];
			arr[1] = [i.split(/[ R]/)[0].split("").reverse().join(""), moneyR];
			r = [...r, ...arr];
		} else if (isDotSpaceR(i)) {
			// 45.67 100R200
			const money = i.split(" ")[1].split("R")[0];
			const moneyR = i.split(" ")[1].split("R")[1];
			i.split(/[ -]/)[0]
				.split(".")
				.map((value, index) => {
					const arr = [];
					arr[0] = [value, money];
					arr[1] = [value.split("").reverse().join(""), moneyR];
					r = [...r, ...arr];
					return 1;
				});
			return 1;
		} else if (isPatt(i)) {
			// 4P100
			const money = i.split("P")[1];
			const arr = Pformat(i.split("P")[0], money);
			r = [...r, ...arr];
			return 1;
		} else if (isDotPatt(i)) {
			// 3.4P100
			const money = i.split("P")[1];
			i.split("P")[0]
				.split(".")
				.map((value, index) => {
					const arr = Pformat(value, money);
					r = [...r, ...arr];
					return 1;
				});
			return 1;
		} else if (isTade(i)) {
			//5T100
			const value = i.split("T")[0];
			const money = i.split("T")[1];
			const arr = Tformat(value, money);
			r.push(...arr);
		} else if (isDotTade(i)) {
			//5.6T100
			const values = i.split("T")[0];
			const money = i.split("T")[1];
			values.split(".").map((value) => {
				const arr = Tformat(value, money);
				r.push(...arr);
			});
		} else if (isNaud(i)) {
			//5N100
			const value = i.split("N")[0];
			const money = i.split("N")[1];
			const arr = Nformat(value, money);
			r.push(...arr);
		} else if (isDotNaud(i)) {
			// 5.6N100
			const values = i.split("N")[0];
			const money = i.split("N")[1];
			values.split(".").map((value) => {
				const arr = Nformat(value, money);
				r.push(...arr);
			});
		} else if (isBreak(i)) {
			//5B100
			const value = i.split("B")[0];
			const money = i.split("B")[1];
			const arr = Bformat(value, money);
			r.push(...arr);
		} else if (isDotBreak(i)) {
			//5.6B100
			const values = i.split("B")[0];
			const money = i.split("B")[1];
			values.split(".").map((value) => {
				const arr = Bformat(value, money);
				r.push(...arr);
			});
		} else if (isNyiKo(i)) {
			//01 12 23 34 45 56 67 78 89 90
			const money = i.replace("NK", "");
			const arr = () => {
				let result = [];
				for (let i = 0; i < 10; i++) {
					result.push([`${i}${i === 9 ? 0 : i + 1}`, money]);
				}
				return result;
			};
			r.push(...arr());
		} else if (isKoNyi(i)) {
			// 09 98 87 76 65 54 43 32 21 10
			const money = i.replace("KN", "");
			const arr = () => {
				let result = [];
				for (i = 9; i >= 0; i--) {
					result.push([`${i === 9 ? 0 : i + 1}${i}`, money]);
				}
				return result;
			};
			r.push(...arr());
		} else if (isEO(i)) {
			//01 03 05 07 09 21 23 25 27 29 etc
			const money = i.replace("EO", "");
			const arr = EOformat(money);
			r.push(...arr);
		} else if (isOE(i)) {
			//12 14 16 18 32 34 36 38 etc
			const money = i.replace("OE", "");
			const arr = OEformat(money);
			r.push(...arr);
		} else if (isEE(i)) {
			//00 02 04 06 08 20 22 etc
			const money = i.replace("EE", "");
			const arr = EEOOformat("EE", money);
			r.push(...arr);
		} else if (isOO(i)) {
			//11 13 15 17 19 31 33 35 etc
			const money = i.replace("OO", "");
			const arr = EEOOformat("OO", money);
			r.push(...arr);
		} else if (isET(i)) {
			//1E100
			const value = i.split("ET")[0];
			const money = i.split("ET")[1];
			const arr = EO_Tformat("ET", value, money);
			r.push(...arr);
		} else if (isDotET(i)) {
			//1.2ET100
			const values = i.split("ET")[0];
			const money = i.split("ET")[1];
			values.split(".").map((value) => {
				const arr = EO_Tformat("ET", value, money);
				r.push(...arr);
			});
		} else if (isOT(i)) {
			//2OT200
			const value = i.split("OT")[0];
			const money = i.split("OT")[1];
			const arr = EO_Tformat("OT", value, money);
		} else if (isDotOT(i)) {
			//2.3OT200
			const values = i.split("OT")[0];
			const money = i.split("OT")[1];
			values.split(".").map((value) => {
				const arr = EO_Tformat("OT", value, money);
				r.push(...arr);
			});
		} else if (isEN(i)) {
			//3en100
			const value = i.split("EN")[0];
			const money = i.split("EN")[1];
			const arr = EO_Nformat("EN", value, money);
			r.push(...arr);
		} else if (isDotEN(i)) {
			//3.4en100
			const values = i.split("EN")[0];
			const money = i.split("EN")[1];
			values.split(".").map((value) => {
				const arr = EO_Nformat("EN", value, money);
				r.push(...arr);
			});
		} else if (isON(i)) {
			//3on100
			const value = i.split("ON")[0];
			const money = i.split("ON")[1];
			const arr = EO_Nformat("ON", value, money);
			r.push(...arr);
		} else if (isDotON(i)) {
			//2.3on200
			const values = i.split("ON")[0];
			const money = i.split("ON")[1];
			values.split(".").map((value) => {
				const arr = EO_Nformat("ON", value, money);
				r.push(...arr);
			});
		} else if (isPuu(i)) {
			//S100
			const money = i.replace("S", "");
			const arr = (() => {
				let result = [];
				for (let j = 0; j < 10; j++) {
					result.push([`${j}${j}`, money]);
				}
				return result;
			})();
			r.push(...arr);
		} else if (isDPuu(i)) {
			//1234S100
			const values = i.split("S")[0];
			const money = i.split("S")[1];
			values.split("").map((value) => {
				return r.push([`${value}${value}`, money]);
			});
		} else if (isEPuu(i)) {
			//00 22 44
			const money = i.replace("ES", "");
			const arr = (() => {
				const result = [];
				for (let j = 0; j < 10; j += 2) {
					result.push([`${j}${j}`, money]);
				}
				return result;
			})();
			r.push(...arr);
		} else if (isOPuu(i)) {
			// 11 33 55
			const money = i.replace("OS", "");
			const arr = (() => {
				const result = [];
				for (let j = 1; j < 10; j += 2) {
					result.push([`${j}${j}`, money]);
				}
				return result;
			})();
			r.push(...arr);
		} else if (isKhwayPuu(i)) {
			// some
		} else if (isKhway(i)) {
			// some
		}
		return false;
	});

	r.map((value, index) => {
		if (value[0].indexOf(".") !== -1) {
			const lastIndex = value[1];
			const nums = value[0].split(".");
			const arr = nums.map((n) => [n, lastIndex]);
			r = [...r, ...arr];
			return 1;
		}
		return 1;
	});
	r = r.filter((value, index) => {
		const regex = /[.]/;
		return !regex.test(value[0]);
	});
	console.log(r);
};

export default stringToCalculteArr;
