let popupOpenBtn = document.querySelector('.profile__edit-button');
let popupContainer = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/* Открытие и закрытие */

popupCloseBtn.addEventListener('click', closePopup);

function openPopup() {
  popupContainer.classList.add('popup_opened');
}

function closePopup() {
  popupContainer.classList.remove('popup_opened');
}

/* Редактирование имени и информации о себе */

popupOpenBtn.addEventListener('click', function() {
  openPopup();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupCloseBtn.addEventListener('click', function() {
  closePopup();
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupContainer);
}

formElement.addEventListener('submit', handleFormSubmit);
