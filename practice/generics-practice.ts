function head<T>(arr: T[]): T | undefined {
  return arr[0];
}

function tail<T>(arr: T[]): T[] {
  return arr.slice(1);
}

function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const length = Math.min(a.length, b.length);
  return Array.from({ length }, (_, i) => [a[i], b[i]]);
}

function groupBy<T extends object>(
  arr: T[],
  key: keyof T,
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

interface User {
  id: number;
  name: string;
  role: "admin" | "member";
}

const users: User[] = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "member" },
  { id: 3, name: "Carol", role: "member" },
  { id: 4, name: "Dave", role: "admin" },
];

console.log(head(users));
console.log(tail(users));
console.log(zip(users, ["a", "b", "c"]));
console.log(groupBy(users, "role"));
