const popupContainer = document.querySelector('.popup');
const popupContainerAdd = document.querySelector('.popup_add');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupCloseBtnAdd = document.querySelector('.popup__close-button_add');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const popupOpenBtnAdd = document.querySelector('.profile__add-button');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
const likeBtn = document.querySelectorAll('.element__button');
const trashBtn = document.querySelectorAll('.element__trash');
const cards = document.querySelector('.element');

/* Карточки */

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

const elementTemplate = document.querySelector('#element').content;

function addCard(name, link) {
  const elementsTemplate = elementTemplate.querySelector('.element__item').cloneNode(true);
  elementsTemplate.querySelector('.element__image').src = link;
  elementsTemplate.querySelector('.element__title').textContent = name;
  elementsTemplate.append(cards);

  initialCards.forEach(function () {
    elementImage.src = elementsTemplate.querySelector('.element__image').src;
    elementTitle.textContent = elementsTemplate.querySelector('.element__title').textContent;
});
};

/* Открытие и закрытие */

function openPopup() {
  popupContainer.classList.add('popup_opened');
}

function closePopup() {
  popupContainer.classList.remove('popup_opened');
}

function openPopup(popupContainerAdd) {
  popupContainerAdd.classList.add('popup_opened');
}

function closePopup(popupContainerAdd) {
  popupContainerAdd.classList.remove('popup_opened');
}

/* Редактирование имени и информации о себе */

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
}

popupForm.addEventListener('submit', handleFormSubmit);

/* Открытие модального окна на добавлении новой карточки */

popupOpenBtnAdd.addEventListener('click', function() {
  openPopup(popupContainerAdd);
  linkInput.value = elementImage.textContent;
});

popupCloseBtnAdd.addEventListener('click', function() {
  closePopup(popupContainerAdd);
});

/* Нажатие на кнопку Like */

likeBtn.forEach(function(likeBtn){
  likeBtn.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__button_active');
});
});

/* Удаление карточки */

