# Generics

Generics let you write code that works with any type while still being type-safe. Think of a generic as a **type parameter** — a placeholder that gets filled in when you use it.

## The Problem Generics Solve

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

## Generic Interfaces and Types

You'll often see generics on interfaces, especially for data that wraps a value:

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
```

`ApiResponse<T>` defines a response shape where the `data` field can hold any type. `ApiResponse<User>` fills in `T = User`, so `data` becomes `User`. `ApiResponse<Product>` fills in `T = Product`, so `data` becomes `Product`. The `status` and `message` fields stay the same in both cases.

## Constraining Generics

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

> **Hands on:** Write a generic `last<T>` function that returns the last element of an array. Call it with different types and log the results.

<details>
<summary>Show code</summary>

Save as `generics.ts` and run with `node generics.ts`.

```ts
function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3])); // 3
console.log(last(['a', 'b', 'c'])); // "c"
console.log(last([true, false, true])); // true
```

You never told `last` what type to use — TypeScript inferred it from each call. Try hovering over each `last(...)` call in VS Code to see the inferred type.

</details>
