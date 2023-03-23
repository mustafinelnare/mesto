import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, config } from '../utils/constants.js';

const popupEditForm = document.forms.formEdit;
const popupAddForm = document.forms.formAdd;
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

function createCard(data) {
  const card = new Card(data, "#element", handleCardClick);
  return card.generateCard();
}

const sectionCard = new Section({
  renderer: (item) => {
    const card = createCard(item);
    sectionCard.setItem(card);
  }
}, ".element");

sectionCard.renderItems(initialCards);

const validPopupEditForm = new FormValidator(config, popupEditForm);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, popupAddForm);
validPopupAddForm.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});

const popupOpenEdit = new PopupWithForm(".popup_edit", (data) => {
  userInfo.setUserInfo(data);
  popupOpenEdit.close();
});

popupOpenEdit.setEventListeners();

const popupOpenAdd = new PopupWithForm(".popup_add", (data) => {
  const title = data.title;
  const link = data.link;
  const card = createCard({ name: title, link: link });
  sectionCard.setItem(card);
  popupOpenAdd.close();
  popupAddForm.reset();
  validPopupAddForm.resetValidation();
});

popupOpenAdd.setEventListeners();

const popupOpenImage = new PopupWithImage(".popup_open-image");

popupOpenImage.setEventListeners();

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
