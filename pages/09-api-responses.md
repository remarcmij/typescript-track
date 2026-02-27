# Type-Safe API Responses

When your app fetches data from an API, the response comes back as unknown data. TypeScript can't know at compile time what the server will return — you need to tell it.

The examples in this section use [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API for testing. You can run every example with `node filename.ts` and see real responses.

> [!TIP]
> The `Post` interface appears in every code block below so that each example is self-contained and runnable on its own. In a real project you'd define it once and import it where needed.

## The Problem

`fetch` returns `Promise<Response>`, and `.json()` returns `Promise<any>`. That `any` is a hole in your type safety:

```ts
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await response.json(); // type: any — no safety here
```

Because `data` is `any`, TypeScript won't catch misspelled property names, wrong types, or missing fields. You could write `data[0].titl` and TypeScript wouldn't complain — but it would be `undefined` at runtime.

## Typing API Responses

The solution is to define an interface that matches the API's response shape and use it to annotate the result. JSONPlaceholder's `/posts` endpoint returns an array of post objects, each with `userId`, `id`, `title`, and `body`:

```ts
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}

const posts = await fetchPosts();
console.log(`Fetched ${posts.length} posts`);
console.log(posts[0].title); // TypeScript knows this is a string
```

The annotation `const posts: Post[]` on the `.json()` result tells TypeScript to treat the parsed JSON as an array of `Post` objects. Now every consumer of `fetchPosts()` gets full type checking and autocomplete — `posts[0].title` is a `string`, `posts[0].id` is a `number`, and `posts[0].titl` would be flagged as an error.

## A Reusable Fetch Wrapper

You can write a generic wrapper that works for any response type. The caller specifies the expected type using `<T>` at the call site:

```ts
async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const posts = await api<Post[]>('https://jsonplaceholder.typicode.com/posts');
const user = await api<User>('https://jsonplaceholder.typicode.com/users/1');

console.log(`Fetched ${posts.length} posts`);
console.log(`First post: ${posts[0].title}`);
console.log(`User: ${user.name} (${user.email})`);
```

The `as Promise<T>` tells TypeScript to treat the result of `.json()` as the type the caller specified. `api<Post[]>(...)` fills in `T = Post[]`, so TypeScript knows `posts` is a `Post[]`. `api<User>(...)` fills in `T = User`, so `user` is a `User`. One function handles both cases because the type parameter adapts to each call.

## Handling Fetch Failures

The `api` wrapper above throws an error when something goes wrong. The caller can wrap the call in `try`/`catch`, but nothing in the type system reminds them to do so — it's easy to forget. An alternative approach is to **return** the error instead of throwing it, using a discriminated union to represent success and failure as two distinct shapes. This way the caller *must* check which case they're dealing with before they can access the data.

Here's a complete example. `FetchResult<T>` is a union of two cases: success (`ok: true` with a `data` field) and failure (`ok: false` with an `error` message). The `safeFetch` wrapper catches every failure and returns it as the error variant, so the caller never needs `try`/`catch` — they just check `result.ok`:

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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const result = await safeFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

if (result.ok) {
  console.log(`Fetched ${result.data.length} posts`); // data is Post[] here
} else {
  console.error(result.error); // only error is available here
}
```

The function handles three scenarios: a successful response returns `{ ok: true, data }` with the parsed JSON. An HTTP error (like 404 or 500) returns `{ ok: false, error }` with the status code. A network failure (server unreachable, DNS error) is caught by the `catch` block and also returned as `{ ok: false, error }`.

Inside the `if (result.ok)` branch, TypeScript narrows the type to the success case, so `result.data` is available and typed as `Post[]`. In the `else` branch, TypeScript narrows to the failure case, so only `result.error` is available. This is the same discriminated union pattern you saw in the type guards section — here applied to a real-world problem.

> **Hands on:** Write a `safeFetch` wrapper that returns a `FetchResult<T>` discriminated union. Use it to fetch a single user from `https://jsonplaceholder.typicode.com/users/1` and an invalid URL. Handle both the success and error cases.

<details>
<summary>Show code</summary>

Save as `api-response.ts` and run with `node api-response.ts`.

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

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// This should succeed
const userResult = await safeFetch<User>('https://jsonplaceholder.typicode.com/users/1');

if (userResult.ok) {
  console.log(`User: ${userResult.data.name} (${userResult.data.email})`);
} else {
  console.error(`Failed to fetch user: ${userResult.error}`);
}

// This should fail with HTTP 404
const badResult = await safeFetch<User>('https://jsonplaceholder.typicode.com/users/9999');

if (badResult.ok) {
  console.log(`User: ${badResult.data.name}`);
} else {
  console.error(`Failed to fetch user: ${badResult.error}`);
}
```

Try accessing `badResult.data` without checking `badResult.ok` first — TypeScript will flag it because `data` only exists on the success variant.

</details>
