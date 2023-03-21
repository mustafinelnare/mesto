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

const validPopupEditForm = new FormValidator(config, popupEditForm);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, popupAddForm);
validPopupAddForm.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});

const popupOpenEdit = new PopupWithForm(".popup_edit", (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.job });
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupOpenEdit.close();
}, popupEditForm);

popupOpenEdit.setEventListeners();

const popupOpenAdd = new PopupWithForm(".popup_add", (data) => {
  const title = data.title;
  const link = data.link;
  const card = createCard({ name: title, link: link });
  cards.prepend(card);
  popupOpenAdd.close();
  popupAddForm.reset();
  validPopupAddForm.resetValidation();
}, popupAddForm, titleInput, linkInput);

popupOpenAdd.setEventListeners();

const popupOpenImage = new PopupWithImage(".popup_open-image");

popupOpenImage.setEventListeners();

const sectionCard = new Section({
  renderer: (item) => {
    const card = createCard(item);
    sectionCard.setItem(card);
  }
}, ".element");

sectionCard.renderItems(initialCards);

function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
}

popupOpenBtnEdit.addEventListener("click", () => {
  popupOpenEdit.open();
  const userInfoGet = userInfo.getUserInfo();
  nameInput.value = userInfoGet.name;
  jobInput.value = userInfoGet.job;
});

popupOpenBtnAdd.addEventListener("click", () => {
  popupOpenAdd.open();
});
