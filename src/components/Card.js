export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleCardClick;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _deleteCard = () => {
    this._element.remove();
  }

  _toggleLikeCard(evt) {
    evt.target.classList.toggle("elements__element-heart_active");
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () =>
      this._handleOpenPopup({ name: this._name, link: this._link })
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
