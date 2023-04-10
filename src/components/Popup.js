export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handlerEscapeKey = this._handlerEscapeKey.bind(this);
  }

  open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handlerEscapeKey);
  }

  close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handlerEscapeKey);
  }

  _handlerEscapeKey(evt) {
      if (evt.key === "Escape") {
          this.close();
      }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
            this.close();
        }
    });
}

}
