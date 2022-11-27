import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-figure__image");
    this._caption = this._popup.querySelector(".popup-figure__caption");
  }

  open({ link, name }) {
    this._image.setAttribute("src", link);
    this._image.setAttribute("alt", `Фото ${name}`);
    this._caption.textContent = name;
    super.open();
  }
}
