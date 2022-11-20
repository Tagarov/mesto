const popupElement = document.querySelector(".popup_type_card");
const popupElementImage = popupElement.querySelector(".popup-figure__image");
const popupElementCaption = popupElement.querySelector(
  ".popup-figure__caption"
);
const popupElementCloseButton = popupElement.querySelector(
  ".popup__close-button"
);

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _handleEscKeyToClosePopup = (evt) => {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector("#element-template")
      .content.querySelector(".elements__element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _handleOpenPopup() {
    popupElementImage.setAttribute("src", this._link);
    popupElementImage.setAttribute("alt", `Фото ${this._name}`);
    popupElementCaption.textContent = this._name;
    popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscKeyToClosePopup);
  }

  _handleClosePopup() {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscKeyToClosePopup);
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => this._handleOpenPopup());
    popupElementCloseButton.addEventListener("click", () =>
      this._handleClosePopup()
    );
  }

  generateCard() {
    //Получаем DOM-элемент карточки
    this._element = this._getTemplate();
    //Заполняем DOM-элемент карточки данными из свойств карточки

    this._element.querySelector(".elements__element-name").textContent =
      this._name;
    const elementImage = this._element.querySelector(
      ".elements__element-image"
    );
    elementImage.setAttribute("src", this._link);
    elementImage.setAttribute("alt", `Фото ${this._name}`);
    this._setEventListeners();

    return this._element;
  }
}
