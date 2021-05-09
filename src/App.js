import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import close from './images/Close.svg'
import PopupWithForm from "./components/PopupWithForm";
import {useState} from "react";
import PopupWithImage from "./components/PopupWithImage";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({
    isOpened: false,
  })

  const handleCardClick = ({link, name, isOpened}) => {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened,
    })
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ isOpened: false })
  }

  return (
    <div className='roof'>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

         <PopupWithForm name='add' title='Новое место' isOpen={isAddPlacePopupOpen} container='popup__container' onClose={closeAllPopups}>
            <input name="name" type="text" id="popup__name-add" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__name-add-error" />
            <input name="link" type="url" id="popup__link-add" className="popup__input" placeholder="Ссылка на картинку" required />
            <span className="popup__link-add-error" />
          </PopupWithForm>

          <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} container='popup__container' onClose={closeAllPopups}>
            <input name="name" type="text" id="popup__name" className="popup__input" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__name-error" />
            <input name="about" type="text" id="popup__about" className="popup__input" placeholder="Вид деятельности" required minLength="2" maxLength="200" />
            <span className="popup__about-error" />
          </PopupWithForm>

          <PopupWithForm name='refresh' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} container='popup__container popup__container_size_mini' onClose={closeAllPopups}>
              <input name="avatar" type="url" id="popup__link-refresh" className="popup__input popup__input_type_refresh" placeholder="Ссылка на аватар" required />
            <span className="popup__link-refresh-error" />
          </PopupWithForm>

          <PopupWithImage onClose={closeAllPopups} card={selectedCard} />

      <div className="popup popup_type_confirm">
        <form id="form-remove" className="popup__container popup__container_size_mini">
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


    </div>
  );
}

export default App;
