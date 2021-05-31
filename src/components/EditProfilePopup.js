import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, hidePopupByClickAround, waiting}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext)
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])
  const onChangeName = (evt) => {
    setName(evt.target.value)
  }
  const onChangeDescription = (evt) => {
    setDescription(evt.target.value)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }
  return(
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      container='popup__container'
      waiting={waiting}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      hidePopupByClickAround={hidePopupByClickAround}
    >
      <input
        onChange={onChangeName}
        value={name || ''}
        name="name"
        type="text"
        id="popup__name"
        className="popup__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__name-error" />
      <input
        onChange={onChangeDescription}
        value={description || ''}
        name="about"
        type="text"
        id="popup__about"
        className="popup__input"
        placeholder="Вид деятельности"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__about-error" />
    </PopupWithForm>
  )
}
export default EditProfilePopup
