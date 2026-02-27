# Type Guards

When you have a union type, TypeScript needs you to **narrow** the type before you can use type-specific operations. Type guards are the way you narrow.

## Built-in Narrowing

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

## Custom Type Guard Functions

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

## Discriminated Unions and Exhaustive Checks

When every variant of a union has a common literal field (the "discriminant"), TypeScript can narrow automatically in `switch` statements by checking that field:

```ts
type Action =
  | { type: 'add'; item: string }
  | { type: 'remove'; index: number }
  | { type: 'clear' };

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

function reduce(state: string[], action: Action): string[] {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((_, i) => i !== action.index);
    case 'clear':
      return [];
    default:
      return assertNever(action);
  }
}
```

The `type` field is the discriminant — each variant has a different literal value (`'add'`, `'remove'`, `'clear'`). In the `case 'add'` branch, TypeScript knows `action` is the `{ type: 'add'; item: string }` variant, so `action.item` is available. In the `case 'remove'` branch, `action.index` is available.

The `default` case uses an **exhaustiveness check**. The `assertNever` function takes a `never` parameter — a type that means "this should be impossible." If every variant is handled in the `switch`, then `action` in the `default` case is `never` — there are no possibilities left. But if you add a new variant and forget a `case`, `action` won't be `never` and TypeScript will report an error at compile time, reminding you to handle it.

> **Hands on:** Define a discriminated union `Shape` with two variants: `circle` and `rectangle`. Write a function that uses a `switch` on `kind` to calculate the area, with an exhaustiveness check.

<details>
<summary>Show code</summary>

Save as `type-guards.ts` and run with `node type-guards.ts`.

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

Try adding a third variant (e.g., `triangle`) to the `Shape` union **without** adding a `case` for it — the compiler will flag the exhaustiveness error.

</details>
