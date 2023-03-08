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

const popupOpenEdit = document.querySelector(".popup_edit");
const popupOpenAdd = document.querySelector(".popup_add");
const popupOpenImage = document.querySelector(".popup_open-image");
const popupEditForm = document.querySelector(".popup__form_edit");
const popupAddForm = document.querySelector(".popup__form_add");
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupCloseBtn = document.querySelector(".popup__close-button");
const popupCloseBtnAdd = document.querySelector(".popup__close-button_add");
const popupCloseBtnImage = document.querySelector(".popup__close-button_image");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const popupSubmitAdd = document.querySelector(".popup__submit_add");
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

const ValidPopupEditForm = new FormValidator(config, popupEditForm);
ValidPopupEditForm.enableValidation();

const ValidPopupAddForm = new FormValidator(config, popupAddForm);
ValidPopupAddForm.enableValidation();

function showInitialCards() {
    const elements = initialCards.map((item) => {
        const card = new Card(item);
        return createCard(item);
    });

    cards.append(...elements);
};

showInitialCards();

function createCard(item) {
    const card = template.cloneNode(true);
    card.querySelector(".element__image").src = item.link;
    card.querySelector(".element__image").alt = item.name;
    card.querySelector(".element__title").textContent = item.name;

    card.querySelector(".element__trash").addEventListener("click", () => {
        card.remove();
    });

    card.querySelector(".element__button").addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("element__button_active");
    });

    card.querySelector(".element__image").addEventListener("click", () => {
        openPopup(popupOpenImage);
        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupSubtitle.textContent = item.name;
    });

    return card;
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
};

function disableButton(button) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
};

popupOpenBtnEdit.addEventListener("click", () => {
    openPopup(popupOpenEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});
popupOpenBtnAdd.addEventListener("click", () => {
    openPopup(popupOpenAdd);
    disableButton(popupSubmitAdd);
});

popupCloseBtn.addEventListener("click", () => {
    popupEditForm.reset();
    closePopup(popupOpenEdit);
});

popupCloseBtnAdd.addEventListener("click", () => {
    closePopup(popupOpenAdd);
});

popupCloseBtnImage.addEventListener("click", () => {
    closePopup(popupOpenImage);
});

function formEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupOpenEdit);
};

popupEditForm.addEventListener("submit", formEditSubmit);

function formAddSubmit(evt) {
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;

    const card = createCard({ name: title, link: link });

    cards.prepend(card);
    popupAddForm.reset();
    closePopup(popupOpenAdd);
};

popupAddForm.addEventListener("submit", formAddSubmit);

document.addEventListener("keydown", keyHandlerEscape);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('keydown', keyHandlerEscape);
});

function keyHandlerEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        if (popupOpened) {
            closePopup(popupOpened);
        };
    };
};

const popupOverlays = document.querySelectorAll(".popup");
popupOverlays.forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});
