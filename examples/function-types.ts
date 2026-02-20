type Transform = (n: number) => number;

function applyTwice(value: number, fn: Transform): number {
  return fn(fn(value));
}

console.log(applyTwice(3, (n) => n * 2)); // 3 → 6 → 12
console.log(applyTwice(10, (n) => n + 1)); // 10 → 11 → 12
console.log(applyTwice(100, (n) => n / 2)); // 100 → 50 → 25
