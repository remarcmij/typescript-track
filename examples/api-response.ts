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
