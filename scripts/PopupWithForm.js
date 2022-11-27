import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }
  _getInputValues() {
    const inputValues = {};
    Array.from(this._form.querySelectorAll(".popup__input")).forEach(
      (input) => {
        inputValues[input.name] = input.value;
      }
    );
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
  setInputValues(inputValues) {
    for (let key in inputValues) {
        const input = this._form.querySelector(`input[name="${key}"]`)
        if (input){
            input.value = inputValues[key];
        }
    }
  }
}
