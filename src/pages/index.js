import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithButton from "../components/PopupWithButton.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  //initialCards,
  valObj,
  cardListSection,
  token,
  cohortNumber,
} from "../utils/constants.js";
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar-button");
const formProfileEdit = document.forms["editProfileInfoForm"];
const formAddElement = document.forms["addNewPlace"];
const formProfileAvatarEdit = document.forms["editAvatar"];
const cardPopup = new PopupWithImage(".popup_type_card");
cardPopup.setEventListeners();

const user = new UserInfo(".profile__person", ".profile__person-description");
const validatorFormAddCard = new FormValidator(valObj, formAddElement);
const validatorFormEditProfile = new FormValidator(valObj, formProfileEdit);
const validatorFormEditAvatar = new FormValidator(
  valObj,
  formProfileAvatarEdit
);

const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  //user.setUserInfo(popupFormEditProfile.getInputValues());
  client
    .updateProfileInfo(popupFormEditProfile.getInputValues())
    .then((result) => {
      user.setUserInfo(result);
    });
  popupFormEditProfile.close();
};

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  const cardItem = popupFormAddCard.getInputValues();
  client.addNewCard(cardItem).then((result) => {
    cardList.addFirstItem(result);
  });
  popupFormAddCard.close();
};

const handleSubmitEditAvatarForm = (evt) => {
  evt.preventDefault();
  client
    .editProfileAvatar(popupFormEditAvatar.getInputValues())
    .then((result) => {
      user.setUserInfo(result);
    });
  popupFormEditAvatar.close();
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

function openEditAvatarPopup() {
  validatorFormEditAvatar.resetValidation();
  popupFormEditAvatar.open();
}

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#element-template",
    cardPopup.open.bind(cardPopup),
    cardDeletePopup.open.bind(cardDeletePopup),
    handleCardLikeClick
  );
  return card.generateCard(user.getUserId());
};

validatorFormAddCard.enableValidation();
validatorFormEditProfile.enableValidation();
validatorFormEditAvatar.enableValidation();
buttonEditProfile.addEventListener("click", openEditPopup);
buttonAddCard.addEventListener("click", openAddPopup);
buttonEditAvatar.addEventListener("click", openEditAvatarPopup);

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
const popupFormEditAvatar = new PopupWithForm(
  ".popup_form_edit-profile-avatar",
  handleSubmitEditAvatarForm
);
popupFormEditAvatar.setEventListeners();

const initialCardsFromServer = [];
const cardList = new Section(
  {
    items: initialCardsFromServer,
    renderer: createCard,
  },
  cardListSection
);

const client = new Api(token, cohortNumber);
client.getCardsFromServer().then((result) => {
  initialCardsFromServer.push(...result);
  cardList.renderItems();
});
client.getUserFromServer().then((result) => {
  user.setUserInfo(result);
});

const handleButtonDeleteClick = (card) => {
  client.deleteMyCard(card.getCardId()).then((result) => {
    card._deleteCard();
    cardDeletePopup.close();
  });
};

const cardDeletePopup = new PopupWithButton(
  ".popup_type_delete-card",
  handleButtonDeleteClick
);
cardDeletePopup.setEventListeners();

const handleCardLikeClick = (card) => {
  if (card.isLikedByMe(user.getUserId())) {
    client.deleteLikeCard(card.getCardId()).then((result) => {
      card.updateLike(result.likes);
    });
  } else {
    client.putLikeCard(card.getCardId()).then((result) => {
      card.updateLike(result.likes);
    });
  }
};

// client
//   .addNewCard(initialCards[Math.floor(Math.random() * initialCards.length)])
//   .then((result) => {
//     console.log(result);
//   });
