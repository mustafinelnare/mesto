import Popup from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit_delete");
  }

  setCallbackConfirm(callbackConfirm) {
    this._callbackConfirm = callbackConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._callbackConfirm();
    });
  }
}
