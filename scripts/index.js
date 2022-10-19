const allPopups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__person");
const profileDesc = document.querySelector(".profile__person-description");
const elementsSection = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;
const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const formProfileEdit = popupEditProfile.querySelector(".popup__form");
const nameInput = formProfileEdit.querySelector(".popup__input_field_name");
const jobInput = formProfileEdit.querySelector(".popup__input_field_desc");
const popupAddCard = document.querySelector(".popup_form_add-place");
const formAddElement = popupAddCard.querySelector(".popup__form");
const nameCardInput = formAddElement.querySelector(".popup__input_place_name");
const linkCardInput = formAddElement.querySelector(".popup__input_place_link");
const cardPopup = document.querySelector(".popup_type_card");
const elementImageCardPopup = cardPopup.querySelector(".popup-figure__image");
const elementCaptionCardPopup = cardPopup.querySelector(".popup-figure__caption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleAllPopupsCloseBtns() {
  allPopups.forEach((popup) => {
    popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => closePopup(popup));
  });
}

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const card = {};
  card.name = nameCardInput.value;
  card.link = linkCardInput.value;
  const elementNode = createCardElement(card);
  elementsSection.prepend(elementNode);
  closePopup(popupAddCard);
  formAddElement.reset();
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  //На случай закрытия попапа без сохранения, посылаем событие input, для валидации полей
  //иначе предыддущая ошибка сохраниться
  const event = new Event("input");
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);
  //Открываем попап 
  openPopup(popupEditProfile);
}

function openAddPopup() {
  openPopup(popupAddCard);
}

function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}

function toggleLikeCard(evt) {
  evt.target.classList.toggle("elements__element-heart_active");
}

function openCardPopup(card) {
  elementImageCardPopup.setAttribute("src", card.link);
  elementImageCardPopup.setAttribute("alt", `Фото ${card.name}`);
  elementCaptionCardPopup.textContent = card.name;
  openPopup(cardPopup);
}

function createCardElement(card) {
  const elementNode = elementTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const elementImage = elementNode.querySelector(".elements__element-image");
  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", `Фото ${card.name}`);
  elementNode
    .querySelector(".elements__element-delete-button")
    .addEventListener("click", deleteCard);
  elementNode
    .querySelector(".elements__element-heart")
    .addEventListener("click", toggleLikeCard);
  elementNode.querySelector(".elements__element-name").textContent = card.name;
  elementImage.addEventListener("click", () => openCardPopup(card));
  return elementNode;
}

function addCards(cardArray) {
  cardArray.forEach((card) => {
    const elementNode = createCardElement(card);
    elementsSection.append(elementNode);
  });
}


addCards(initialCards);
editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);
formProfileEdit.addEventListener("submit", handleSubmitEditForm);
formAddElement.addEventListener("submit", handleSubmitAddForm);
handleAllPopupsCloseBtns();