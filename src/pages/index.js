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

const user = new UserInfo(
  ".profile__person",
  ".profile__person-description",
  ".profile__avatar"
);
const validatorFormAddCard = new FormValidator(valObj, formAddElement);
const validatorFormEditProfile = new FormValidator(valObj, formProfileEdit);
const validatorFormEditAvatar = new FormValidator(
  valObj,
  formProfileAvatarEdit
);
const client = new Api(token, cohortNumber);
let currentCardId;
let userId;
const handleButtonDeleteClick = () => {
  cardDeletePopup.setButtonMessage("Удаление...");
  client
    .deleteMyCard(currentCardId.getCardId())
    .then(() => {
      currentCardId._deleteCard();
      cardDeletePopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      cardDeletePopup.setButtonMessage("Да");
    });
};

const cardDeletePopup = new PopupWithButton(
  ".popup_type_delete-card",
  handleButtonDeleteClick
);


const handleSubmitEditForm = (evt) => {
  evt.preventDefault();
  popupFormEditProfile.setButtonMessage("Cохранение...");
  client
    .updateProfileInfo(popupFormEditProfile.getInputValues())
    .then((result) => {
      user.setUserInfo(result);
      popupFormEditProfile.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormEditProfile.setButtonMessage("Cохранить");
    });
};

const handleSubmitAddForm = (evt) => {
  evt.preventDefault();
  popupFormAddCard.setButtonMessage("Cохранение...");
  const cardItem = popupFormAddCard.getInputValues();
  client
    .addNewCard(cardItem)
    .then((result) => {
      cardList.addFirstItem(result);
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormAddCard.setButtonMessage("Добавить");
    });
};

const handleSubmitEditAvatarForm = (evt) => {
  evt.preventDefault();
  popupFormEditAvatar.setButtonMessage("Cохранение...");
  client
    .editProfileAvatar(popupFormEditAvatar.getInputValues())
    .then((result) => {
      user.setUserInfo(result);
      popupFormEditAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupFormEditAvatar.setButtonMessage("Cохранить");
    });
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

const handleCardDelete = (card) => {
  currentCardId = card;
  cardDeletePopup.open.bind(cardDeletePopup)();
}

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#element-template",
    cardPopup.open.bind(cardPopup),
    handleCardDelete,
    handleCardLikeClick
  );
  return card.generateCard(userId);
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
const cardList = new Section(
  {
    renderer: createCard,
  },
  cardListSection
);

Promise.all([
  //в Promise.all передаем массив промисов которые нужно выполнить
  client.getUserFromServer(),
  client.getCardsFromServer(),
])
  .then((values) => {
    //попадаем сюда когда оба промиса будут выполнены
    // у нас есть все нужные данные, отрисовываем страницу
    user.setUserInfo(values[0]);
    userId = user.getUserId();
    cardList.renderItems(values[1]);
  })
  .catch((err) => {
    //попадаем сюда если один из промисов завершаться ошибкой
    console.log(err);
  });
  



cardDeletePopup.setEventListeners();

const handleCardLikeClick = (card) => {
  if (card.isLikedByMe(userId)) {
    client
      .deleteLikeCard(card.getCardId())
      .then((result) => {
        card.updateLike(result.likes);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    client
      .putLikeCard(card.getCardId())
      .then((result) => {
        card.updateLike(result.likes);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
};


// function addRandomCard () {
//   const cardItem = initialCards[Math.floor(Math.random()*initialCards.length)];
//   client
//     .addNewCard(cardItem)
//     .then((result) => {
//       cardList.addFirstItem(result);
//       popupFormAddCard.close();
//     })
//     .catch((err) => {
//       console.log(err); // выведем ошибку в консоль
//     })
//     .finally(() => {
//       popupFormAddCard.setButtonMessage("Добавить");
//     });
// }
// addRandomCard();