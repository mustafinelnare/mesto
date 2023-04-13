import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api";
import { config } from "../utils/constants.js";

const popupEditForm = document.forms.formEdit;
const popupAddForm = document.forms.formAdd;
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const profileAvatarBtn = document.querySelector(".profile__update");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
    headers: {
        authorization: "a0f27208-1338-40bf-beb2-4ac5a9a59cf6",
        "Content-Type": "application/json",
    },
});

const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
});

const popupConfirm = new PopupWithConfirmation(".popup_delete");

popupConfirm.setEventListeners();

function createCard(data) {
    const userData = userInfo.getUserInfo();
    const card = new Card(data, "#element", handleCardClick, userData.id, {
        handleCardDelete: () => {
            const sendCard = () => {
                api.deleteCard(card.cardId)
                    .then(() => {
                        card.removeCard();
                        popupConfirm.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
            popupConfirm.open();
            popupConfirm.setCallbackConfirm(sendCard);
        },
        handleAddLike: () => {
            api.addLike(card.cardId)
                .then((result) => {
                    card.switchLikes(result.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleDeleteLike: () => {
            api.deleteLike(card.cardId)
                .then((result) => {
                    card.switchLikes(result.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
    return card.generateCard();
}

const sectionCard = new Section(
    {
        renderer: (item) => {
            const card = createCard(item);
            sectionCard.setItem(card);
        },
    },
    ".element"
);

const validPopupEditForm = new FormValidator(config, popupEditForm);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, popupAddForm);
validPopupAddForm.enableValidation();

const popupUpdateAvatar = new PopupWithForm(".popup_update", (data) => {
    popupUpdateAvatar.submitProcess(true);
    api.saveDataProfile(data)
        .then((result) => {
            userInfo.setUserAvatar(result.avatar);
            popupUpdateAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupUpdateAvatar.submitProcess(false);
        });
});

popupUpdateAvatar.setEventListeners();

const popupOpenEdit = new PopupWithForm(".popup_edit", (data) => {
    popupOpenEdit.submitProcess(true);
    api.saveDataInfo(data)
        .then((result) => {
            userInfo.setUserInfo({ name: result.name, job: result.about });
            popupOpenEdit.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupOpenEdit.submitProcess(false);
        });
});

popupOpenEdit.setEventListeners();

const popupOpenAdd = new PopupWithForm(".popup_add", (data) => {
    popupOpenAdd.submitProcess("Сохранение...");
    const title = data.title;
    const link = data.link;
    api.addCard({ name: title, link: link })
        .then((cardInfo) => {
            const card = createCard(cardInfo);
            sectionCard.setItem(card);
            popupOpenAdd.close();
            popupAddForm.reset();
            validPopupAddForm.resetValidation();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupOpenAdd.submitProcess("Создать");
        });
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

profileAvatarBtn.addEventListener("click", () => {
    popupUpdateAvatar.open();
});

Promise.all([api.getDataUser(), api.getInitialCards()])
    .then((result) => {
        const [userData, initialCards] = result;
        console.log(userData);
        userInfo.setUserInfo({ name: userData.name, job: userData.about, userId: userData._id });
        userInfo.setUserAvatar(userData.avatar);
        sectionCard.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(err);
    });
