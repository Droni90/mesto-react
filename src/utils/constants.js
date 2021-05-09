export const selectorsObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_status_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const elementsUserInfo = {
  name: document.querySelector('.profile__name'),
  about: document.querySelector('.profile__status'),
  avatar: document.querySelector('.profile__edit-avatar')
}
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const editProfile = document.querySelector('.profile__edit-button');
export const editName = document.querySelector('#popup__name');
export const editAbout = document.querySelector('#popup__about');

// Попап добавления картинок
export const cardsTemplate = document.querySelector('#cards-template').content;
export const popupAddCard = document.querySelector('.popup_type_add');
export const buttonAddPicture = document.querySelector('.profile__add-button');
export const cardsItem = document.querySelector('.cards');
export const popupContainers = document.querySelectorAll('.popup__container')
export const popupSubmitAddButton = document.querySelector('.popup__submit_add')
export const popupPhoto = document.querySelector('.popup_type_photo')
export const formEditProfile = document.querySelector('#form-edit')
export const formAddProfile = document.querySelector('#form-add')
export const formEditAvatar = document.querySelector('#form-refresh')
export const popupTypeConfirm = document.querySelector('.popup_type_confirm')
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar')
export const popupEditAvatar = document.querySelector('.popup_type_refresh')
export const popupSubmitEdit = document.querySelector('.popup__submit_edit')
export const popupImg = document.querySelector('.popup__img')
export const popupPhotoText = document.querySelector('.popup__photo-text')
