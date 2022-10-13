const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button_form_edit-profile');
const addButton = document.querySelector('.profile__add-button');
const closeButton2 = document.querySelector('.popup__close-button_form_add-place');
const popupEditProfile = document.querySelector('.popup_form_edit-profile');
const popupAddPicture = document.querySelector('.popup_form_add-place');
const profileName = document.querySelector('.profile__person');
const profileDesc = document.querySelector('.profile__person-description');
const elementsSection = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;


const initialCards = [
   {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ];

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_field_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_field_desc');// Воспользуйтесь инструментом .querySelector()



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.
   // О том, как это делать, расскажем позже.

   profileName.textContent = nameInput.value;
   profileDesc.textContent = jobInput.value;
   closePopup(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


function openEditPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDesc.textContent;
   
   openPopup(popupEditProfile);
   
}
function openAddPopup() {
   openPopup(popupAddPicture);   
}

function openPopup(popup){
   popup.classList.add('popup_opened');
}

function closePopup(evt) {
   const targetPopup = evt.target.closest('.popup');
   targetPopup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openEditPopup);
closeButton.addEventListener('click', closePopup);
closeButton2.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddPopup);

function addElementToElementsSection(card){
  const elementNode = elementTemplate.querySelector('.elements__element').cloneNode(true);
  elementNode.querySelector('.elements__element-image').setAttribute('src',card.link);
  elementNode.querySelector('.elements__element-image').setAttribute('alt',`Фото ${card.name}`);
  elementNode.querySelector('.elements__element-name').textContent = card.name;
  elementsSection.append(elementNode);
}

function addCards(cardArray){
  cardArray.forEach(card => addElementToElementsSection(card))
}
addCards(initialCards);