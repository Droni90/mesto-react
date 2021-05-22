import close from "../images/Close.svg";

const PopupWithForm = ({ name, title, isOpen, container, onClose, children, handleSubmit, hidePopupByClickAround, waiting }) => {
  return(
    <div
      onMouseDown={hidePopupByClickAround}
      className={isOpen ? `popup popup_type_${name} popup_status_opened` : `popup popup_type_${name}`}
    >
      <form
        onSubmit={handleSubmit}
        name={name}
        className={container}
        noValidate
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        >
          <img className="popup__close-icon" src={close} alt="закрыть" />
        </button>
        <h2 className="popup__title">{title}</h2>
        { children }
        <button
          type="submit" className="popup__submit popup__submit_edit">{ waiting }</button>
      </form>
    </div>
  )
}
export default PopupWithForm
