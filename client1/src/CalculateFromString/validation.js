/* eslint-disable */

export const isSpace = (string) => {
	if (/^\d{2}[-\s]\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isR = (string) => {
	if (/^\d{2}R\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotR = (string) => {
	// 43.56R100
	if (/^\d{2}(.\d{2})+R\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isSpaceR = (string) => {
	//43 200R100
	if (/^\d{2}[-\s]\d+R\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotSpaceR = (string) => {
	// 45.78 200R100
	if (/^\d{2}(.\d{2})+[-\s]\d+R\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isPatt = (string) => {
	// 5P100
	if (/^\d{1}P\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotPatt = (string) => {
	// 5.6P100
	if (/^\d{1}(.\d{1})+P\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isTade = (string) => {
	// 5T100
	if (/^\d{1}T\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotTade = (string) => {
	// 5.6T100
	if (/^\d{1}(.\d{1})+T\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isNaud = (string) => {
	// 5N100
	if (/^\d{1}N\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotNaud = (string) => {
	// 5.6N100
	if (/^\d{1}(.\d{1})+N\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isBreak = (string) => {
	// 5B100
	if (/^\d{1}B\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotBreak = (string) => {
	// 4.5B100
	if (/^\d{1}(.\d{1})+B\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isNyiKo = (string) => {
	// NK100
	if (/^NK\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isKoNyi = (string) => {
	// KN100
	if (/^KN\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isEO = (string) => {
	// EO100
	if (/^EO\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isOE = (string) => {
	//OE100
	if (/^OE\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isEE = (string) => {
	//EE100
	if (/^EE\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isOO = (string) => {
	// OO100
	if (/^OO\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isET = (string) => {
	//3ET100
	if (/^\dET\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotET = (string) => {
	//3.4ET100
	if (/^\d(\.\d)+ET\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isOT = (string) => {
	// 3OT100
	if (/^\dOT\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotOT = (string) => {
	// 3.4OT100
	if (/^\d(\.\d)+OT\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isEN = (string) => {
	//3EN100
	if (/^\dEN\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotEN = (string) => {
	//3.4EN100
	if (/^\d(\.\d)+EN\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isON = (string) => {
	// 3ON100
	if (/^\dON\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDotON = (string) => {
	// 3.4ON100
	if (/^\d(\.\d)+ON\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isPuu = (string) => {
	// S100
	if (/^S\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isDPuu = (string) => {
	//1234S100 or 1.2.3S100
	if (/^\d+S\d+$/) {
		return true;
	}
	return false;
};
export const isEPuu = (string) => {
	// ES100
	if (/^ES\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isOPuu = (string) => {
	// OS100
	if (/^OS\d+$/.test(string)) {
		return true;
	}
	return false;
};

export const isKhway = (string) => {
	// 3456K100
	if (/^\d+K\d+$/.test(string)) {
		return true;
	}
	return false;
};
export const isKhwayPuu = (string) => {
	// 3456KS100
	if (/^\d+KS\d+$/.test(string)) {
		return true;
	}
	return false;
};
