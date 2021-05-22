import PopupWithForm from "./PopupWithForm";

const PopupConfirm = ({isOpen, onClose, hidePopupByClickAround, waiting, onConfirm}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onConfirm('123')
  }
  return(
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      container='popup__container popup__container_size_mini'
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      hidePopupByClickAround={hidePopupByClickAround}
      waiting={waiting}
    />
  )
}

export default PopupConfirm
