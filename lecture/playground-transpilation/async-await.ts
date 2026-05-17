async function fetchUser(id: number): Promise<string> {
  const url = `/api/users/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.name;
}

// caller
fetchUser(42).then((name) => console.log(name));
