import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirm from "./PopupConfirm";

function App() {
  const [waiting, setWaiting] = useState(null) // Состояние названия кнопки во время ожидания
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [cardId, setCardId] = useState(null)           // Для получения ID карточки
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState({
    isOpened: false,
  })

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch(e => console.log(e))
  }, [])

  //Обработчик лайка
  const handleCardLike = (likes, cardId, currentUserId) => {
    const isLiked = likes.some(like => like._id === currentUserId);
    api.changeLikeCardStatus(cardId, isLiked).then((newCard) => {
      const newCards = cards.map((card) => card._id === cardId ? newCard : card);
      setCards(newCards);
    });
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
  const handleConfirmClick = () => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen)
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard({ isOpened: false })
  }

  //обработчик информации о пользователе
  const handleUpdateUser = (userInfo) => {
    api.patchProfileInfo(userInfo).then((data) => {
      setCurrentUser(data)
      setWaiting(null)
      closeAllPopups()
    })
    setWaiting('Сохранение...')
  }
  //обработчик обновления аватара
  const handleUpdateAvatar = (avatar) => {
    api.refreshAvatar(avatar).then((data) => {
      setCurrentUser(data)
      setWaiting(null)
      closeAllPopups()
    })
    setWaiting('Сохранение...')
  }

  // обработчик удаление карточки
  const handleCardDelete = () => {
    api.removeCard(cardId).then(() => {
      const newCards = cards.filter(card => card._id !== cardId)
      setWaiting(null)
      setCards(newCards)
      closeAllPopups()
    })
    setWaiting('Удаление...')
  }

  //обработчик сабмита добавление картинки
  const handleAddPlaceSubmit = newCard => {
    api.patchAddCard(newCard).then((newCard) => {
      setCards([newCard, ...cards])
      setWaiting(null)
      closeAllPopups()
    })
    setWaiting('Добавление...')
  }
  // обработчик для открытия картинки
  const handleCardClick = ({link, name, isOpened}) => {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened,
    })
  }
  //Закрытие попапа по клику вне формы
  const hidePopupByClickAround = (evt) => {
    if(evt.target.classList.contains('popup_status_opened')){
      closeAllPopups()
    }
  }
  //закрытие попапов по клику на Еск
  useEffect(() => {
    const handleEscClose = (evt) => {
      if(evt.key === 'Escape') closeAllPopups()
    }
    window.addEventListener('keyup', handleEscClose);
    return () => window.removeEventListener('keyup', handleEscClose);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='roof'>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleConfirmClick}
            cards={cards}
            onCardLike={handleCardLike}
            getCardId={setCardId}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          hidePopupByClickAround={hidePopupByClickAround}
          waiting={waiting || 'Сохранить'}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          hidePopupByClickAround={hidePopupByClickAround}
          waiting={waiting || 'Сохранить'}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          hidePopupByClickAround={hidePopupByClickAround}
          waiting={waiting || 'Добавить'}
        />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          hidePopupByClickAround={hidePopupByClickAround}
        />
        <PopupConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          hidePopupByClickAround={hidePopupByClickAround}
          onConfirm={handleCardDelete}
          waiting={ waiting || 'Да' }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
