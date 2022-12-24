import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._btn = this._popup.querySelector(".popup__button");
  }

  open(handleButtonClick){
    this._handleButtonClick = handleButtonClick;
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener("click", () => {
      this._handleButtonClick();
    });
  }
  setButtonMessage(message) {
    this._btn.textContent = message;
  }
}
