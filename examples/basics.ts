let city: string = 'Amsterdam';
let population: number = 905_234;
let isCapital: boolean = true;

let temperatures: number[] = [14, 16, 19, 22, 18];

let country: { name: string; continent: string; population: number } = {
  name: 'Netherlands',
  continent: 'Europe',
  population: 17_900_000,
};

function describe(value: string | number): string {
  if (typeof value === 'string') {
    return `Text: ${value}`;
  }
  return `Number: ${value}`;
}

console.log(city, population, isCapital);
console.log('Temperatures:', temperatures);
console.log(country);
console.log(describe('hello'));
console.log(describe(42));
