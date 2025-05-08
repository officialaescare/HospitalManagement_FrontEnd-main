// Query function
export const fetchUsers = async () => {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Network error');
  return res.json();
};