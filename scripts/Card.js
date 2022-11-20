class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector("#element-template")
      .content.querySelector(".elements__element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
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

    return this._element;
  }
}
