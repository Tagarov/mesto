export default class FormValidator {
  constructor(valObj, formElement) {
    this._formElement = formElement;
    this._valObj = valObj;
  }

  // функция проверки валидности всех полей в форме
  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    });
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять

  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._valObj.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "true");
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._valObj.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "true");
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Добавляем классы для ошибки валидации и очищаем текст ошибки
    inputElement.classList.add(this._valObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._valObj.errorClass);
  };

  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Убираем классы для ошибки валидации и очищаем текст ошибки
    inputElement.classList.remove(this._valObj.inputErrorClass);
    errorElement.classList.remove(this._valObj.errorClass);
    errorElement.textContent = "";
  };

  // Функция isValid теперь принимает formElement и inputElement,
  // а не берёт их из внешней области видимости

  _isValid = (inputElement) => {
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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._valObj.inputSelector)
    );
    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(
      this._valObj.submitButtonSelector
    );
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    this._setEventListeners();
  }
}