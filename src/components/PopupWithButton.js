import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._btn = this._popup.querySelector(".popup__button");
    this._handleButtonClick = handleButtonClick;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener("click", () => {
      this._handleButtonClick(this._card)
    });
  }
  setButtonMessage(message){
    this._btn.textContent = message;
  }
}
