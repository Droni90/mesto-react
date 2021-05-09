import editButton from "../images/EditButton.svg";
import plus from "../images/plus.svg";
import {useEffect, useState} from "react";
import api from '../utils/Api'
import Card from "./Card";

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getUserInfo().then(({avatar, about, name}) => {
      setUserAvatar(avatar)
      setUserDescription(about)
      setUserName(name)
    })
    api.getInitialCards().then((data) => {
      setCards(data)
    })
  })

  return(
    <main className="main">
      <section className="profile container">
        <button onClick={onEditAvatar} type="button" className="profile__edit-avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <div className="profile__avatar-overlay" />
        </button>
        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={onEditProfile} className="profile__edit-button">
              <img src={editButton} alt="редкатировать"
                   className="profile__edit-button-icon" />
            </button>
          </div>
          <p className="profile__status">{userDescription}</p>
        </div>
        <button onClick={onAddPlace} className="profile__add-button">
          <img src={plus} alt="добавить" className="profile__add-button-icon" />
        </button>

      </section>
      <section className="cards container">
        {cards.map(({link, name, likes}, idx) => (
          <Card link={link} name={name} likes={likes} onCardClick={onCardClick} key={`${name}_${idx}`} />
        ))}
      </section>
    </main>
  )
}
export default Main
