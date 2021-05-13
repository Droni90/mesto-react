import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";
import PopupWithImage from "./components/PopupWithImage";
import api from "./utils/Api";
import CurrentUserContext from "./contexts/CurrentUserContext";
import EditProfilePopup from "./components/EditProfilePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";
import AddPlacePopup from "./components/AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState({
    isOpened: false,
  })

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
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
  // обработчик удаление карточки
  const handleCardDelete = (cardId) => {
    api.removeCard(cardId).then(() => {
      const newCards = cards.filter(card => card._id !== cardId)
      setCards(newCards)
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
  //обработчик информации о пользователе
  const handleUpdateUser = (userInfo) => {
    api.patchProfileInfo(userInfo).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
  }
  //обработчик обновления аватара
  const handleUpdateAvatar = (avatar) => {
    api.refreshAvatar(avatar).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
  }
  //обработчик сабмита добавление картинки
  const handleAddPlaceSubmit = newCard => {
    api.patchAddCard(newCard).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
  }
  // обработчик для открытия картинки
  const handleCardClick = ({link, name, isOpened}) => {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened,
    })
  }
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithImage
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
