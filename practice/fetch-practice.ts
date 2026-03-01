export {};

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

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

const singleResult = await safeFetch<Post>(
  "https://jsonplaceholder.typicode.com/posts/1",
);
if (singleResult.ok) {
  console.log("Title:", singleResult.data.title);
} else {
  console.log("Error:", singleResult.error);
}

const allResult = await safeFetch<Post[]>(
  "https://jsonplaceholder.typicode.com/posts",
);
if (allResult.ok) {
  const titles = allResult.data.map((post) => post.title);
  console.log("First five titles:", titles.slice(0, 5));
} else {
  console.log("Error:", allResult.error);
}
