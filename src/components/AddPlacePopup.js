import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, hidePopupByClickAround, waiting}) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const onChangeName = (evt) => {
    setName(evt.target.value)
  }
  const onChangeLink = (evt) => {
    setLink(evt.target.value)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onAddPlace({
      name: name,
      url: name,
      link: link,
    })
    setName('')
    setLink('')
  }
  return(
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={isOpen}
      container='popup__container'
      waiting={waiting}
      hidePopupByClickAround={hidePopupByClickAround}
      onClose={onClose}
      handleSubmit={handleSubmit}>
      <input
        onChange={onChangeName}
        name="name"
        value={name}
        type="text"
        id="popup__name-add"
        className="popup__input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__name-add-error" />
      <input
        onChange={onChangeLink}
        name="link"
        value={link}
        type="url"
        id="popup__link-add"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__link-add-error" />
    </PopupWithForm>
  )
}
export default AddPlacePopup
