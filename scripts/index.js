const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(
  ".popup__close-button_form_edit-profile"
);
const addButton = document.querySelector(".profile__add-button");
const closeButtonAddForm = document.querySelector(
  ".popup__close-button_form_add-place"
);
const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const popupAddCard = document.querySelector(".popup_form_add-place");
const profileName = document.querySelector(".profile__person");
const profileDesc = document.querySelector(".profile__person-description");
const elementsSection = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;
const cardPopup = document.querySelector("#popupCard");


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


let formElement = popupEditProfile.querySelector(".popup__form"); 

let nameInput = formElement.querySelector(".popup__input_field_name"); 
let jobInput = formElement.querySelector(".popup__input_field_desc"); 

function formSubmitHandler(evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(evt);
}

formElement.addEventListener("submit", formSubmitHandler);


let formAddElement = popupAddCard.querySelector(".popup__form"); 

let nameCardInput = formAddElement.querySelector(".popup__input_place_name"); 
let linkCardInput = formAddElement.querySelector(".popup__input_place_link"); 

function formAddSubmitHandler(evt) {
  evt.preventDefault(); 

  const card = {};
  card.name = nameCardInput.value;
  card.link = linkCardInput.value;
  const elementNode = createCardElement(card);
  elementsSection.prepend(elementNode);
  closePopup(evt);
  nameCardInput.value = "";
  linkCardInput.value = "";
}


formAddElement.addEventListener("submit", formAddSubmitHandler);

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

function closePopup(evt) {
  const targetPopup = evt.target.closest(".popup");
  targetPopup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
closeButton.addEventListener("click", closePopup);
closeButtonAddForm.addEventListener("click", closePopup);
addButton.addEventListener("click", openAddPopup);
cardPopup.querySelector(".popup__close-button").addEventListener("click", closePopup);

function createCardElement(card) {
  const elementNode = elementTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  elementNode
    .querySelector(".elements__element-image")
    .setAttribute("src", card.link);
  elementNode
    .querySelector(".elements__element-image")
    .setAttribute("alt", `Фото ${card.name}`);
  elementNode
    .querySelector(".elements__element-delete-button")
    .addEventListener("click", deleteCard);
  elementNode
    .querySelector(".elements__element-image")
    .addEventListener("click", openCardPopup);
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

function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}
function toggleLikeCard(evt) {
  evt.target.classList.toggle("elements__element-heart_active");
}
function openCardPopup(evt) {
  const card = evt.target.closest(".elements__element");
  const cardLink = card.querySelector(".elements__element-image").getAttribute("src");
  const cardName = card.querySelector(".elements__element-name").textContent;
  cardPopup.querySelector(".popup-figure__image").setAttribute("src", cardLink);
  cardPopup.querySelector(".popup-figure__image").setAttribute("alt", `Фото ${cardName}`);
  cardPopup.querySelector(".popup-figure__caption").textContent = cardName;
  openPopup(cardPopup);
}
