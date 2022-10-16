export const users = {
  async getUsers(name) {
    const res = await fetch(
      `http://localhost:3001/users${name ? `?name=${name}` : ''}`
    );
    const data = await res.json();

    return data;
  },
  async addUser(user) {
    const res = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    });

    return res;
  },
  async removeUser(id) {
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    return data;
  },
};
