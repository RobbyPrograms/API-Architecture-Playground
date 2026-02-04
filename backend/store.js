/**
 * Shared in-memory data store.
 * Used by REST and other API styles — single source of truth.
 */

const users = [
  { id: "1", name: "Alex", email: "alex@example.com" },
  { id: "2", name: "Sam", email: "sam@example.com" },
];

export function getUsers() {
  return [...users];
}

export function getUserById(id) {
  return users.find((u) => u.id === id) ?? null;
}

export function addUser(data) {
  const id = String(users.length + 1);
  const user = { id, ...data };
  users.push(user);
  return user;
}
