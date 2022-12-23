import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._btn = this._popup.querySelector(".popup__button");
    this._handleButtonClick = handleButtonClick;
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
