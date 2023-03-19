import Popup from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupSubtitle = this._popup.querySelector(".popup__subtitle");
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
