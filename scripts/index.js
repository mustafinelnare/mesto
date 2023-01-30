const popup = document.querySelector('.popup');
const popupOpenEdit = document.querySelector('.popup_edit');
const popupOpenAdd = document.querySelector('.popup_add');
const popupOpenImage = document.querySelector('.popup_open-image');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupCloseBtnAdd = document.querySelector('.popup__close-button_add');
const popupCloseBtnImage = document.querySelector('.popup__close-button_image');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const popupOpenBtnAdd = document.querySelector('.profile__add-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAdd = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const template = document.querySelector('#element').content.querySelector('.element__item');
const cards = document.querySelector('.element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup__image');
const popupSubtitle = document.querySelector('.popup__subtitle');

function showInitialCards() {
  const elements = initialCards.map((item) => {
    return createCard(item);
  });

  cards.prepend(...elements);
};

showInitialCards();

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  card.querySelector('.element__title').textContent = item.name;

  card.querySelector('.element__trash').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.element__button').addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('element__button_active');
  });

  card.querySelector('.element__image').addEventListener('click', () => {
    popupOpenImage.classList.add('popup_opened');
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupSubtitle.textContent = item.name;
  });

  return card;
};

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupOpenBtnEdit.addEventListener('click', function() {
  openPopup(popupOpenEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupOpenBtnAdd.addEventListener('click', function() {
  popupOpenAdd.classList.add('popup_opened');
});

popupCloseBtn.addEventListener('click', function() {
  closePopup(popupOpenEdit);
});

popupCloseBtnAdd.addEventListener('click', function() {
  popupOpenAdd.classList.remove('popup_opened');
});

popupCloseBtnImage.addEventListener('click', function() {
  popupOpenImage.classList.remove('popup_opened');
});

function formEditSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popup);
};

popupForm.addEventListener('submit', formEditSubmit);

function formAddSubmit (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;

  const card = createCard({ name: title, link: link });

  cards.prepend(card);
  popupFormAdd.reset();
  popupOpenAdd.classList.remove('popup_opened');
};

popupFormAdd.addEventListener('submit', formAddSubmit);
