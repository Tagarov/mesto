import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
    this._getInputValues();
  }
  _getInputValues() {
    const inputValues = [];
    Array.from(this._form.querySelectorAll(".popup__input")).forEach(
      (input) => {
        console.log(input.value);
      }
    );
    console.log(inputValues);
  }
  formReset(){
    this._form.reset();
  }
}
