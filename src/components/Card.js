export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, { handleCardDelete, handleAddLike, handleDeleteLike }) {
      this._templateSelector = templateSelector;
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
      this._userId = userId;
      this.cardId = data._id;
      this._ownerId = data.owner._id;
      this._handleCardDelete = handleCardDelete;
      this._handleAddLike = handleAddLike;
      this._handleDeleteLike = handleDeleteLike;
      this._likes = data.likes;
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
      this._countLikes = this._item.querySelector(".element__likes");
      this._countLikes.textContent = this._likes.length;
      this._likeButton = this._item.querySelector(".element__button");
      if (this._userId === this._ownerId) {
        this._item.querySelector(".element__trash").classList.add('trash-button');
      };
      this.toggleLikeState();
      this._setEventListeners();

      return this._item;
  }

  toggleLikeState() {
    this._countLikes.textContent = this._likes.length;
    if(this.isLiked()) {
      this.setLikes();
    } else {
      this.deleteLikes();
    }
  }

  removeCard() {
    this._item.remove();
    this._item = null;
  }

  setLikes() {
    this._likeButton.classList.add('element__button_active');
  }

  deleteLikes() {
    this._likeButton.classList.remove('element__button_active');
  }

  switchLikes(likes) {
    this._likes = likes;
    this.toggleLikeState();
  }

  isLiked() {
    return this._likes.some(item => item._id === this._userId);
  }

  _setEventListeners() {
      this._item.querySelector(".element__trash").addEventListener("click", () => {
          this._handleCardDelete();
      });
      this._likeButton.addEventListener("click", () => {
        if(this.isLiked()) {
          this._handleDeleteLike();
        } else {
          this._handleAddLike();
        }
      });
      this._cardImage.addEventListener("click", () => {
          this._handleCardClick(this._name, this._link);
      });
  };
};
