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
