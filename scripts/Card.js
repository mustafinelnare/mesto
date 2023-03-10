export default class Card {
  constructor(data, templateSelector, handleCardClick) {
      this._templateSelector = templateSelector;
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
      const card = document.querySelector(this._templateSelector).content.querySelector(".element__item").cloneNode(true);
      return card;
  }

  generateCard() {
      this._item = this._getTemplate();
      this._cardImage = this._item.querySelector(".element__image");
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._item.querySelector(".element__title").textContent = this._name;
      this._setEventListeners();

      return this._item;
  }

  _setEventListeners() {
      this._item.querySelector(".element__trash").addEventListener("click", () => {
          this._item.remove();
      });
      this._item.querySelector(".element__button").addEventListener("click", (evt) => {
          evt.currentTarget.classList.toggle("element__button_active");
      });
      this._cardImage.addEventListener("click", () => {
          this._handleCardClick(this._name, this._link);
      });
  };
};
