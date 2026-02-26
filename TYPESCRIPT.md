# TypeScript for JavaScript Developers

You already know JavaScript. TypeScript is JavaScript with a type system layered on top. Every valid JavaScript program is already valid TypeScript — you're adding types, not learning a new language.

TypeScript catches bugs at compile time that JavaScript would only reveal at runtime. Your editor gives you autocomplete, instant error feedback, and safer refactoring — all powered by the type information you add to your code.

### Quick Start: Running TypeScript with Node.js

Node.js can run `.ts` files directly — no install, no setup, no build step. Node.js strips the type annotations and executes the remaining JavaScript:

```bash
node example.ts
```

> [!IMPORTANT]
> Check your version with `node -v`. You need **Node.js v22.18+** or **v23.6+** for this to work. If you're on an older version, upgrade to the current LTS version (presently v24) from [nodejs.org](https://nodejs.org/).

That's all you need to run every exercise in this document.

> [!TIP]
> See [TOOLING.md](TOOLING.md) for setting up a proper TypeScript project with transpilation (`tsc`), fast dev running (`tsx`), and linting (ESLint).

---

## Type System: Primitives, Arrays, Objects, and Unions

### Primitives

JavaScript has several primitive types. You use them every day, even if you don't think about them explicitly:

- `string` — text values like `'Aisha'` or `"hello"`
- `number` — integers and decimals: `27`, `3.14`, `-1`
- `boolean` — `true` or `false`
- `null` — intentionally empty
- `undefined` — not yet assigned

In JavaScript, values have these types at runtime, but you never write them down. This is perfectly valid JavaScript:

```js
let name = 'Aisha';
let age = 27;
let isStudent = true;
```

JavaScript also doesn't stop you from changing a variable's type during its lifetime. You can start with a number and reassign it to a string — no error, no warning:

```js
let age = 27;
age = 'twenty-seven'; // JavaScript allows this — no complaint
```

This flexibility is a common source of bugs. Code that expects `age` to be a number might break when it's suddenly a string — and you won't find out until the code runs.

TypeScript solves this with **type annotations**. An annotation is the `: type` you add after a variable name — a colon followed by the type. It locks the variable to that type for its entire lifetime:

```ts
let name: string = 'Aisha';
let age: number = 27;
let isStudent: boolean = true;
```

The `: string`, `: number`, and `: boolean` parts are the annotations. They are not JavaScript — they exist purely for TypeScript's type checker and your editor. When the code runs, they are stripped away and you're left with the plain JavaScript you started with.

If you try to assign the wrong type, TypeScript stops you before the code runs:

```ts
let age: number = 27;
age = 'twenty-seven'; // Error: Type 'string' is not assignable to type 'number'
```

### Arrays

Arrays are typed by what they contain. The annotation `number[]` means "an array of numbers" — every element must be a `number`. Likewise, `string[]` means every element must be a `string`:

```ts
let scores: number[] = [85, 92, 78];
let names: string[] = ['Aisha', 'Ben', 'Carlos'];
```

You can also write this with the generic syntax `Array<number>`, which means the same thing. You'll see both in the wild.

```ts
let scores: Array<number> = [85, 92, 78];
```

### Objects

You can describe the shape of an object inline. The annotation after the colon lists each property and its type, separated by semicolons:

```ts
let student: { name: string; age: number } = {
  name: 'Aisha',
  age: 27,
};
```

Here, `{ name: string; age: number }` is the type annotation. It says this object must have a `name` property that is a `string` and an `age` property that is a `number`. If you misspell a property or use the wrong type, TypeScript will flag it.

This inline style gets verbose quickly — you'll soon want interfaces or type aliases (covered in the next section) to name these shapes and reuse them.

### Unions

A union type says "this value can be one of several types." You write it with the `|` (pipe) operator between the types:

```ts
let id: string | number = 'abc-123';
id = 42; // also fine
```

The annotation `: string | number` means `id` can hold either a `string` or a `number` — both assignments above are valid.

Unions are everywhere in real code. A function might return a value or `null`. An API field might be a string or a number. Unions let you model this honestly:

```ts
function findUser(id: number): User | undefined {
  return users.find((user) => user.id === id);
}
```

Here the return type `User | undefined` tells callers that this function might not find a user — they'll need to handle the `undefined` case before using the result.

When you use a union value, TypeScript forces you to handle each possibility before using type-specific operations. This is called **narrowing** and is covered later under type guards.

### Your Editor Is Part of the Experience

For this first exercise, try typing the code into a `.ts` file in VS Code rather than copying it. VS Code has built-in TypeScript support and gives you real-time feedback without running anything:

- **Hover** over any variable, function, or expression to see its type in a tooltip.
- **Autocomplete** suggests properties and methods based on the type, so you don't have to memorize APIs.
- **Error squiggles** appear under code with type errors, with an explanation when you hover over them.

This instant feedback loop is one of the biggest practical benefits of TypeScript. You'll see types, catch mistakes, and discover available methods — all without leaving your editor.

<details>
<summary><strong>Try it yourself</strong></summary>

Declare variables with explicit types, create an object with a typed shape, and write a function that accepts a union parameter. Save the code below as `basics.ts` and run it with `node basics.ts`.

```ts
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
```

Try changing `population` to a string like `"nine hundred thousand"` — TypeScript will catch the type mismatch before the code runs.

</details>

---

## Interfaces vs Types

Both `interface` and `type` let you name an object shape. They overlap significantly, and in many cases either works.

### Interface

An `interface` declares a named shape — a list of properties and their types. You can then use the interface name as a type annotation instead of repeating the full object shape every time:

```ts
interface Student {
  name: string;
  age: number;
  email: string;
}

const student: Student = {
  name: 'Aisha',
  age: 27,
  email: 'aisha@example.com',
};
```

The annotation `: Student` tells TypeScript this object must have exactly the properties listed in the `Student` interface, with the correct types. If you add an extra property, misspell one, or use the wrong type, TypeScript will flag it.

Interfaces can be **extended**, which is useful when you want to build on an existing shape:

```ts
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  email: string;
  cohort: number;
}
```

`Student extends Person` means a `Student` has everything a `Person` has (`name` and `age`), plus `email` and `cohort`. You don't need to repeat the shared properties.

Interfaces can also be **declared multiple times** and TypeScript merges them automatically. This is called declaration merging and is mainly useful for library authors:

```ts
interface Window {
  myCustomProperty: string;
}
// This merges with the built-in Window interface
```

### Type Alias

A `type` alias works similarly — it gives a name to a type so you can reuse it:

```ts
type Student = {
  name: string;
  age: number;
  email: string;
};
```

For object shapes like this, `type` and `interface` behave the same way. But type aliases can also name things that interfaces cannot — unions, intersections, tuples, and other computed types:

```ts
type ID = string | number;                          // union
type Status = 'active' | 'inactive' | 'suspended';  // string literal union
type Coordinate = [number, number];                  // tuple (fixed-length array)
```

Here `ID` is a shorthand for `string | number`, `Status` restricts values to exactly three strings, and `Coordinate` is a pair of numbers.

### Which Should You Use?

Use `interface` when you're defining the shape of an object. Use `type` when you need unions, intersections, tuples, or other computed types:

```ts
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
```

The `?` after `disabled` makes it optional — a `ButtonProps` object may or may not include it. The `() => void` annotation means `onClick` is a function that takes no arguments and doesn't return a value.

Don't overthink the choice between `interface` and `type` — the difference rarely matters in practice.

<details>
<summary><strong>Try it yourself</strong></summary>

Define an `interface` for a product, create two products, and write a function that formats a product for display.

```ts
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

function formatProduct(product: Product): string {
  const status = product.inStock ? 'In Stock' : 'Out of Stock';
  return `${product.name} — $${product.price.toFixed(2)} (${status})`;
}

const laptop: Product = { name: 'Laptop', price: 999.99, inStock: true };
const keyboard: Product = { name: 'Keyboard', price: 49.95, inStock: false };

console.log(formatProduct(laptop));
console.log(formatProduct(keyboard));
```

Save this as `interfaces.ts` and run it with `node interfaces.ts`. Try removing a required property from one of the objects — TypeScript will immediately flag the error.

</details>

---

## Generics

Generics let you write code that works with any type while still being type-safe. Think of a generic as a **type parameter** — a placeholder that gets filled in when you use it.

### The Problem Generics Solve

Without generics, you'd have to choose between being specific and being reusable:

```ts
function firstNumber(arr: number[]): number {
  return arr[0];
}

function firstString(arr: string[]): string {
  return arr[0];
}
```

These two functions do the same thing — return the first element — but each only works with one type. Generics let you write it once:

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}

const n = first([1, 2, 3]); // TypeScript knows n is number
const s = first(['a', 'b']); // TypeScript knows s is string
```

The `<T>` after the function name declares a **type parameter** called `T`. Think of it as a placeholder: "I don't know the type yet — call it `T` for now." The parameter `arr: T[]` means "an array of whatever `T` turns out to be", and the return type `: T` means "the return value is that same type."

When you call `first([1, 2, 3])`, TypeScript sees that the array contains numbers, fills in `T = number`, and knows the result is a `number`. You don't have to specify `T` yourself — TypeScript infers it from the argument.

### Generic Interfaces and Types

You'll often see generics on interfaces, especially for data that wraps a value:

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
```

`ApiResponse<T>` defines a response shape where the `data` field can hold any type. `ApiResponse<User>` fills in `T = User`, so `data` becomes `User`. `ApiResponse<Product>` fills in `T = Product`, so `data` becomes `Product`. The `status` and `message` fields stay the same in both cases.

### Constraining Generics

Sometimes you want a generic that accepts any type — as long as it has certain properties. Use `extends` to set a constraint:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength('hello'); // works — strings have length
getLength([1, 2, 3]); // works — arrays have length
getLength(42); // Error: number doesn't have length
```

The constraint `T extends { length: number }` means "T can be any type, as long as it has a `length` property that is a `number`." Strings and arrays both qualify. Plain numbers don't, so TypeScript rejects the last call.

<details>
<summary><strong>Try it yourself</strong></summary>

Write a generic `last<T>` function that returns the last element of an array. Call it with different types and log the results.

```ts
function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3])); // 3
console.log(last(['a', 'b', 'c'])); // "c"
console.log(last([true, false, true])); // true
```

Save this as `generics.ts` and run it with `node generics.ts`. You never told `last` what type to use — TypeScript inferred it from each call. Try hovering over each `last(...)` call in VS Code to see the inferred type.

</details>

---

## Type Inference and Annotations

TypeScript doesn't require you to annotate every single value. It can **infer** types from context, and often does so perfectly well.

### Inference in Action

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

### When to Add Annotations

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
const user: User | null = null;
```

In both cases, the annotation tells TypeScript what the variable will eventually hold, not just what it holds right now.

**3. You want to document intent**, especially for function return types in public APIs or complex logic:

```ts
function parseConfig(raw: string): Config {
  // Even though TypeScript could infer this,
  // the annotation documents what you intend to return
}
```

### The Rule of Thumb

Let TypeScript infer when it's obvious. Annotate when it's not, or when an annotation adds clarity.

<details>
<summary><strong>Try it yourself</strong></summary>

Declare several variables without type annotations. Then add one case where inference needs your help.

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

Save this as `inference.ts` and run it with `node inference.ts`. Try removing the `: string[]` annotation from `items` — your editor will show it as `never[]`, and the `push` calls will fail.

</details>

---

## Type Unions and Intersections

You've already seen unions. This section goes deeper and introduces intersections.

### Unions: "One of These"

A union type (`A | B`) means the value is either `A` or `B`. This models choices and optional presence:

```ts
type Status = 'loading' | 'success' | 'error';

function showMessage(status: Status) {
  switch (status) {
    case 'loading':
      return 'Please wait...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Something went wrong.';
  }
}
```

`Status` is a union of three string literals. The `status` parameter only accepts one of those three exact strings — passing `'pending'` or any other string would be an error. The `switch` statement handles each possibility.

String literal unions like this are called **discriminated unions** when used with objects — a pattern you'll see often for modelling states that carry different data:

```ts
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string };
```

This defines three possible shapes. Each variant has a `status` field with a different literal value, which TypeScript can use to figure out which variant you're dealing with. When `status` is `'success'`, TypeScript knows a `data` property exists. When `status` is `'error'`, it knows `message` exists.

### Intersections: "All of These"

An intersection type (`A & B`) means the value has **all** properties from both types. The `&` operator combines them:

```ts
type HasName = { name: string };
type HasEmail = { email: string };

type Contact = HasName & HasEmail;
// Contact = { name: string; email: string }
```

A `Contact` must have both `name` and `email` — it satisfies both `HasName` and `HasEmail` at the same time.

Intersections are useful for composing types from smaller, reusable pieces:

```ts
type Timestamped = { createdAt: Date; updatedAt: Date };
type SoftDeletable = { deletedAt: Date | null };

type DatabaseRecord = Timestamped & SoftDeletable;
```

A `DatabaseRecord` has all three properties: `createdAt`, `updatedAt`, and `deletedAt`. You defined each concern separately and combined them with `&`.

### Unions vs Intersections

|          | Union (`A \| B`)         | Intersection (`A & B`) |
| -------- | ------------------------ | ---------------------- |
| Meaning  | "could be A or B"        | "is both A and B"      |
| Access   | only shared members      | all members from both  |
| Use case | variants, optional types | composition, mixins    |

<details>
<summary><strong>Try it yourself</strong></summary>

Model a traffic light with a string literal union. Write a function that returns a message for each state. Then use an intersection to combine two small types.

```ts
type Light = 'red' | 'yellow' | 'green';

function trafficMessage(light: Light): string {
  switch (light) {
    case 'red':
      return 'Stop';
    case 'yellow':
      return 'Caution';
    case 'green':
      return 'Go';
  }
}

console.log(trafficMessage('red'));
console.log(trafficMessage('green'));

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: 'Aisha', age: 27 };
console.log(`${person.name} is ${person.age} years old`);
```

Save this as `unions-intersections.ts` and run it with `node unions-intersections.ts`. Try calling `trafficMessage("blue")` — TypeScript will reject it because `"blue"` isn't in the `Light` union.

</details>

---

## Function Types and Return Types

Functions in TypeScript can have typed parameters and return values.

### Typing Parameters and Returns

You annotate function parameters the same way as variables — with `: type` after the name. The return type goes after the parameter list:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Here `a: number` and `b: number` annotate the two parameters, and `: number` after the closing parenthesis annotates the return type. If the function tried to return a string, TypeScript would flag the mismatch.

### Optional and Default Parameters

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

### Function Type Expressions

You can describe the type of a function itself — not just its parameters and return, but the whole function as a value. This is common when passing callbacks:

```ts
type Formatter = (value: number) => string;

function applyFormat(value: number, format: Formatter): string {
  return format(value);
}

applyFormat(1000, (n) => `$${n.toFixed(2)}`);
```

`Formatter` describes a function that takes a `number` and returns a `string`. The `=>` here is part of the type syntax (not an arrow function) — it separates the parameters from the return type. The `applyFormat` function accepts any function matching that shape as its second argument.

### Typing Arrow Functions

Arrow functions use the same annotation syntax — `: type` after each parameter and after the parameter list for the return type:

```ts
const multiply = (a: number, b: number): number => a * b;
```

### Void vs Never

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

<details>
<summary><strong>Try it yourself</strong></summary>

Write a higher-order function `applyTwice` that takes a number and a callback of type `(n: number) => number`, applies the callback twice, and returns the result. Call it with different arrow functions.

```ts
type Transform = (n: number) => number;

function applyTwice(value: number, fn: Transform): number {
  return fn(fn(value));
}

console.log(applyTwice(3, (n) => n * 2)); // 3 → 6 → 12
console.log(applyTwice(10, (n) => n + 1)); // 10 → 11 → 12
console.log(applyTwice(100, (n) => n / 2)); // 100 → 50 → 25
```

Save this as `function-types.ts` and run it with `node function-types.ts`. Try changing the callback signature (e.g., `(n: string) => string`) and see how TypeScript catches the mismatch.

</details>

---

## Utility Types

TypeScript ships with built-in utility types that transform existing types. These save you from rewriting type definitions.

### Partial\<T\>

`Partial<User>` takes the `User` interface and makes every property optional. This is useful for update operations where you only change some fields:

```ts
interface User {
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, changes: Partial<User>) {
  // changes can have any combination of name, email, age
}

updateUser(1, { email: 'new@example.com' }); // valid
```

Without `Partial`, you'd have to pass all three properties every time. With `Partial<User>`, the `changes` parameter accepts an object with any subset of `User`'s properties — just `email`, just `name` and `age`, or all three.

### Required\<T\>

The opposite of `Partial` — makes all properties required, even ones that were originally optional:

```ts
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

const fullConfig: Required<Config> = {
  host: 'localhost',
  port: 3000,
  debug: false,
};
```

`Config` has all optional properties (note the `?` on each). `Required<Config>` strips the `?` from every property, so `fullConfig` must include all three.

### Pick\<T, Keys\>

Creates a new type with only the specified properties from the original:

```ts
type UserSummary = Pick<User, 'name' | 'email'>;
// { name: string; email: string }
```

`Pick<User, 'name' | 'email'>` pulls out just the `name` and `email` properties from `User`, ignoring `age`. The result is a smaller type with only the fields you listed.

### Omit\<T, Keys\>

The opposite of `Pick` — creates a type with all properties _except_ the specified ones:

```ts
type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
// Everything from User except id and createdAt
```

This is useful when some fields are generated automatically (like `id`) and shouldn't be provided by the caller.

### Record\<Keys, Value\>

Creates an object type where every key has the same value type. The first parameter defines the keys, the second defines the value type:

```ts
type UserRoles = Record<string, 'admin' | 'editor' | 'viewer'>;

const roles: UserRoles = {
  aisha: 'admin',
  ben: 'editor',
  carlos: 'viewer',
};
```

`Record<string, 'admin' | 'editor' | 'viewer'>` means: an object with string keys where every value must be one of those three role strings.

`Record` is also useful for lookup maps where the keys come from a union:

```ts
type StatusLabels = Record<Status, string>;

const labels: StatusLabels = {
  loading: 'Loading...',
  success: 'Complete',
  error: 'Failed',
};
```

Here `Record<Status, string>` requires one entry for every value in the `Status` union. If you forget one, TypeScript will flag it.

### Combining Utility Types

These utility types compose naturally — you can nest and combine them:

```ts
// An update payload: all user fields optional, except id which is required
type UpdateUser = Partial<Omit<User, 'id'>> & Pick<User, 'id'>;
```

Reading from the inside out: `Omit<User, 'id'>` removes `id`, `Partial<...>` makes the remaining fields optional, and `& Pick<User, 'id'>` adds `id` back as required. The result is a type where `id` is mandatory but everything else is optional.

<details>
<summary><strong>Try it yourself</strong></summary>

Start with a `User` interface, then use `Partial`, `Pick`, and `Omit` to create derived types. Write small functions that use each one.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, changes: Partial<User>): void {
  console.log(`Updating user ${id} with:`, changes);
}

function displayNameTag(info: Pick<User, 'name' | 'email'>): void {
  console.log(`${info.name} <${info.email}>`);
}

function createUser(input: Omit<User, 'id'>): User {
  const newUser: User = { id: Math.floor(Math.random() * 1000), ...input };
  console.log('Created user:', newUser);
  return newUser;
}

updateUser(1, { email: 'new@example.com' });
displayNameTag({ name: 'Aisha', email: 'aisha@example.com' });
createUser({ name: 'Ben', email: 'ben@example.com', age: 30 });
```

Save this as `utility-types.ts` and run it with `node utility-types.ts`. Experiment: try passing `{ id: 5 }` to `createUser` — TypeScript won't allow it because `id` was omitted from the input type.

</details>

---

## Type-Safe API Responses

When your app fetches data from an API, the response comes back as unknown data. TypeScript can't know at compile time what the server will return — you need to tell it.

### The Problem

`fetch` returns `Promise<Response>`, and `.json()` returns `Promise<any>`. That `any` is a hole in your type safety:

```ts
const response = await fetch('/api/users');
const data = await response.json(); // type: any — no safety here
```

Because `data` is `any`, TypeScript won't catch misspelled property names, wrong types, or missing fields. You could write `data.naem` and TypeScript wouldn't complain.

### Typing API Responses

The solution is to define types that match your API's response shape and use them to annotate the result:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  total: number;
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const json: ApiResponse<User[]> = await response.json();
  return json;
}
```

The return type `Promise<ApiResponse<User[]>>` means this function returns a promise that resolves to an `ApiResponse` where `data` is an array of `User` objects. The annotation `const json: ApiResponse<User[]>` on the `.json()` result tells TypeScript to treat the parsed JSON as that shape. Now every consumer of `fetchUsers()` gets full type checking and autocomplete on the result.

### A Reusable Fetch Wrapper

You can write a generic wrapper that works for any response type. The caller specifies the expected type using `<T>` at the call site:

```ts
async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const users = await api<User[]>('/api/users');
const product = await api<Product>('/api/products/42');
```

`api<User[]>(...)` fills in `T = User[]`, so TypeScript knows `users` is a `User[]`. `api<Product>(...)` fills in `T = Product`, so `product` is a `Product`. The `as Promise<T>` tells TypeScript to treat the result of `.json()` as the type the caller specified.

### Handling Fetch Failures

TypeScript helps you handle network failures gracefully using a discriminated union for success/failure:

```ts
type FetchResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function safeFetch<T>(url: string): Promise<FetchResult<T>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }

    const data: T = await response.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
```

`FetchResult<T>` is a union of two shapes: a success case with `ok: true` and a `data` field, and a failure case with `ok: false` and an `error` message. This pattern makes it impossible to accidentally use `data` without first checking that `ok` is `true` — TypeScript only makes `data` available after you've narrowed to the success case.

<details>
<summary><strong>Try it yourself</strong></summary>

Define a `User` interface and an `ApiResponse<T>` generic interface. Write a mock function `fetchUsers` that returns a hardcoded `ApiResponse<User[]>` (no actual `fetch` — just return an object). Call it and log the results.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  total: number;
}

function fetchUsers(): ApiResponse<User[]> {
  return {
    data: [
      { id: 1, name: 'Aisha', email: 'aisha@example.com' },
      { id: 2, name: 'Ben', email: 'ben@example.com' },
    ],
    total: 2,
  };
}

const result = fetchUsers();
console.log(`Fetched ${result.total} users:`);
result.data.forEach((user) => console.log(`  ${user.name} (${user.email})`));
```

Save this as `api-response.ts` and run it with `node api-response.ts`. Try changing a property name or removing a field from one of the user objects — TypeScript will catch the mismatch.

</details>

---

## Type Guards

When you have a union type, TypeScript needs you to **narrow** the type before you can use type-specific operations. Type guards are the way you narrow.

### Built-in Narrowing

TypeScript understands standard JavaScript checks and uses them to narrow union types:

```ts
function formatId(id: string | number): string {
  if (typeof id === 'string') {
    return id.toUpperCase(); // TypeScript knows id is string here
  }
  return id.toFixed(2); // TypeScript knows id is number here
}
```

The parameter `id` starts as `string | number`. Inside the `if` block, the `typeof` check tells TypeScript that `id` must be a `string`, so `.toUpperCase()` is allowed. After the `if`, TypeScript knows only `number` remains, so `.toFixed(2)` is allowed. This is narrowing in action.

Other built-in narrowing patterns:

```ts
// instanceof — checks if a value is an instance of a class
if (error instanceof TypeError) {
  console.log(error.message); // TypeScript knows it's a TypeError
}

// truthiness — null and undefined are falsy, so a truthy check eliminates them
function greet(name: string | null) {
  if (name) {
    console.log(name.toUpperCase()); // TypeScript knows name is string
  }
}

// in operator — checks if a property exists on the object
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim(); // TypeScript knows it's a Fish
  }
}
```

In the `move` function, `animal` is `Fish | Bird`. The `'swim' in animal` check tells TypeScript that `animal` must be a `Fish` (since only `Fish` has `swim`), so `animal.swim()` is safe inside that block.

### Custom Type Guard Functions

For more complex checks, you can write a function that returns a **type predicate**. A type predicate has the form `paramName is Type` — it tells TypeScript that if the function returns `true`, the parameter is the specified type:

```ts
interface User {
  type: 'user';
  name: string;
  email: string;
}

interface Admin {
  type: 'admin';
  name: string;
  permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}

function showDashboard(person: User | Admin) {
  if (isAdmin(person)) {
    console.log(person.permissions); // TypeScript knows it's Admin
  }
}
```

The return type `person is Admin` is the type predicate. It tells TypeScript: "if `isAdmin` returns `true`, then `person` is an `Admin`." Inside the `if` block, TypeScript narrows `person` to `Admin`, so you can safely access `person.permissions`.

### Discriminated Unions and Exhaustive Checks

When every variant of a union has a common literal field (the "discriminant"), TypeScript can narrow automatically in `switch` statements by checking that field:

```ts
type Action =
  | { type: 'add'; item: string }
  | { type: 'remove'; index: number }
  | { type: 'clear' };

function reduce(state: string[], action: Action): string[] {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((_, i) => i !== action.index);
    case 'clear':
      return [];
  }
}
```

The `type` field is the discriminant — each variant has a different literal value (`'add'`, `'remove'`, `'clear'`). In the `case 'add'` branch, TypeScript knows `action` is the `{ type: 'add'; item: string }` variant, so `action.item` is available. In the `case 'remove'` branch, `action.index` is available.

If you later add a new action type and forget to handle it, TypeScript can catch that with an **exhaustiveness check**:

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

// Add this as the default case in your switch:
default:
  return assertNever(action);
```

The `never` type means "this should be impossible." If every variant is handled in the `switch`, then `action` in the `default` case is `never` — there are no possibilities left. But if you add a new variant and forget a `case`, `action` won't be `never` and TypeScript will report an error at compile time, reminding you to handle it.

<details>
<summary><strong>Try it yourself</strong></summary>

Define a discriminated union `Shape` with two variants: `circle` and `rectangle`. Write a function that uses a `switch` on `kind` to calculate the area, with an exhaustiveness check.

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      return assertNever(shape);
  }
}

console.log(area({ kind: 'circle', radius: 5 }));
console.log(area({ kind: 'rectangle', width: 4, height: 7 }));
```

Save this as `type-guards.ts` and run it with `node type-guards.ts`. Then try adding a third variant (e.g., `triangle`) to the `Shape` union **without** adding a `case` for it — the compiler will flag the exhaustiveness error.

</details>
