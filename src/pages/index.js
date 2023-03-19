import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, config } from '../utils/constants.js';

const popupEditForm = document.forms.formEdit;
const popupAddForm = document.forms.formAdd;
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cards = document.querySelector(".element");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");

function createCard(data) {
  const card = new Card(data, "#element", handleCardClick);
  return card.generateCard();
}

const sectionCard = new Section({
  data: initialCards,
  renderer: createCard,
}, "#element");

sectionCard.renderItems();

const validPopupEditForm = new FormValidator(config, popupEditForm);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, popupAddForm);
validPopupAddForm.enableValidation();

const popup = new Popup(".popup");
popup.open();
popup.close();

const popupOpenEdit = new PopupWithForm(".popup_edit", (data) => {
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.job;
});

popupOpenEdit.setEventListeners();

const popupOpenAdd = new PopupWithForm(".popup_add", (data) => {
  const card = createCard(data);
  cards.append(card);
});

popupOpenAdd.setEventListeners();

const popupOpenImage = new PopupWithImage(".popup_open-image");

popupOpenImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});

function showInitialCards() {
    initialCards.map((item) => {
        const card = createCard(item);
        cards.append(card);
    });
}

showInitialCards();

function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
}

popupEditForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupOpenEdit.close();
});

popupAddForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;

  const card = createCard({ name: title, link: link });

  cards.prepend(card);
  validPopupAddForm.resetValidation();
  popupOpenAdd.close();
  popupAddForm.reset();
});


popupOpenBtnEdit.addEventListener("click", () => {
  popupOpenEdit.open();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupOpenBtnAdd.addEventListener("click", () => {
  popupOpenAdd.open();
});
