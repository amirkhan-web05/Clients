import { users } from '../api/users';
import { createUsers, list, renderUser } from './clients';

const searchInput = document.querySelector('.input');

const clearList = () => {
  list.innerHTML = '';
};

const noResult = () => {
  const li = document.createElement('li');
  li.classList.add('no-result');
  li.innerHTML = 'По вашему запросу клиента нет..';

  list.append(li);
};

const renderList = (results) => {
  clearList();

  results.map((res) => {
    renderUser(res);
  });

  if (results.length === 0) {
    noResult();
  }
};

searchInput.addEventListener('input', async (e) => {
  const text = e.target.value;

  if (text && text.trim().length > 0) {
    await users
      .getUsers(text)
      .then((data) =>
        renderList(
          data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          )
        )
      );
  } else {
    createUsers();
  }
});
