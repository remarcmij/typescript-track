# Type Inference and Annotations

TypeScript doesn't require you to annotate every single value. It can **infer** types from context, and often does so perfectly well.

## Inference in Action

When you assign a value, TypeScript looks at the right-hand side and figures out the type for you:

```ts
let name = 'Aisha'; // TypeScript infers: string
let age = 27; // TypeScript infers: number
let scores = [85, 92, 78]; // TypeScript infers: number[]

const greeting = 'hello'; // TypeScript infers: "hello" (literal type, because const)
```

Notice the difference between `let` and `const`: `let name` is inferred as `string` (because it could be reassigned to any string), but `const greeting` is inferred as the literal type `"hello"` (because it can never change).

Function return types are also inferred from the `return` statement:

```ts
function add(a: number, b: number) {
  return a + b; // TypeScript infers return type: number
}
```

You annotated the parameters (`a: number`, `b: number`), but didn't annotate the return type. TypeScript sees that `a + b` produces a `number` and infers the return type automatically.

## When to Add Annotations

Add explicit type annotations when:

**1. TypeScript can't infer the type** — typically function parameters, since there's no value to infer from:

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

Without the `: string` annotation on `name`, TypeScript has no way to know what type of argument `greet` expects.

**2. The inferred type is too broad or too narrow:**

```ts
// Without the annotation, TypeScript infers never[] — an array that can't hold anything
const items: string[] = [];

// Without the annotation, TypeScript only sees null — it can't know what comes later
const user: { name: string; age: number } | null = null;
```

In both cases, the annotation tells TypeScript what the variable will eventually hold, not just what it holds right now.

**3. You want to document intent**, especially for function return types in public APIs or complex logic:

```ts
interface Config {
  host: string;
  port: number;
}

function parseConfig(raw: string): Config {
  return JSON.parse(raw); // Without the annotation, TypeScript infers any
}
```

## The Rule of Thumb

Let TypeScript infer when it's obvious. Annotate when it's not, or when an annotation adds clarity.

> **Hands on:** Declare several variables without type annotations. Then add one case where inference needs your help.

<details>
<summary>Show code</summary>

Save as `inference.ts` and run with `node inference.ts`.

```ts
const name = 'Aisha'; // hover in VS Code: "Aisha" (literal)
let age = 27; // hover: number
const scores = [85, 92, 78]; // hover: number[]
const mixed = [1, 'two', true]; // hover: (string | number | boolean)[]

// Inference needs help: an empty array defaults to never[]
const items: string[] = [];
items.push('first');
items.push('second');

console.log(name, age, scores, mixed, items);
```

Try removing the `: string[]` annotation from `items` — your editor will show it as `never[]`, and the `push` calls will fail.

</details>
