const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.close-icon');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__person');
const profileDesc = document.querySelector('.profile__person-description');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input-name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input-desc');// Воспользуйтесь инструментом .querySelector()

nameInput.value = profileName.textContent;
jobInput.value = profileDesc.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.
   // О том, как это делать, расскажем позже.

   profileName.textContent = nameInput.value;
   profileDesc.textContent = jobInput.value;
   closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


function openPopup() {
   popup.classList.add('popup_opened');
}
function closePopup() {
   popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

