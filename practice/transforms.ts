type Transformer<T> = (value: T) => T;

function pipe<T>(value: T, ...fns: Transformer<T>[]): T {
  return fns.reduce((acc, fn) => fn(acc), value);
}

const double: Transformer<number> = (n) => n * 2;
const addTen: Transformer<number> = (n) => n + 10;
const clamp0to100: Transformer<number> = (n) => Math.max(0, Math.min(100, n));

console.log(pipe(45, double, addTen, clamp0to100)); // 100
console.log(pipe(3, double, addTen, clamp0to100)); // 16
console.log(pipe(60, double, addTen, clamp0to100)); // 100

const trim: Transformer<string> = (s) => s.trim();
const uppercase: Transformer<string> = (s) => s.toUpperCase();
const exclaim: Transformer<string> = (s) => `${s}!`;

console.log(pipe("  hello world  ", trim, uppercase, exclaim)); // "HELLO WORLD!"
