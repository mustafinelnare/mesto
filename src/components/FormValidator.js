export default class FormValidator {
  constructor(config, formElement) {
      this._formElement = formElement;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id} + .popup__error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id} + .popup__error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
  }

  _isValid(inputElement) {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
      } else {
          this._hideInputError(inputElement);
      }
  }

  _toggleButtonState() {
      if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
      } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
      }
  }

  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  }

  _setEventListeners() {
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              this._isValid(inputElement);
              this._toggleButtonState();
          });
      });
  }

  enableValidation = () => {
      this._toggleButtonState();
      this._setEventListeners();
  };

  resetValidation() {
      this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
      });
      this._toggleButtonState();
  }
}
