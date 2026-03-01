# TypeScript Practice Exercises

Work through these exercises independently. Each one covers a different part of the curriculum — if you get stuck, the note at the top of each exercise tells you which page to review.

## How to run your code

Save each exercise to the filename shown, then run it directly:

```
node types.ts
node shapes.ts
# etc.
```

Node.js v22.18+ and v23.6+ support TypeScript files natively with no build step needed.

---

## Exercise 1 — Type Annotations

> [!NOTE]
> Review pages 02 (Type System) and 05 (Type Inference) if you get stuck.

**Save as: `types.ts`**

You are building a music playlist app. Your job is to add type annotations and write a few typed functions.

1. Annotate the `title`, `artist`, and `year` variables with explicit types.
2. Define a `Song` interface with `title: string`, `artist: string`, and `duration` (in seconds) as a `number`.
3. Create a variable `currentSong` of type `Song` and assign a value to it.
4. Create a `playlist` variable typed as `Song[]` containing at least three songs.
5. Write a function `formatDuration(seconds: number): string` that returns a duration string in `"m:ss"` format (e.g., `214` → `"3:34"`). Pad the seconds with a leading zero if needed.
6. Write a function `getInfo(input: string | Song): string`. When `input` is a `string`, return it as-is. When it is a `Song`, return `"${song.title} by ${song.artist}"`. Use a type guard to narrow the union.
7. Call both functions with a few different inputs and log the results.

```ts
// Save as: types.ts

// TODO 1: annotate these variables
let title = "Bohemian Rhapsody";
let artist = "Queen";
let year = 1975;

// TODO 2: define the Song interface
// interface Song { ... }

// TODO 3: create currentSong
// const currentSong: Song = { ... }

// TODO 4: create playlist
// const playlist: Song[] = [ ... ]

// TODO 5: implement formatDuration
function formatDuration(seconds: number): string {
  // hint: Math.floor(seconds / 60) gives minutes
  // hint: String(n).padStart(2, "0") pads with a leading zero
  return "";
}

// TODO 6: implement getInfo
function getInfo(input: string | Song): string {
  return "";
}

// TODO 7: call and log
console.log(formatDuration(214));   // "3:34"
console.log(getInfo("My playlist"));
// console.log(getInfo(currentSong));
```

---

## Exercise 2 — Interfaces and Type Aliases

> [!NOTE]
> Review page 03 (Interfaces vs Types) if you get stuck.

**Save as: `shapes.ts`**

You are modelling data for a simple online shop.

1. Define a `Product` interface with `name: string`, `price: number`, `category: string`, and an optional `inStock?: boolean`.
2. Define a `CartItem` type alias that combines a `Product` with a `quantity: number` field. Use an intersection (`&`) or inline extension — your choice.
3. Write a function `formatLineItem(item: CartItem): string` that returns a string like `"2x Widget — $19.98"` (quantity × price, formatted to two decimal places).
4. Create two `Product` objects and a `cart` array of `CartItem` values using those products.
5. Map over `cart` and log each formatted line item.

```ts
// Save as: shapes.ts

// TODO 1: define Product interface

// TODO 2: define CartItem type alias

// TODO 3: implement formatLineItem
function formatLineItem(item: CartItem): string {
  return "";
}

// TODO 4: create products and cart
// const widget: Product = { ... }
// const gadget: Product = { ... }
// const cart: CartItem[] = [ ... ]

// TODO 5: log each line item
// cart.map(formatLineItem).forEach(line => console.log(line));
```

---

## Exercise 3 — Function Types

> [!NOTE]
> Review page 07 (Function Types) if you get stuck.

**Save as: `transforms.ts`**

You are building a small data-pipeline helper.

1. Define a type alias `Transformer<T>` that represents a function taking a `T` and returning a `T`.
2. Write a function `pipe<T>(value: T, ...fns: Transformer<T>[]): T` that applies each function in `fns` to `value` in order and returns the final result.
3. Create three `number` transformers:
   - `double`: multiplies by 2
   - `addTen`: adds 10
   - `clamp0to100`: clamps the value between 0 and 100
4. Demonstrate `pipe` by calling `pipe(45, double, addTen, clamp0to100)` and logging the result.
5. Create at least one `string` transformer (e.g., `trim`, `uppercase`) and demonstrate `pipe` with strings too.

```ts
// Save as: transforms.ts

// TODO 1: define Transformer<T>
// type Transformer<T> = ...

// TODO 2: implement pipe
function pipe<T>(value: T, ...fns: Transformer<T>[]): T {
  return value; // replace this
}

// TODO 3: create number transformers
// const double: Transformer<number> = ...
// const addTen: Transformer<number> = ...
// const clamp0to100: Transformer<number> = ...

// TODO 4: demonstrate with numbers
// console.log(pipe(45, double, addTen, clamp0to100)); // 100

// TODO 5: create and demonstrate string transformers
```

---

## Exercise 4 — Generics

> [!NOTE]
> Review page 04 (Generics) if you get stuck.

**Save as: `generics-practice.ts`**

You are writing a small utility library for working with arrays.

1. Write `head<T>(arr: T[]): T | undefined` — returns the first element, or `undefined` for an empty array.
2. Write `tail<T>(arr: T[]): T[]` — returns all elements except the first (empty array if fewer than two elements).
3. Write `zip<A, B>(a: A[], b: B[]): [A, B][]` — pairs up elements at matching indices. Stop at the shorter array's length.
4. Write `groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>` — groups the array into an object keyed by the value of `key` on each element (convert the value to a string). Add a constraint so `T` must be an object.
5. Define a `User` interface with `id: number`, `name: string`, and `role: "admin" | "member"`. Create a `users` array of at least four users and demonstrate all four utility functions with it.

```ts
// Save as: generics-practice.ts

// TODO 1: implement head
function head<T>(arr: T[]): T | undefined {
  return undefined; // replace this
}

// TODO 2: implement tail
function tail<T>(arr: T[]): T[] {
  return []; // replace this
}

// TODO 3: implement zip
function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return []; // replace this
}

// TODO 4: implement groupBy
function groupBy<T extends object>(arr: T[], key: keyof T): Record<string, T[]> {
  return {}; // replace this
}

// TODO 5: define User and demonstrate
interface User {
  id: number;
  name: string;
  role: "admin" | "member";
}

const users: User[] = [
  // add at least 4 users, mix of roles
];

// console.log(head(users));
// console.log(tail(users));
// console.log(zip(users, ["a", "b", "c"]));
// console.log(groupBy(users, "role"));
```

---

## Exercise 5 — Utility Types

> [!NOTE]
> Review page 08 (Utility Types) if you get stuck.

**Save as: `utility-practice.ts`**

You are modelling a user profile system. Start from a complete interface and derive narrower types using built-in utility types.

1. Define a `UserProfile` interface with: `id: number`, `username: string`, `email: string`, `bio: string`, `avatarUrl: string`, `createdAt: string`.
2. Use `Omit` to create a `CreateUserPayload` type — everything except `id` and `createdAt` (the server sets those).
3. Use `Partial` to create an `UpdateUserPayload` type — all fields are optional because the client only sends what changed.
4. Use `Pick` to create a `PublicProfile` type — only `username`, `bio`, and `avatarUrl` (safe to display publicly).
5. Use `Record` to create a `UserStore` type — an object keyed by user `id` (as a string) mapping to full `UserProfile` values.
6. Write one function that uses each of the four derived types:
   - `createUser(payload: CreateUserPayload): UserProfile` — return a fake profile with a hard-coded `id` and `createdAt`
   - `updateUser(profile: UserProfile, changes: UpdateUserPayload): UserProfile` — merge changes into the profile
   - `toPublicProfile(profile: UserProfile): PublicProfile` — return only the public fields
   - `addToStore(store: UserStore, profile: UserProfile): UserStore` — return a new store with the profile added

```ts
// Save as: utility-practice.ts

// TODO 1: define UserProfile
interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}

// TODO 2: CreateUserPayload using Omit
// type CreateUserPayload = ...

// TODO 3: UpdateUserPayload using Partial
// type UpdateUserPayload = ...

// TODO 4: PublicProfile using Pick
// type PublicProfile = ...

// TODO 5: UserStore using Record
// type UserStore = ...

// TODO 6: implement the four functions
function createUser(payload: CreateUserPayload): UserProfile {
  return { id: 1, createdAt: new Date().toISOString(), ...payload };
}

function updateUser(profile: UserProfile, changes: UpdateUserPayload): UserProfile {
  return profile; // replace this
}

function toPublicProfile(profile: UserProfile): PublicProfile {
  return profile; // replace this — hint: return only the three public fields
}

function addToStore(store: UserStore, profile: UserProfile): UserStore {
  return store; // replace this
}

// Demonstrate each function
const newUser = createUser({
  username: "alice",
  email: "alice@example.com",
  bio: "Learning TypeScript",
  avatarUrl: "https://example.com/alice.png",
});
console.log(newUser);
// console.log(updateUser(newUser, { bio: "TypeScript enthusiast" }));
// console.log(toPublicProfile(newUser));
// console.log(addToStore({}, newUser));
```

---

## Exercise 6 — Discriminated Unions and Type Guards

> [!NOTE]
> Review pages 06 (Unions and Intersections) and 10 (Type Guards) if you get stuck.

**Save as: `state-machine.ts`**

You are modelling the state of a file download.

1. Define a `DownloadState` discriminated union with four variants, each using a `kind` field as the discriminant:
   - `{ kind: "idle" }`
   - `{ kind: "downloading"; progress: number; bytesLoaded: number; bytesTotal: number }`
   - `{ kind: "done"; filePath: string }`
   - `{ kind: "failed"; error: string }`
2. Write a helper `assertNever(value: never): never` that throws an error — you will use it to make switch statements exhaustive.
3. Write `describeState(state: DownloadState): string` using a `switch` on `state.kind`. Handle all four variants and call `assertNever(state)` in the `default` branch.
4. Write a type predicate `isDownloading(state: DownloadState): state is Extract<DownloadState, { kind: "downloading" }>` that returns `true` only when the download is in progress.
5. Create one value for each variant and log `describeState` for each. Use `isDownloading` to log the progress only when relevant.

```ts
// Save as: state-machine.ts

// TODO 1: define DownloadState union
// type DownloadState = ...

// TODO 2: implement assertNever
function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`);
}

// TODO 3: implement describeState
function describeState(state: DownloadState): string {
  switch (state.kind) {
    // TODO: handle each case
    default:
      return assertNever(state);
  }
}

// TODO 4: implement isDownloading type predicate
function isDownloading(state: DownloadState): state is Extract<DownloadState, { kind: "downloading" }> {
  return false; // replace this
}

// TODO 5: create values and demonstrate
const idle: DownloadState = { kind: "idle" };
// const downloading: DownloadState = { ... }
// const done: DownloadState = { ... }
// const failed: DownloadState = { ... }

const states: DownloadState[] = [idle /*, downloading, done, failed */];
for (const state of states) {
  console.log(describeState(state));
  if (isDownloading(state)) {
    console.log(`  Progress: ${state.progress}%`);
  }
}
```

---

## Exercise 7 — Typed Fetch

> [!NOTE]
> Review page 09 (API Responses) if you get stuck.

**Save as: `fetch-practice.ts`**

You are fetching posts from the public [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

1. Define a `Post` interface with `id: number`, `title: string`, `body: string`, and `userId: number`.
2. Define a `FetchResult<T>` discriminated union:
   - `{ ok: true; data: T }`
   - `{ ok: false; error: string }`
3. Write `safeFetch<T>(url: string): Promise<FetchResult<T>>` that fetches the URL, parses JSON, and returns a `FetchResult`. If the HTTP response is not `ok`, or if `fetch` throws, return the `{ ok: false, error }` variant.
4. Fetch a single post from `https://jsonplaceholder.typicode.com/posts/1`. If the result is `ok`, log `"Title: <title>"`. If not, log `"Error: <message>"`.
5. Fetch all posts from `https://jsonplaceholder.typicode.com/posts`. If `ok`, map the array to just the titles and log the first five.

```ts
// Save as: fetch-practice.ts

// TODO 1: define Post
// interface Post { ... }

// TODO 2: define FetchResult<T>
// type FetchResult<T> = ...

// TODO 3: implement safeFetch
async function safeFetch<T>(url: string): Promise<FetchResult<T>> {
  // hint: wrap everything in try/catch
  // hint: check response.ok before calling response.json()
  return { ok: false, error: "not implemented" };
}

// TODO 4: fetch a single post
const singleResult = await safeFetch<Post>("https://jsonplaceholder.typicode.com/posts/1");
if (singleResult.ok) {
  console.log("Title:", singleResult.data.title);
} else {
  console.log("Error:", singleResult.error);
}

// TODO 5: fetch all posts and log the first five titles
const allResult = await safeFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
if (allResult.ok) {
  const titles = allResult.data.map(post => post.title);
  console.log("First five titles:", titles.slice(0, 5));
} else {
  console.log("Error:", allResult.error);
}
```
