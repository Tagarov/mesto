import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }
  getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitForm);
  }
  close() {
    this._form.reset();
    super.close();
  }
  // setInputValues(inputValues) {
  //   for (let key in inputValues) {
  //     const input = this._form.querySelector(`input[name="${key}"]`);
  //     if (input) {
  //       input.value = inputValues[key];
  //     }
  //   }
  // }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта
      //по атрибуту `name` этого инпута
      if (data[input.name]) { // проверка что в переданном объекте есть данные для вставки в инпут
        input.value = data[input.name];
      }
    });
  }
}
