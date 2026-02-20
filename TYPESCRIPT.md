# TypeScript for JavaScript Developers

You already know JavaScript. TypeScript is JavaScript with a type system layered on top. Every valid JavaScript program is already valid TypeScript — you're adding types, not learning a new language.

TypeScript catches bugs at compile time that JavaScript would only reveal at runtime. When you eventually use TypeScript with React, you'll get autocomplete for props, catch missing or wrong props before the browser even loads, and make refactoring far less scary.

> **First time?** See [TOOLING.md](TOOLING.md) for how to install and run TypeScript — using Node.js directly, `tsx`, or the full `tsc` compiler.

> **Running the exercises:** Each section below ends with a hands-on exercise. Save the code to a `.ts` file and run it directly with `node filename.ts` (Node.js v22.6+ required; v22.18+ or v23.6+ recommended). No compilation step needed — Node.js strips the types and runs the JavaScript. See [TOOLING.md](TOOLING.md) for details.

---

## Type System: Primitives, Arrays, Objects, and Unions

In JavaScript, values have types at runtime. TypeScript lets you declare those types explicitly so the compiler can check them for you.

### Primitives

The basic types mirror what you already know from JavaScript:

```ts
let name: string = 'Aisha';
let age: number = 27;
let isStudent: boolean = true;
```

If you try to assign the wrong type, TypeScript stops you before the code runs:

```ts
let age: number = 27;
age = 'twenty-seven'; // Error: Type 'string' is not assignable to type 'number'
```

### Arrays

Arrays are typed by what they contain:

```ts
let scores: number[] = [85, 92, 78];
let names: string[] = ['Aisha', 'Ben', 'Carlos'];
```

You can also write this with the generic syntax `Array<number>`, which means the same thing. You'll see both in the wild.

```ts
let scores: Array<number> = [85, 92, 78];
```

### Objects

You can describe the shape of an object inline:

```ts
let student: { name: string; age: number } = {
  name: 'Aisha',
  age: 27,
};
```

This gets verbose quickly — you'll soon want interfaces or type aliases (covered in the next section) to name these shapes and reuse them.

### Unions

A union type says "this value can be one of several types." You write it with the `|` operator:

```ts
let id: string | number = 'abc-123';
id = 42; // also fine
```

Unions are everywhere in real code. A function might return a value or `null`. An API field might be a string or a number. Unions let you model this honestly.

```ts
function findUser(id: number): User | undefined {
  return users.find((user) => user.id === id);
}
```

When you use a union value, TypeScript forces you to handle each possibility before using type-specific operations. This is called **narrowing** and is covered later under type guards.

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

## Your Editor Is Part of the Experience

Now that you've seen some TypeScript syntax, try it in VS Code. VS Code has built-in TypeScript support and gives you real-time feedback without running anything:

- **Hover** over any variable, function, or expression to see its type in a tooltip.
- **Autocomplete** suggests properties and methods based on the type, so you don't have to memorize APIs.
- **Error squiggles** appear under code with type errors, with an explanation when you hover over them.

This instant feedback loop is one of the biggest practical benefits of TypeScript. You'll see types, catch mistakes, and discover available methods — all without leaving your editor.

---

## Interfaces vs Types

Both `interface` and `type` let you name an object shape. They overlap significantly, and in many cases either works.

### Interface

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

Interfaces can also be **declared multiple times** and TypeScript merges them automatically. This is called declaration merging and is mainly useful for library authors:

```ts
interface Window {
  myCustomProperty: string;
}
// This merges with the built-in Window interface
```

### Type Alias

```ts
type Student = {
  name: string;
  age: number;
  email: string;
};
```

Type aliases can do everything interfaces can for object shapes, but they can also name unions, intersections, and other types that interfaces cannot:

```ts
type ID = string | number;
type Status = 'active' | 'inactive' | 'suspended';
type Coordinate = [number, number];
```

### Which Should You Use?

Use `interface` when you're defining the shape of an object, especially in a React codebase where component props are almost always written as interfaces:

```ts
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
```

Use `type` when you need unions, intersections, tuples, or other computed types. Don't overthink it — the difference rarely matters in practice.

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

These do the same thing. Generics let you write it once:

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}

const n = first([1, 2, 3]); // TypeScript knows n is number
const s = first(['a', 'b']); // TypeScript knows s is string
```

`T` is a type variable. When you call `first([1, 2, 3])`, TypeScript infers that `T` is `number` and ensures the return type matches.

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

### Constraining Generics

Sometimes you want a generic that accepts any type — as long as it has certain properties. Use `extends` for this:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength('hello'); // works — strings have length
getLength([1, 2, 3]); // works — arrays have length
getLength(42); // Error: number doesn't have length
```

### Generics in React (Preview)

When you start writing React with TypeScript, you'll see generics constantly. The `useState` hook is generic:

```ts
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

Often TypeScript infers the type from the initial value, so you only need the explicit generic when the initial value doesn't tell the full story (like `null` above).

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

```ts
let name = 'Aisha'; // TypeScript infers: string
let age = 27; // TypeScript infers: number
let scores = [85, 92, 78]; // TypeScript infers: number[]

const greeting = 'hello'; // TypeScript infers: "hello" (literal type, because const)
```

Function return types are also inferred:

```ts
function add(a: number, b: number) {
  return a + b; // TypeScript infers return type: number
}
```

### When to Add Annotations

Add explicit type annotations when:

**1. TypeScript can't infer the type** — typically function parameters:

```ts
// Parameters must be annotated — TypeScript can't guess them
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

**2. The inferred type is too broad or too narrow:**

```ts
// Inferred as never[] — TypeScript doesn't know what you'll push
const items: string[] = [];

// Inferred as null — you need to tell TypeScript what it will become
const user: User | null = null;
```

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

String literal unions like this are called **discriminated unions** when used with objects — a pattern you'll see often in React for modelling component states:

```ts
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string };
```

Each variant has a common `status` field that TypeScript can use to narrow the type.

### Intersections: "All of These"

An intersection type (`A & B`) means the value has **all** properties from both types:

```ts
type HasName = { name: string };
type HasEmail = { email: string };

type Contact = HasName & HasEmail;
// Contact = { name: string; email: string }
```

Intersections are useful for composing types from smaller pieces:

```ts
type Timestamped = { createdAt: Date; updatedAt: Date };
type SoftDeletable = { deletedAt: Date | null };

type DatabaseRecord = Timestamped & SoftDeletable;
```

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

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional and Default Parameters

```ts
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}`;
}

function log(message: string, userId?: string): void {
  // userId is string | undefined
  console.log(userId ? `[${userId}] ${message}` : message);
}
```

### Function Type Expressions

You can describe the type of a function itself. This is common when passing callbacks:

```ts
type Formatter = (value: number) => string;

function applyFormat(value: number, format: Formatter): string {
  return format(value);
}

applyFormat(1000, (n) => `$${n.toFixed(2)}`);
```

### Typing Arrow Functions

```ts
const multiply = (a: number, b: number): number => a * b;
```

### Void vs Never

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

### Typing Callbacks in React (Preview)

Event handlers in React follow the same rules:

```ts
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
}
```

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

Makes all properties optional. Useful for update operations where you only change some fields:

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

### Required\<T\>

The opposite of `Partial` — makes all properties required:

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

### Pick\<T, Keys\>

Creates a type with only the specified properties:

```ts
type UserSummary = Pick<User, 'name' | 'email'>;
// { name: string; email: string }
```

### Omit\<T, Keys\>

Creates a type with all properties except the specified ones:

```ts
type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
// Everything from User except id and createdAt
```

### Record\<Keys, Value\>

Creates an object type where all keys have the same value type:

```ts
type UserRoles = Record<string, 'admin' | 'editor' | 'viewer'>;

const roles: UserRoles = {
  aisha: 'admin',
  ben: 'editor',
  carlos: 'viewer',
};
```

`Record` is also useful for lookup maps:

```ts
type StatusLabels = Record<Status, string>;

const labels: StatusLabels = {
  loading: 'Loading...',
  success: 'Complete',
  error: 'Failed',
};
```

### Combining Utility Types

These compose naturally:

```ts
// An update payload: all user fields optional, except id which is required
type UpdateUser = Partial<Omit<User, 'id'>> & Pick<User, 'id'>;
```

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

When your React app fetches data from an API, the response comes back as unknown data. TypeScript can't know at compile time what the server will return — you need to tell it.

### The Problem

`fetch` returns `Promise<Response>`, and `.json()` returns `Promise<any>`. That `any` is a hole in your type safety:

```ts
const response = await fetch('/api/users');
const data = await response.json(); // type: any — no safety here
```

### Typing API Responses

Define types that match your API's response shape and assert them:

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

Now every consumer of `fetchUsers()` gets full type checking and autocomplete on the result.

### A Reusable Fetch Wrapper

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

This pattern makes it impossible to accidentally use the data without first checking that the request succeeded.

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

TypeScript understands standard JavaScript checks:

```ts
function formatId(id: string | number): string {
  if (typeof id === 'string') {
    return id.toUpperCase(); // TypeScript knows id is string here
  }
  return id.toFixed(2); // TypeScript knows id is number here
}
```

Other built-in narrowing:

```ts
// instanceof
if (error instanceof TypeError) {
  console.log(error.message); // TypeScript knows it's a TypeError
}

// truthiness
function greet(name: string | null) {
  if (name) {
    console.log(name.toUpperCase()); // TypeScript knows name is string
  }
}

// in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim(); // TypeScript knows it's a Fish
  }
}
```

### Custom Type Guard Functions

For more complex checks, write a function that returns a **type predicate** (`paramName is Type`):

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

### Discriminated Unions and Exhaustive Checks

When every variant of a union has a common literal field, TypeScript can narrow automatically in `switch` statements:

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

This pattern maps directly to how you'll write reducers in React. If you later add a new action type and forget to handle it, TypeScript can catch that with an exhaustiveness check:

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

// Add this as the default case in your switch:
default:
  return assertNever(action);
```

If any variant isn't handled, `action` won't be `never` and TypeScript will report an error at compile time.

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
