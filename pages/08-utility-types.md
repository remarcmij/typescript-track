# Utility Types

TypeScript ships with built-in utility types that transform existing types. These save you from rewriting type definitions.

## Partial\<T\>

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

## Required\<T\>

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

## Pick\<T, Keys\>

Creates a new type with only the specified properties from the original:

```ts
type UserSummary = Pick<User, 'name' | 'email'>;
// { name: string; email: string }
```

`Pick<User, 'name' | 'email'>` pulls out just the `name` and `email` properties from `User`, ignoring `age`. The result is a smaller type with only the fields you listed.

## Omit\<T, Keys\>

The opposite of `Pick` — creates a type with all properties _except_ the specified ones:

```ts
type PublicUser = Omit<User, 'email'>;
// { name: string; age: number }
```

`Omit<User, 'email'>` keeps `name` and `age` but removes `email`. This is useful when certain fields shouldn't be exposed or provided by the caller.

## Record\<Keys, Value\>

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
type Status = 'loading' | 'success' | 'error';
type StatusLabels = Record<Status, string>;

const labels: StatusLabels = {
  loading: 'Loading...',
  success: 'Complete',
  error: 'Failed',
};
```

Here `Record<Status, string>` requires one entry for every value in the `Status` union. If you forget one, TypeScript will flag it.

## Combining Utility Types

These utility types compose naturally — you can nest and combine them:

```ts
// An update payload: all user fields optional, except id which is required
type UpdateUser = Partial<Omit<User, 'id'>> & Pick<User, 'id'>;
```

Reading from the inside out: `Omit<User, 'id'>` removes `id`, `Partial<...>` makes the remaining fields optional, and `& Pick<User, 'id'>` adds `id` back as required. The result is a type where `id` is mandatory but everything else is optional.

> **Hands on:** Start with a `User` interface, then use `Partial`, `Pick`, and `Omit` to create derived types. Write small functions that use each one.

<details>
<summary>Show code</summary>

Save as `utility-types.ts` and run with `node utility-types.ts`.

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

Try passing `{ id: 5 }` to `createUser` — TypeScript won't allow it because `id` was omitted from the input type.

</details>
