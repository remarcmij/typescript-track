# Interfaces vs Types

Both `interface` and `type` let you name an object shape. They overlap significantly, and in many cases either works.

## Interface

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

## Type Alias

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

## Which Should You Use?

Use `interface` when you're defining the shape of an object. Use `type` when you need unions, intersections, tuples, or other computed types:

```ts
interface SearchOptions {
  query: string;
  onComplete: () => void;
  caseSensitive?: boolean;
}
```

The `?` after `caseSensitive` makes it optional — a `SearchOptions` object may or may not include it. The `() => void` annotation means `onComplete` is a function that takes no arguments and doesn't return a value.

Don't overthink the choice between `interface` and `type` — the difference rarely matters in practice.

> **Hands on:** Define an `interface` for a product, create two products, and write a function that formats a product for display.

<details>
<summary>Show code</summary>

Save as `interfaces.ts` and run with `node interfaces.ts`.

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

Try removing a required property from one of the objects — TypeScript will immediately flag the error.

</details>
