# Function Types and Return Types

Functions in TypeScript can have typed parameters and return values.

## Typing Parameters and Returns

You annotate function parameters the same way as variables — with `: type` after the name. The return type goes after the parameter list:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Here `a: number` and `b: number` annotate the two parameters, and `: number` after the closing parenthesis annotates the return type. If the function tried to return a string, TypeScript would flag the mismatch.

## Optional and Default Parameters

A parameter with a default value (`= 'Hello'`) doesn't need to be passed by the caller — the default is used instead. A parameter marked with `?` is optional and will be `undefined` if not provided:

```ts
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}`;
}

function log(message: string, userId?: string): void {
  // userId is string | undefined
  console.log(userId ? `[${userId}] ${message}` : message);
}
```

In `greet`, you can call `greet('Aisha')` and `greeting` defaults to `'Hello'`. In `log`, the `?` after `userId` makes it optional — its type becomes `string | undefined`, so you must check for it before using string operations.

The return type `: void` on `log` means the function doesn't return a meaningful value.

## Function Type Expressions

You can describe the type of a function itself — not just its parameters and return, but the whole function as a value. This is common when passing callbacks:

```ts
type Formatter = (value: number) => string;

function applyFormat(value: number, format: Formatter): string {
  return format(value);
}

applyFormat(1000, (n) => `$${n.toFixed(2)}`);
```

`Formatter` describes a function that takes a `number` and returns a `string`. The `=>` here is part of the type syntax (not an arrow function) — it separates the parameters from the return type. The `applyFormat` function accepts any function matching that shape as its second argument.

## Typing Arrow Functions

Arrow functions use the same annotation syntax — `: type` after each parameter and after the parameter list for the return type:

```ts
const multiply = (a: number, b: number): number => a * b;
```

## Void vs Never

Two special return types worth knowing:

- `void` means the function doesn't return a meaningful value (like `console.log`)
- `never` means the function never returns at all (it throws or loops forever)

```ts
function logMessage(msg: string): void {
  console.log(msg);
}

function throwError(msg: string): never {
  throw new Error(msg);
}
```

`logMessage` runs and finishes, but its return value isn't useful. `throwError` never finishes — it always throws, so no code after it will ever run.

> **Hands on:** Write a higher-order function `applyTwice` that takes a number and a callback of type `(n: number) => number`, applies the callback twice, and returns the result. Call it with different arrow functions.

<details>
<summary>Show code</summary>

Save as `function-types.ts` and run with `node function-types.ts`.

```ts
type Transform = (n: number) => number;

function applyTwice(value: number, fn: Transform): number {
  return fn(fn(value));
}

console.log(applyTwice(3, (n) => n * 2)); // 3 → 6 → 12
console.log(applyTwice(10, (n) => n + 1)); // 10 → 11 → 12
console.log(applyTwice(100, (n) => n / 2)); // 100 → 50 → 25
```

Try changing the callback signature (e.g., `(n: string) => string`) and see how TypeScript catches the mismatch.

</details>
