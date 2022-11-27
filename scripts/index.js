import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import { initialCards, valObj, cardListSection } from "./constants.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const formProfileEdit = popupEditProfile.querySelector(".popup__form");
const popupAddCard = document.querySelector(".popup_form_add-place");
const formAddElement = popupAddCard.querySelector(".popup__form");
const cardPopup = new PopupWithImage(".popup_type_card");
cardPopup.setEventListeners();
const user = new UserInfo(".profile__person", ".profile__person-description");
console.log(user.getUserInfo());
const validatorFormAddCard = new FormValidator(valObj, formAddElement);
const validatorFormEditProfile = new FormValidator(valObj, formProfileEdit);

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  user.setUserInfo(popupFormEditProfile._getInputValues());
  popupFormEditProfile.close();
};

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  console.log("Обработка формы добавления карточки");
  const cardItem = popupFormAddCard._getInputValues();
  const card = new Card(
    cardItem,
    "#element-template",
    cardPopup.open.bind(cardPopup)
  );
  const cardElement = card.generateCard();
  cardList.addFirstItem(cardElement);
  popupFormAddCard.close();
};

function openEditPopup() {
  popupFormEditProfile.setInputValues(user.getUserInfo());
  validatorFormEditProfile.clearErrors();
  //Открываем попап
  popupFormEditProfile.open();
}

function openAddPopup() {
  validatorFormAddCard.clearErrors();
  popupFormAddCard.open();
}

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

const popupFormAddCard = new PopupWithForm(
  ".popup_form_add-place",
  handleSubmitAddForm
);
popupFormAddCard.setEventListeners();
const popupFormEditProfile = new PopupWithForm(
  ".popup_form_edit-profile",
  handleSubmitEditForm
);
popupFormEditProfile.setEventListeners();
