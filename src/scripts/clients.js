import moment from 'moment';
import tippy from 'tippy.js';

import { users } from '../api/users';

import vk from '../assets/images/icon-1.svg';
import facebook from '../assets/images/icon-2.svg';
import phone from '../assets/images/icon-3.svg';
import email from '../assets/images/icon-4.svg';

import draw from '../assets/images/draw.svg';
import remove from '../assets/images/remove.svg';
import { usersData } from './modal';

const socials = [vk, facebook, phone, email];

export const list = document.querySelector('.clients__list');

export const clearList = () => {
  list.innerHTML = '';
};

export const renderUser = (user) => {
  const ddmmyy = moment().format('DD:MM:YYYY');
  const mmss = moment().format('HH:mm');

  const userItem = document.createElement('li');
  userItem.classList.add('clients__list-item');
  userItem.id = user.id;

  userItem.innerHTML = `
    <span class='clients__list-item-id'>
      ${user.id}
    </span>
    <div class='clients__list-info'>
      <div>
        <span class='clients__list-info-name'>
          ${user.name}
        </span>
        <span class='clients__list-info-surname'>
          ${user.surname}
        </span>
        <span class='clients__list-info-lastname'>
          ${user.lastname}
        </span>
      </div>
      <div class='clients__list-row'>
        <div class='clients__list-date'>
          <span>${ddmmyy}</span>
        </div>
        <div class='clients__list-time'>
          <span>${mmss}</span>
        </div>
      </div>
      <div class='clients__list-row'>
        <div class='clients__list-change'>
          <span>${ddmmyy}</span>
        </div>
        <div class='clients__list-change'>
          <span>${mmss}</span>
        </div>
      </div>
      <div class='clients__list-contacts'>
        ${socials
          .map((social) => {
            return `
              <div class='clients__list-contacts-row'>
                <img id="icons" class='clients__list-contacts-icon' src='${social}' alt='${social}'>
              </div>
            `;
          })
          .join('')}
      </div>
      <div class='clients__list-action'>
        <img src='${draw}' alt='draw'>
        <span class='clients__list-action-change'>Изменить</span>
        <img src='${remove}' class='remove' alt='remove'>
        <span data-id='remove' class='clients__list-action-remove'>Удалить</span>
      </div>
    </div>
`;

  list.insertAdjacentElement('beforeend', userItem);

  tippy('#icons', {
    content: 'Twitter: @den_77',
  });
};

export const createUsers = async () => {
  try {
    await users.getUsers().then((data) => {
      clearList();
      data.forEach((user) => {
        renderUser(user);

        list.addEventListener('click', removeUser);
      });
    });
  } catch (error) {
    console.log('Error:', error);
  }
};

async function removeUser(event) {
  if (event.target.dataset.id === 'remove') {
    const parentNode = event.target.closest('.clients__list-item');
    const id = +parentNode.id;

    usersData.filter((user) => user.id !== id);

    await users.removeUser(id);

    parentNode.remove();
  }
}

createUsers();
