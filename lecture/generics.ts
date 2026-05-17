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

const posts = await api<Post[]>("https://jsonplaceholder.typicode.com/posts");
const user = await api<User>("https://jsonplaceholder.typicode.com/users/1");

console.log(`Fetched ${posts.length} posts`);
console.log(`First post: ${posts[0].title}`);
console.log(`User: ${user.name} (${user.email})`);
