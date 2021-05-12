import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = useRef(null)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const avatar = avatarRef.current.value
    onUpdateAvatar({
      avatar,
    });
  }
  return(
    <PopupWithForm name='refresh' title='Обновить аватар' handleSubmit={handleSubmit} isOpen={isOpen} container='popup__container popup__container_size_mini' onClose={onClose} >
      <input ref={avatarRef} name="avatar" type="url" id="popup__link-refresh"  className="popup__input popup__input_type_refresh" placeholder="Ссылка на аватар" required />
      <span className="popup__link-refresh-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup
