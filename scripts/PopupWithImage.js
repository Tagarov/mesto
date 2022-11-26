import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    const elementImageCardPopup = this._popup.querySelector(
      ".popup-figure__image"
    );
    const elementCaptionCardPopup = this._popup.querySelector(
      ".popup-figure__caption"
    );
    elementImageCardPopup.setAttribute("src", link);
    elementImageCardPopup.setAttribute("alt", `Фото ${name}`);
    elementCaptionCardPopup.textContent = name;
    super.open();
  }
//   handleCardClick = (card) => {
//     this.open(card);
//   };
}
