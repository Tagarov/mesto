import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/cards.js";

const elementsSection = document.querySelector(".elements");
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

const valObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const enableFormValidation = () => {
  const formList = Array.from(document.querySelectorAll(valObj.formSelector));
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию создадим объект FormValidator,
    // передав ему элемент формы и обект с параметрами
    const formValidatorElement = new FormValidator(valObj, formElement);
    //активируем валиидацию
    formValidatorElement.enableValidation();
  });
};

function addCards(cardArray) {
  cardArray.forEach((item) => {
    const card = new Card(item, "#element-template");
    const cardElement = card.generateCard();
    elementsSection.append(cardElement);
  });
}

const handleEscKeyToClosePopup = (evt) => {
  if (evt.key === "Escape") {
    const openedpopup = Array.from(allPopups).find((popup) => {
      return popup.classList.contains("popup_opened");
    });
    if (openedpopup) {
      closePopup(openedpopup);
    }
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyToClosePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKeyToClosePopup);
}

function handleAllPopupsCloseBtns() {
  allPopups.forEach((popup) => {
    popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => closePopup(popup));
    // Закрытие попал на оверлей
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopup(popup);
      }
    });
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
  const item = {};
  item.name = nameCardInput.value;
  item.link = linkCardInput.value;
  const card = new Card(item, "#element-template");
  const cardElement = card.generateCard();
  elementsSection.prepend(cardElement);
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
  if (!nameCardInput.value || !linkCardInput.value) {
    // сделай кнопку неактивной
    buttonSubmitFormAdd.classList.add("popup__button_disabled");
    buttonSubmitFormAdd.setAttribute("disabled", "true");
  }
  openPopup(popupAddCard);
}

addCards(initialCards);
buttonEditProfile.addEventListener("click", openEditPopup);
buttonAddCard.addEventListener("click", openAddPopup);
formProfileEdit.addEventListener("submit", handleSubmitEditForm);
formAddElement.addEventListener("submit", handleSubmitAddForm);
enableFormValidation();
handleAllPopupsCloseBtns();
