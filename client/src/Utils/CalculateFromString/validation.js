/* eslint-disable */

// let regrex = /^\d{2}[\s-\.](\d{2}[\s-\.])*\d{3,}$/								//space
// let regrex = /^\d{2}[\s-\.]?(\d{2}[\s-\.]?)*R[\s-\.]?\d{3,}$/					//R
// let regrex = /^\d{2}[\s-\.](\d{2}[\s-\.])*\d{3}[\s-\.]?R[\s-\.]?\d{3}$/			//2R

// let regrex = /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*P[\s-\.]?\d{3,}$/					//P
// let regrex = /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*T[\s-\.]?\d{3,}$/					//T
// let regrex = /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*N[\s-\.]?\d{3,}$/					//N
// let regrex = /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*B[\s-\.]?\d{3,}$/					//B
// let regrex = /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*S[\s-\.]?\d{3,}$/					//DS ET OT EN ON

// let regrex = /^S[\s-\.]?\d{3,}$/													//S NK KN EO OE EE OO ES OS

// let regrex = /^(\d{1}[\s-\.]?){3,}K[\s-\.]?\d{3,}$/								//K
let regex = {
	normal: /^\d{2}[\s-\.](\d{2}[\s-\.])*\d{3,}$/,
	R: /^\d{2}[\s-\.]?(\d{2}[\s-\.]?)*R[\s-\.]?\d{3,}$/,
	twoR: /^\d{2}[\s-\.](\d{2}[\s-\.])*\d{3,}[\s-\.]?R[\s-\.]?\d{3,}$/,
	P: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*P[\s-\.]?\d{3,}$/,
	T: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*T[\s-\.]?\d{3,}$/,
	N: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*N[\s-\.]?\d{3,}$/,
	B: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*B[\s-\.]?\d{3,}$/,
	DigS: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*S[\s-\.]?\d{3,}$/,
	ET: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*ET[\s-\.]?\d{3,}$/,
	OT: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*OT[\s-\.]?\d{3,}$/,
	EN: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*EN[\s-\.]?\d{3,}$/,
	ON: /^\d{1}[\s-\.]?(\d{1}[\s-\.]?)*ON[\s-\.]?\d{3,}$/,
	S: /^S[\s-\.]?\d{3,}$/,
	NK: /^NK[\s-\.]?\d{3,}$/,
	KN: /^KN[\s-\.]?\d{3,}$/,
	EO: /^EO[\s-\.]?\d{3,}$/,
	OE: /^OE[\s-\.]?\d{3,}$/,
	EE: /^EE[\s-\.]?\d{3,}$/,
	OO: /^OO[\s-\.]?\d{3,}$/,
	ES: /^ES[\s-\.]?\d{3,}$/,
	OS: /^OS[\s-\.]?\d{3,}$/,
	K: /^(\d{1}[\s-\.]?){3,}K[\s-\.]?\d{3,}$/,
	KS: /^(\d{1}[\s-\.]?){3,}KS[\s-\.]?\d{3,}$/,
};

//FOR NORMAL AND R
export const isNormal = (i) => {
	if (regex.normal.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isR = (i) => {
	if (regex.R.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isTwoR = (i) => {
	if (regex.twoR.test(i)) {
		return true;
	} else {
		return false;
	}
};

//FOR DIGIT {SOME} DIGIT
export const isP = (i) => {
	if (regex.P.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isT = (i) => {
	if (regex.T.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isN = (i) => {
	if (regex.N.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isB = (i) => {
	if (regex.B.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isDigS = (i) => {
	if (regex.DigS.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isET = (i) => {
	if (regex.ET.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isOT = (i) => {
	if (regex.OT.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isEN = (i) => {
	if (regex.EN.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isON = (i) => {
	if (regex.ON.test(i)) {
		return true;
	} else {
		return false;
	}
};

//FOR {SOME} DIGIT
export const isS = (i) => {
	if (regex.S.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isNK = (i) => {
	if (regex.NK.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isKN = (i) => {
	if (regex.KN.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isEO = (i) => {
	if (regex.EO.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isOE = (i) => {
	if (regex.OE.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isEE = (i) => {
	if (regex.EE.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isOO = (i) => {
	if (regex.OO.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isES = (i) => {
	if (regex.ES.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isOS = (i) => {
	if (regex.OS.test(i)) {
		return true;
	} else {
		return false;
	}
};

//FOR K AND KS
export const isK = (i) => {
	if (regex.K.test(i)) {
		return true;
	} else {
		return false;
	}
};
export const isKS = (i) => {
	if (regex.KS.test(i)) {
		return true;
	} else {
		return false;
	}
};
