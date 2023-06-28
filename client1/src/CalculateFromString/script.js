/* eslint-disable no-plusplus */
/* eslint-disable */

import {
	Bformat,
	EEOOformat,
	EO_Nformat,
	EO_Tformat,
	EOformat,
	KNformat,
	Kformat,
	NKformat,
	Nformat,
	OEformat,
	Pformat,
	Tformat,
} from "./functions";
import {
	isB,
	isDigS,
	isEE,
	isEN,
	isEO,
	isES,
	isET,
	isK,
	isKN,
	isKS,
	isN,
	isNK,
	isNormal,
	isOE,
	isON,
	isOO,
	isOS,
	isOT,
	isP,
	isR,
	isS,
	isT,
	isTwoR,
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
		.replaceAll(/\./g, " ")
		.replaceAll(/-/g, " ")
		.toUpperCase()
		.split("\n");

	sperateWithNextLine.map((i) => {
		i = i.trim().replaceAll(/\s{2,}/g, " ");

		if (isNormal(i)) {
			// 45 200, 45 46 200
			const lastSpaceIndex = i.lastIndexOf(" ");
			const numbers = i.slice(0, lastSpaceIndex);
			const money = i.slice(lastSpaceIndex + 1);

			numbers.split(" ").map((n) => {
				r.push([n, money]);
			});
		} else if (isR(i)) {
			// 45 R 100, 45 46 R 100
			console.log("hell");
			const numbers = i.split("R")[0].trim();
			const money = i.split("R")[1].trim();

			numbers.split(" ").map((n) => {
				const arr1 = [n, money];
				const arr2 = [n.split("").reverse().join(""), money];
				r.push(arr1, arr2);
			});
		} else if (isTwoR(i)) {
			// 45 200 R 100, 45 46 200 R 100
			const numbers = i.replaceAll(/\d{3,}|R/g, "").trim();
			const money = i.match(/\d{3,}/g);

			numbers.split(" ").map((n) => {
				const arr1 = [n, money[0]];
				const arr2 = [n.split("").reverse().join(""), money[1]];
				r.push(arr1, arr2);
			});
		} else if (isP(i)) {
			// 2 P 300, 2 3 P 300
			const numbers = i.split("P")[0].trim();
			const money = i.split("P")[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = Pformat(n, money);
				r.push(...arr);
			});
		} else if (isT(i)) {
			//5 T 200, 5 6 T 200
			const numbers = i.split("T")[0].trim();
			const money = i.split("T")[1].trim();

			numbers.mathc(/\d/g).map((n) => {
				const arr = Tformat(n, money);
				r.push(...arr);
			});
		} else if (isN(i)) {
			//5 N 200, 5 6 N 200
			const numbers = i.split("N")[0].trim();
			const money = i.split("N")[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = Nformat(n, money);
				r.push(...arr);
			});
		} else if (isB(i)) {
			//5 B 200, 5 6 B 200
			const numbers = i.split("B")[0].trim();
			const money = i.split("B")[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = Bformat(n, money);
				r.push(...arr);
			});
		} else if (isDigS(i)) {
			//5 S 200, 5 6 S 200
			const numbers = i.split("S")[0].trim();
			const money = i.split("S")[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = [n + n, money];
				r.push(arr);
			});
		} else if (isET(i) || isOT(i)) {
			//5 ET 200, 5 6 ET 200
			const type = isET(i) ? "ET" : "OT";
			const numbers = i.split(type)[0].trim();
			const money = i.split(type)[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = EO_Tformat(type, n, money);
				r.push(...arr);
			});
		} else if (isEN(i) || isON(i)) {
			//5 EN 200, 5 6 EN 200
			const type = isEN(i) ? "EN" : "ON";
			const numbers = i.split(type)[0].trim();
			const money = i.split(type)[1].trim();

			numbers.match(/\d/g).map((n) => {
				const arr = EO_Nformat(type, n, money);
				r.push(...arr);
			});
		} else if (isS(i)) {
			//S 100
			const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			const money = i.match(/\d{3,}/)[0];

			numbers.map((n) => {
				r.push([`${n}${n}`, money]);
			});
		} else if (isNK(i)) {
			//NK 100
			const money = i.match(/\d{3,}/)[0];

			const arr = NKformat(money);
			r.push(...arr);
		} else if (isKN(i)) {
			//KN 100
			const money = i.match(/\d{3,}/)[0];

			const arr = KNformat(money);
			r.push(...arr);
		} else if (isEO(i)) {
			//EO 100
			const money = i.match(/\d{3,}/)[0];

			const arr = EOformat(money);
			r.push(...arr);
		} else if (isOE(i)) {
			//OE 100
			const money = i.match(/\d{3,}/)[0];

			const arr = OEformat(money);
			r.push(...arr);
		} else if (isEE(i) || isOO(i)) {
			//EE 100, OO 100
			const type = isEE(i) ? "EE" : "OO";
			const money = i.match(/\d{3,}/)[0];

			const arr = EEOOformat(type, money);
			r.push(...arr);
		} else if (isES(i) || isOS(i)) {
			//ES 1000, OS 10000
			const numbers = isES(i) ? [0, 2, 4, 6, 8] : [1, 3, 5, 7, 9];
			const money = i.match(/\d{3,}/)[0];

			numbers.map((n) => {
				r.push([`${n}${n}`, money]);
			});
		} else if (isKS(i)) {
			//12345 KS 10000
			const numbers = i.split("KS")[0].trim();
			const money = i.split("KS")[1].trim();

			const arr_K = Kformat(numbers.match(/\d/g), money);
			const arr_S = numbers.match(/\d/g).map((n) => {
				return [`${n}${n}`, money];
			});
			r.push(...arr_K, ...arr_S);
		} else if (isK(i)) {
			//12345 K 10000
			const numbers = i.split("K")[0].trim();
			const money = i.split("K")[1].trim();

			const arr_K = Kformat(numbers.match(/\d/g), money);
			r.push(...arr_K);
		}
	});
	console.log(r);
};

export default stringToCalculteArr;
