export default class Card {
  constructor(data, templateSelector, handleElementClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleElementClick;
    this._handleOpenDeletePopup = handleDeleteClick;
    this._likeCounter = data.likes.length;
    this._id = data._id;
    this._owner = data.owner;
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
  };

  _toggleLikeCard(evt) {
    evt.target.classList.toggle("elements__element-heart_active");
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () =>
      this._handleOpenPopup({ name: this._name, link: this._link })
    );
    this._elementDeleteButton.addEventListener("click", () =>
      this._handleOpenDeletePopup(this)
    );
    this._element
      .querySelector(".elements__element-heart")
      .addEventListener("click", this._toggleLikeCard);
  }
  _isCardMine(clientId) {
    return this._owner._id === clientId;
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

    this._elementLikeCounter = this._element.querySelector(
      ".elements__element-like-counter"
    );
    this._elementLikeCounter.textContent = this._likeCounter;

    this._elementDeleteButton = this._element.querySelector(
      ".elements__element-delete-button"
    );

    if (this._isCardMine("2c24b0e4cc7402d0f2609066")) {
      this._elementDeleteButton.classList.remove(
        "elements__element-delete-button_disable"
      );
    }

    this._setEventListeners();

    return this._element;
  }
}
