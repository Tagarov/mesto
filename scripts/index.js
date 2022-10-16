const allPopups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const popupAddCard = document.querySelector(".popup_form_add-place");
const profileName = document.querySelector(".profile__person");
const profileDesc = document.querySelector(".profile__person-description");
const elementsSection = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;
const cardPopup = document.querySelector(".popup_type_card");

function handleAllPopupsCloseBtns() {
  allPopups.forEach((popup) => {
    popup
      .querySelector(".popup__close-button")
      .addEventListener("click", (evt) =>
        closePopup(evt.target.closest(".popup"))
      );
  });
}
handleAllPopupsCloseBtns();

const formProfileEdit = popupEditProfile.querySelector(".popup__form");

const nameInput = formProfileEdit.querySelector(".popup__input_field_name");
const jobInput = formProfileEdit.querySelector(".popup__input_field_desc");

function handleSubmitEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formProfileEdit.addEventListener("submit", handleSubmitEditForm);

const formAddElement = popupAddCard.querySelector(".popup__form");

const nameCardInput = formAddElement.querySelector(".popup__input_place_name");
const linkCardInput = formAddElement.querySelector(".popup__input_place_link");

function handleSubmitAddForm(evt) {
  evt.preventDefault();

  const card = {};
  card.name = nameCardInput.value;
  card.link = linkCardInput.value;
  const elementNode = createCardElement(card);
  elementsSection.prepend(elementNode);
  closePopup(popupAddCard);
  //nameCardInput.value = "";
  //linkCardInput.value = "";
  formAddElement.reset();
}

formAddElement.addEventListener("submit", handleSubmitAddForm);

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;

  openPopup(popupEditProfile);
}
function openAddPopup() {
  openPopup(popupAddCard);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);

function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}
function toggleLikeCard(evt) {
  evt.target.classList.toggle("elements__element-heart_active");
}
function openCardPopup(card) {
  //const card = evt.target.closest(".elements__element");
  const cardLink = card
    .querySelector(".elements__element-image")
    .getAttribute("src");
  const cardName = card.querySelector(".elements__element-name").textContent;
  cardPopup.querySelector(".popup-figure__image").setAttribute("src", cardLink);
  cardPopup
    .querySelector(".popup-figure__image")
    .setAttribute("alt", `Фото ${cardName}`);
  cardPopup.querySelector(".popup-figure__caption").textContent = cardName;
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
  elementImage.addEventListener("click", () => openCardPopup(elementNode));
  elementNode
    .querySelector(".elements__element-heart")
    .addEventListener("click", toggleLikeCard);
  elementNode.querySelector(".elements__element-name").textContent = card.name;
  return elementNode;
}

function addCards(cardArray) {
  cardArray.forEach((card) => {
    const elementNode = createCardElement(card);
    elementsSection.append(elementNode);
  });
}
addCards(initialCards);
