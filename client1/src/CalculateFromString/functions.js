/* eslint-disable */
const E = [0, 2, 4, 6, 8];
const O = [1, 3, 5, 7, 9];

export const replaceAllNumbers = (from, to) => {
	from = from.split("");
	to = to.split("");
	let result = this;

	for (let i = 0; i < from.length; i++) {
		result = result.replaceAll(from[i], to[i]);
	}
	return result;
};

export const Pformat = (number, money) => {
	let result = [];
	for (let i = 0; i < 20; i++) {
		let arr = [];
		if (i < 10) {
			arr = [`${i}${number}`, money];
			result = [...result, arr];
		} else if (i >= 10) {
			if (i - 10 === parseInt(number, 10)) {
				i++;
			}
			arr = [`${number}${i - 10}`, money];
			result = [...result, arr];
		}
	}
	return result;
};

export const Tformat = (number, money) => {
	let result = [];
	for (let i = 0; i < 10; i++) {
		result.push([number + i, money]);
	}
	return result;
};

export const Nformat = (number, money) => {
	let result = [];
	for (let i = 0; i < 10; i++) {
		result.push([i + number, money]);
	}
	return result;
};

export const Bformat = (number, money) => {
	let result = [];
	for (let i = 0; i <= parseInt(number); i++) {
		result.push([String(i) + (parseInt(number) - i), money]);
	}
	return result;
};

export const NKformat = (money) => {
	const result = [];
	for (let i = 0; i < 10; i++) {
		result.push([`${i}${i === 9 ? 0 : i + 1}`, money]);
	}
	return result;
};
export const KNformat = (money) => {
	const result = [];
	for (let i = 9; i >= 0; i--) {
		result.push([`${i !== 9 ? i + 1 : 0}${i}`, money]);
	}
	return result;
};
export const EOformat = (money) => {
	const result = [];
	for (let i = 0; i < E.length; i++) {
		for (let j = 0; j < O.length; j++) {
			result.push([`${E[i]}${O[j]}`, money]);
		}
	}
	return result;
};
export const OEformat = (money) => {
	const result = [];
	for (let i = 0; i < O.length; i++) {
		for (let j = 0; j < E.length; j++) {
			result.push([`${O[i]}${E[j]}`, money]);
		}
	}
	return result;
};

export const EEOOformat = (type, money) => {
	const result = [];
	if (type === "EE") {
		for (let i = 0; i < E.length; i++) {
			for (let j = 0; j < E.length; j++) {
				result.push([`${E[i]}${E[j]}`, money]);
			}
		}
	} else if (type === "OO") {
		for (let i = 0; i < O.length; i++) {
			for (let j = 0; j < O.length; j++) {
				result.push([`${O[i]}${O[j]}`, money]);
			}
		}
	}
	return result;
};

export const EO_Tformat = (type, number, money) => {
	const result = [];
	if (type === "ET") {
		E.map((e) => {
			result.push([`${e}${number}`, money]);
		});
	} else if (type === "OT") {
		O.map((o) => {
			result.push([`${o}${number}`, money]);
		});
	}
	return result;
};
export const EO_Nformat = (type, number, money) => {
	const result = [];
	if (type === "EN") {
		E.map((e) => {
			result.push([`${number}${e}`, money]);
		});
	} else if (type === "ON") {
		O.map((o) => {
			result.push([`${number}${o}`, money]);
		});
	}
	return result;
};

export const Kformat = (arr, money) => {
	const result = [];
	arr.map((value, index) => {
		for (let i = 0; i < arr.length; i++) {
			if (i !== index) {
				// i++;
				result.push([`${value}${arr[i]}`, money]);
			}
		}
	});
	return result;
};
