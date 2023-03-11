import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
    {
        name: "Алтай",
        link: "https://i.postimg.cc/Yq86FXRP/altay.jpg",
    },
    {
        name: "Камчатка",
        link: "https://i.postimg.cc/BvPHdJ3W/kamchatka.jpg",
    },
    {
        name: "Куршская коса",
        link: "https://i.postimg.cc/g2T3Snfq/kosa.jpg",
    },
    {
        name: "Маньпупунёр",
        link: "https://i.postimg.cc/pXPQpNf8/man-pupu-ner.jpg",
    },
    {
        name: "Сахалин",
        link: "https://i.postimg.cc/MTkVwgZn/sakhalin.jpg",
    },
    {
        name: "Териберка",
        link: "https://i.postimg.cc/jS5z4zkS/teriberka.jpg",
    },
];

const popups = document.querySelectorAll(".popup");
const popupOpenEdit = document.querySelector(".popup_edit");
const popupOpenAdd = document.querySelector(".popup_add");
const popupOpenImage = document.querySelector(".popup_open-image");
const popupEditForm = document.forms.formEdit;
const popupAddForm = document.forms.formAdd;
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const template = document.querySelector("#element").content.querySelector(".element__item");
const cards = document.querySelector(".element");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup__image");
const popupSubtitle = document.querySelector(".popup__subtitle");

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active",
};

const validPopupEditForm = new FormValidator(config, popupEditForm);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, popupAddForm);
validPopupAddForm.enableValidation();

function showInitialCards() {
    initialCards.map((item) => {
        const card = createCard(item);
        cards.append(card);
    });
}

showInitialCards();

function createCard(data) {
    const card = new Card(data, "#element", handleCardClick);
    return card.generateCard();
}

function handleCardClick(name, link) {
    openPopup(popupOpenImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupSubtitle.textContent = name;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handlerEscapeKey);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handlerEscapeKey);
}

popupOpenBtnEdit.addEventListener("click", () => {
    openPopup(popupOpenEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});
popupOpenBtnAdd.addEventListener("click", () => {
    openPopup(popupOpenAdd);
});

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close-button")) {
            closePopup(popup);
        }
    });
});

function handlerEscapeKey(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        if (popupOpened) {
            closePopup(popupOpened);
        }
    }
}

popupEditForm.addEventListener("submit", handleEditSubmit);
popupAddForm.addEventListener("submit", handleAddSubmit);

function handleEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupOpenEdit);
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;

    const card = createCard({ name: title, link: link });

    cards.prepend(card);
    popupAddForm.reset();
    validPopupAddForm.resetValidation();
    closePopup(popupOpenAdd);
}
