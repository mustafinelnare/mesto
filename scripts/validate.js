const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
      hideInputError(formElement, inputElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement, config);

          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};

function disableButton(button) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}


const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
      setEventListener(formElement, config);
  });
};

enableValidation(config);
