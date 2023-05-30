// const inputString = `42.200R100
// 53 57 100R200
// 58-40R70`;

// let a = inputString.split("\n");
// let result = [];
// result = a.map((line) => {
// 	return line.split(/[.R\s-]/)
// })

// console.log(result);


// const inputString = `42.200R100
// 53 57 100R200
// 58-40R70`;

// const result = inputString.split('\n').map((line) => {
//   const values = line.split(/[.\s-]|(?<=R)/);
//   return values.filter(Boolean);
// });

// console.log(result);


const inputString = `42.200R100
53 57 100R200
58-40R70`;

const result = inputString.split('\n').map((line) => {
  const values = line.split(/[\s-]|(?=R)/);
  return values.filter(Boolean);
});

console.log(result);
