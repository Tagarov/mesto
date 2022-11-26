import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "./Section.js";
import { initialCards, valObj, cardListSection } from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const elementsSection = document.querySelector(".elements");
//const cardListSection = ".elements";
const allPopups = document.querySelectorAll(".popup");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__person");
const profileDesc = document.querySelector(".profile__person-description");
const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const formProfileEdit = popupEditProfile.querySelector(".popup__form");
const nameInput = formProfileEdit.querySelector(".popup__input_field_name");
const jobInput = formProfileEdit.querySelector(".popup__input_field_desc");
const popupAddCard = document.querySelector(".popup_form_add-place");
const formAddElement = popupAddCard.querySelector(".popup__form");
const nameCardInput = formAddElement.querySelector(".popup__input_place_name");
const linkCardInput = formAddElement.querySelector(".popup__input_place_link");
const buttonSubmitFormAdd = formAddElement.querySelector(".popup__button");
//const cardPopup = document.querySelector(".popup_type_card");
const cardPopup = new PopupWithImage(".popup_type_card");
cardPopup.setEventListeners();
// const elementImageCardPopup = cardPopup.querySelector(".popup-figure__image");
// const elementCaptionCardPopup = cardPopup.querySelector(
//   ".popup-figure__caption"
// );
const validatorFormAddCard = new FormValidator(valObj, formAddElement);
const validatorFormEditProfile = new FormValidator(valObj, formProfileEdit);

// const handleOpenCardPopup = (card) => {
//   elementImageCardPopup.setAttribute("src", card.link);
//   elementImageCardPopup.setAttribute("alt", `Фото ${card.name}`);
//   elementCaptionCardPopup.textContent = card.name;
//   openPopup(cardPopup);
// };

// function createCard(item, templateSelector) {
//   const card = new Card(item, templateSelector, cardPopup.open);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// function addCards(cardArray) {
//   cardArray.forEach((item) => {
//     // const card = new Card(item, "#element-template", handleOpenCardPopup);
//     // const cardElement = card.generateCard();
//     const cardElement = createCard(item, "#element-template");
//     elementsSection.append(cardElement);
//   });
// }

// const handleEscKeyToClosePopup = (evt) => {
//   if (evt.key === "Escape") {
//     const popupOpened = document.querySelector(".popup_opened");
//     closePopup(popupOpened);
//   }
// };

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", handleEscKeyToClosePopup);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handleEscKeyToClosePopup);
// }

// function handleAllPopupsCloseBtns() {
//   allPopups.forEach((popup) => {
//     // Закрытие попал на оверлей или кнопку закрытия
//     popup.addEventListener("click", (evt) => {
//       if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")) {
//         closePopup(popup);
//       }
//     });
//   });
// }

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// function handleSubmitAddForm(evt) {
//   evt.preventDefault();
//   const item = { name: nameCardInput.value, link: linkCardInput.value };
//   const cardElement = createCard(item, "#element-template");
//   elementsSection.prepend(cardElement);
//   closePopup(popupAddCard);
//   formAddElement.reset();
// }

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  const cardItem = { name: nameCardInput.value, link: linkCardInput.value };
  console.log(cardItem);
  const card = new Card(
    cardItem,
    "#element-template",
    cardPopup.open.bind(cardPopup)
  );
  const cardElement = card.generateCard();
  cardList.addFirstItem(cardElement);
  popupFormAdd.close();
  //formAddElement.reset()
  popupFormAdd.formReset();
};

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  //На случай закрытия попапа без сохранения, очищаем ошибки с инпутов
  validatorFormEditProfile.clearErrors();
  //Открываем попап
  openPopup(popupEditProfile);
}

function openAddPopup() {
  if (!nameCardInput.value || !linkCardInput.value) {
    validatorFormAddCard.disableButton();
  }
  //openPopup(popupAddCard);
  popupFormAdd.open();
}

//addCards(initialCards);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(
        cardItem,
        "#element-template",
        cardPopup.open.bind(cardPopup)
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

cardList.renderItems();

validatorFormAddCard.enableValidation();
validatorFormEditProfile.enableValidation();
buttonEditProfile.addEventListener("click", openEditPopup);
buttonAddCard.addEventListener("click", openAddPopup);
formProfileEdit.addEventListener("submit", handleSubmitEditForm);
formAddElement.addEventListener("submit", handleSubmitAddForm);
//handleAllPopupsCloseBtns();

const popupFormAdd = new PopupWithForm(
  ".popup_form_add-place",
  handleSubmitAddForm
);
popupFormAdd.setEventListeners();
//console.log(popupFormAdd);
