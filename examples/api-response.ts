interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  total: number;
}

function fetchUsers(): ApiResponse<User[]> {
  return {
    data: [
      { id: 1, name: 'Aisha', email: 'aisha@example.com' },
      { id: 2, name: 'Ben', email: 'ben@example.com' },
    ],
    total: 2,
  };
}

const result = fetchUsers();
console.log(`Fetched ${result.total} users:`);
result.data.forEach((user) => console.log(`  ${user.name} (${user.email})`));
