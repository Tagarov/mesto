export default class FormValidator {
  constructor(valObj, formElement) {
    this._formElement = formElement;
    this._valObj = valObj;
  }

  // функция проверки валидности всех полей в форме
  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    });
  };

  disableButton() {
    this._buttonElement.classList.add(this._valObj.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "true");
  }

  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disableButton();
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._valObj.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "true");
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // Добавляем классы для ошибки валидации и очищаем текст ошибки
    inputElement.classList.add(this._valObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._valObj.errorClass);
  };

  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // Убираем классы для ошибки валидации и очищаем текст ошибки
    inputElement.classList.remove(this._valObj.inputErrorClass);
    errorElement.classList.remove(this._valObj.errorClass);
    errorElement.textContent = "";
  };

  // Функция isValid теперь принимает formElement и inputElement,
  // а не берёт их из внешней области видимости

  _toggleInputErrorState = (inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._valObj.inputSelector)
    );
    // Найдём в текущей форме кнопку отправки
    this._buttonElement = this._formElement.querySelector(
      this._valObj.submitButtonSelector
    );
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      this._toggleInputErrorState(inputElement);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
