let popupOpenBtn = document.querySelector('.profile__edit-button');
let popupContainer = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/* Открытие и закрытие */

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

function openPopup() {
  popupContainer.classList.add('popup__opened');
}

function closePopup() {
  popupContainer.classList.remove('popup__opened');
}

/* Выход из попапа ткнув в пустое место */

popupContainer.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

/* Редактирование имени и информации о себе */

popupOpenBtn.addEventListener('click', function() {
  openPopup(popupContainer);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupCloseBtn.addEventListener('click', function() {
  closePopup(popupContainer);
});

popupContainer.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupContainer);
  }
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupContainer);
}

formElement.addEventListener('submit', handleFormSubmit);
