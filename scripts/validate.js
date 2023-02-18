const popupForm = document.querySelector('.popup__form');
const popupInput = popupForm.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!popupInput.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__submit_disabled');
    buttonElement.disabled = false;
  }
};

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enableValidation();
