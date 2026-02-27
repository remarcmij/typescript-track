# Type Unions and Intersections

You've already seen unions. This section goes deeper and introduces intersections.

## Unions: "One of These"

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

String literal unions become even more powerful when used with objects. A **discriminated union** is a union of object types where each variant has a common field with a different literal value:

```ts
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };
```

This defines three possible shapes. The `status` field is the **discriminant** — its literal value tells TypeScript which variant you're dealing with. When `status` is `'success'`, TypeScript knows a `data` property exists. When `status` is `'error'`, it knows `message` exists. You'll see this pattern often for modelling states that carry different data.

## Intersections: "All of These"

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

## Unions vs Intersections

|          | Union (`A \| B`)         | Intersection (`A & B`) |
| -------- | ------------------------ | ---------------------- |
| Meaning  | "could be A or B"        | "is both A and B"      |
| Access   | only shared members      | all members from both  |
| Use case | variants, optional types | composition, mixins    |

> **Hands on:** Model a traffic light with a string literal union. Write a function that returns a message for each state. Then use an intersection to combine two small types.

<details>
<summary>Show code</summary>

Save as `unions-intersections.ts` and run with `node unions-intersections.ts`.

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

Try calling `trafficMessage("blue")` — TypeScript will reject it because `"blue"` isn't in the `Light` union.

</details>
