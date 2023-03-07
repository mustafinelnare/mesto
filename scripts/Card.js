export default class Card {
  constructor(data, selectors) {
      this._selectors = selectors;
      this._name = data.name;
      this._link = data.link;
  }

  _getTemplate() {
      const card = document.querySelector(this._selectors).content.querySelector(".element__item").cloneNode(true);
      return card;
  }

  createCard() {
      this._item = this._getTemplate();
      this._setEventListeners();
      this._item.querySelector(".element__image").src = this._link;
      this._item.querySelector(".element__image").alt = this._name;
      this._item.querySelector(".element__title").textContent = this._name;

      return this._item;
  }

  _setEventListeners() {
      this._item.querySelector(".element__trash").addEventListener("click", () => {
          this._item.remove();
      });
      this._item.querySelector(".element__button").addEventListener("click", (evt) => {
          evt.currentTarget.classList.toggle("element__button_active");
      });
      this._item.querySelector(".element__image").addEventListener("click", () => {
          openPopup(popupOpenImage);
          popupImage.src = this._link;
          popupImage.alt = this._name;
          popupSubtitle.textContent = this._name;
      });
  };
};
