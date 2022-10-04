const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function openPopup() {
   popup.classList.add('popup_opened');
}

editButton.addEventListener('click',openPopup);
