import close from "../images/Close.svg";

const PopupConfirm = () => {
  return(
    <div className="popup popup_type_confirm">
      <form
        id="form-remove"
        className="popup__container popup__container_size_mini"
      >
        <button
          type="button"
          id="close-remove"
          className="popup__close"
        >
          <img
            className="popup__close-icon"
            src={close}
            alt="закрыть"
          />
        </button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button type="submit" className="popup__submit popup__submit_edit">Да</button>
      </form>
    </div>
  )
}

export default PopupConfirm
