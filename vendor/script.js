const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

function openPopup() {
  popupContainer.classList.add('popup__opened');
}

function closePopup() {
  popupContainer.classList.remove('popup__opened');
}

popupContainer.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});
