const popupElement = document.querySelector(".popup_type_card");
const popupElementImage = popupElement.querySelector(".popup-figure__image");
const popupElementCaption = popupElement.querySelector(
  ".popup-figure__caption"
);
const popupElementCloseButton = popupElement.querySelector(
  ".popup__close-button"
);

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _handleEscKeyToClosePopup = (evt) => {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
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
  _deleteCard(evt) {
    evt.target.closest(".elements__element").remove();
  }

  _toggleLikeCard(evt) {
    evt.target.classList.toggle("elements__element-heart_active");
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => this._handleOpenPopup());
    popupElementCloseButton.addEventListener("click", () =>
      this._handleClosePopup()
    );
    this._element
      .querySelector(".elements__element-delete-button")
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(".elements__element-heart")
      .addEventListener("click", this._toggleLikeCard);
  }

  generateCard() {
    //Получаем DOM-элемент карточки
    this._element = this._getTemplate();
    //Заполняем DOM-элемент карточки данными из свойств карточки

    this._element.querySelector(".elements__element-name").textContent =
      this._name;
    this._elementImage = this._element.querySelector(
      ".elements__element-image"
    );
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", `Фото ${this._name}`);

    this._setEventListeners();

    return this._element;
  }
}
