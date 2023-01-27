const popupContainer = document.querySelector('.popup');
const popupContainerAdd = document.querySelector('.popup_add');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupCloseBtnAdd = document.querySelector('.popup__close-button_add');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const popupOpenBtnAdd = document.querySelector('.profile__add-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAdd = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
const likeBtn = document.querySelectorAll('.element__button');
const trashBtn = document.querySelectorAll('.element__trash');
const template = document.querySelector('#element').content.querySelector('.element__item');
const cards = document.querySelector('.element');
const createBtn = document.querySelector('.popup__submit_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

/* Массив карточек */

const initialCards = [
  {
    name: 'Алтай',
    link: 'https://i.postimg.cc/Yq86FXRP/altay.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://i.postimg.cc/BvPHdJ3W/kamchatka.jpg'
  },
  {
    name: 'Куршская коса',
    link: 'https://i.postimg.cc/g2T3Snfq/kosa.jpg'
  },
  {
    name: 'Маньпупунёр',
    link: 'https://i.postimg.cc/pXPQpNf8/man-pupu-ner.jpg'
  },
  {
    name: 'Сахалин',
    link: 'https://i.postimg.cc/MTkVwgZn/sakhalin.jpg'
  },
  {
    name: 'Териберка',
    link: 'https://i.postimg.cc/jS5z4zkS/teriberka.jpg'
  }
];

// Функция на прием данных из массива и добавления карточки

showCards();

function showCards() {
  const elements = initialCards.map((item) => {
    return createCard(item);
  });

  cards.prepend(...elements);
};

createBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const title = titleInput.value;
  const link = linkInput.value;

  const card = createCard({ name: title, link: link });

    cards.prepend(card);
    closePopup(popupContainerAdd);
});

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__title').textContent = item.name;

  card.querySelector('.element__trash').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.element__button').addEventListener('click', () => {
    card.querySelector('.element__button').classList.toggle('element__button_active');
  });

  return card;
}

// Открытие и закрытие модальных окон

function openPopup(popupContainerAdd) {
  popupContainerAdd.classList.add('popup_opened');
}

function closePopup(popupContainerAdd) {
  popupContainerAdd.classList.remove('popup_opened');
}

// Слушатель по клику на открытие модального окна для добавления карточки

popupOpenBtnAdd.addEventListener('click', function() {
  openPopup(popupContainerAdd);
});

popupCloseBtnAdd.addEventListener('click', function() {
  closePopup(popupContainerAdd);
});

// Редактирование имени и информации о себе

popupOpenBtnEdit.addEventListener('click', function() {
  openPopup(popupContainer);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupCloseBtn.addEventListener('click', function() {
  closePopup(popupContainer);
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupContainer);
};

popupForm.addEventListener('submit', handleFormSubmit);





/* Нажатие на кнопку Like

likeBtn.forEach(function(likeBtn){
  likeBtn.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__button_active');
});
});
*/
