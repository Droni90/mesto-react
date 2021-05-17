import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({
    isOpened: false,
  })
  // обработчик для открытия картинки
  const handleCardClick = ({link, name, isOpened}) => {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened,
    })
  }
// Обработчики открытия/закрытия попапов
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

      <PopupWithForm
        name='add'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        container='popup__container'
        onClose={closeAllPopups}
      >
        <input
          name="name"
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
          name="link"
          type="url"
          id="popup__link-add"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__link-add-error" />
      </PopupWithForm>

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        container='popup__container'
        onClose={closeAllPopups}
      >
        <input
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

      <PopupWithForm
        name='refresh'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        container='popup__container popup__container_size_mini'
        onClose={closeAllPopups}
      >
        <input
          name="avatar"
          type="url"
          id="popup__link-refresh"
          className="popup__input popup__input_type_refresh"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__link-refresh-error" />
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
