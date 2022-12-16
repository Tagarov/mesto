import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//import { initialCards, valObj, cardListSection } from "../utils/constants.js";
import { initialCards, valObj, cardListSection } from "../utils/constants.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
//const popupEditProfile = document.querySelector(".popup_form_edit-profile");
const formProfileEdit = document.forms["editProfileInfoForm"];
//const popupAddCard = document.querySelector(".popup_form_add-place");
const formAddElement = document.forms["addNewPlace"];
const cardPopup = new PopupWithImage(".popup_type_card");
cardPopup.setEventListeners();
const user = new UserInfo(".profile__person", ".profile__person-description");
const validatorFormAddCard = new FormValidator(valObj, formAddElement);
const validatorFormEditProfile = new FormValidator(valObj, formProfileEdit);

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  user.setUserInfo(popupFormEditProfile.getInputValues());
  popupFormEditProfile.close();
};

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  const cardItem = popupFormAddCard.getInputValues();
  cardList.addFirstItem(cardItem);
  popupFormAddCard.close();
};

function openEditPopup() {
  popupFormEditProfile.setInputValues(user.getUserInfo());
  validatorFormEditProfile.resetValidation();
  //Открываем попап
  popupFormEditProfile.open();
}

function openAddPopup() {
  validatorFormAddCard.resetValidation();
  popupFormAddCard.open();
}

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#element-template",
    cardPopup.open.bind(cardPopup)
  );
  return card.generateCard();
};



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

const getUserFromServer = () => {
  console.log(user.getUserInfo());
  fetch("https://nomoreparties.co/v1/cohort-54/users/me ", {
    method: "GET",
    headers: {
      authorization: "55cf33fe-b700-4b09-9625-cce358d02d0f",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      user.setUserInfo(result);
      console.log(user.getUserInfo());
    });
};

//setTimeout(getUserFromServer, 5000);
getUserFromServer();

let initialCardsFromServer = [];
let cardList = new Section(
  {
    items: initialCardsFromServer,
    renderer: createCard,
  },
  cardListSection
);
cardList.renderItems();   




console.log(initialCardsFromServer);

const getCardsFromServer = () => {
  fetch("https://mesto.nomoreparties.co/v1/cohort-54/cards", {
    headers: {
      authorization: "55cf33fe-b700-4b09-9625-cce358d02d0f",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      result.forEach(item => cardList.addFirstItem(item));
    });
};

initialCardsFromServer = getCardsFromServer();
console.log("vfccndlfks");
console.log(initialCardsFromServer);

