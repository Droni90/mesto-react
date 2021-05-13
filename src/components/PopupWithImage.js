import close from "../images/Close.svg";

const PopupWithImage = ({card, onClose, hidePopupByClickAround}) => {
  return(
    <div className={card.isOpened ? `popup popup_type_photo popup_status_opened` : `popup popup_type_photo`} onMouseDown={hidePopupByClickAround}>
      <div className="popup__photo-container">
        <img src={card.link} alt={card.name} className="popup__img" />
        <button onClick={onClose} type="button" id="close-photo" className="popup__close">
          <img className="popup__close-icon" src={close} alt="закрыть" />
        </button>
        <h2 className="popup__photo-text">{card.name}</h2>
      </div>
    </div>
  )
}

export default PopupWithImage;
