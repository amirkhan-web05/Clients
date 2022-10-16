import { users } from '../api/users';
import closeSvg from '../assets/images/close.svg';
import btnPlus from '../assets/images/add_circle_outline.svg';
import { createUsers } from './clients';

export const usersData = [];
const clientsAdd = document.querySelector('.clients__add');

const getID = async () => {
  return await users.getUsers().then((data) => {
    return data.map((user) => user.id);
  });
};

const createModal = async () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML(
    'beforeend',
    `
    <div class='modal__inner'>
      <div class='modal__content'>
        <div class='modal__data'>
          <div class='change-data'>
            <h3>Изменить данные</h3>
            <span>ID: ${await getID()}</span>
          </div>
          <img class='modal__close' src="${closeSvg}">
        </div>
        <form class='modal__form'>
          <div class='modal__form-input'>
            <label>Фамилия</label>
            <input class='modal__form-input-surname' type='text'>
          </div>
          <div class='modal__form-input'>
            <label>Имя</label>
            <input class='modal__form-input-name' type='text'>
          </div>
          <div class='modal__form-input'>
            <label>Отчество</label>
            <input class='modal__form-input-lastname' type='text'>
          </div>
          <div>
          <button class='modal__plus'>
            <img src="${btnPlus}">
            Добавить контакт
          </button>
          </div>
          <div class='modal__save'>
            <button class='modal__client'>Сохранить</button>
            <a href='#'>Удалить клиента</a>
          </div>
        </form>
      </div>
    </div>
  `
  );

  document.body.insertAdjacentElement('beforeend', modal);

  const saveUser = document.querySelector('.modal__client');
  const surname = document.querySelector('.modal__form-input-surname');
  const name = document.querySelector('.modal__form-input-name');
  const lastname = document.querySelector('.modal__form-input-lastname');
  const modalClose = modal.querySelector('.modal__close');

  saveUser.addEventListener('click', async () => {
    // event.preventDefault();

    const newUser = {
      name: name.value,
      surname: surname.value,
      lastname: lastname.value,
    };
    await users
      .addUser(newUser)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        usersData.push(data);
        createUsers();
      });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  return modal;
};

clientsAdd.addEventListener('click', async () => {
  (await createModal()).style.display = 'block';
});
