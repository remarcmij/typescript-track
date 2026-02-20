const name = 'Aisha'; // hover in VS Code: "Aisha" (literal)
let age = 27; // hover: number
const scores = [85, 92, 78]; // hover: number[]
const mixed = [1, 'two', true]; // hover: (string | number | boolean)[]

// Inference needs help: an empty array defaults to never[]
const items: string[] = [];
items.push('first');
items.push('second');

console.log(name, age, scores, mixed, items);
