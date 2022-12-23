export default class Card {
  constructor(
    data,
    templateSelector,
    handleElementClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleElementClick;
    this._handleOpenDeletePopup = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likes = data.likes;
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

  _toggleLikeCard() {
    this._elementLike.classList.toggle("elements__element-heart_active");
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () =>
      this._handleOpenPopup({ name: this._name, link: this._link })
    );
    this._elementDeleteButton.addEventListener("click", () => {
      this._handleOpenDeletePopup(this);
    });
    this._elementLike.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
  }
  _isCardMine(userId) {
    return this._owner._id === userId;
  }
  isLikedByMe(userId) {
    if (this._likes.find((item) => item._id === userId)) {
      return true;
    }
    return false;
  }
  updateLike(likes) {
    this._likes = likes;
    this._toggleLikeCard();
    this._elementLikeCounter.textContent = this._likes.length;
  }
  getCardId() {
    return this._id;
  }

  generateCard(userId) {
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

    this._elementLike = this._element.querySelector(".elements__element-heart");

    this._elementLikeCounter = this._element.querySelector(
      ".elements__element-like-counter"
    );
    this._elementLikeCounter.textContent = this._likes.length;

    this._elementDeleteButton = this._element.querySelector(
      ".elements__element-delete-button"
    );

    if (this._isCardMine(userId)) {
      this._elementDeleteButton.classList.remove(
        "elements__element-delete-button_disable"
      );
    }

    if (this.isLikedByMe(userId)) {
      this._toggleLikeCard();
    }

    this._setEventListeners();

    return this._element;
  }
}
