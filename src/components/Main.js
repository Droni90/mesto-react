import editButton from "../images/EditButton.svg";
import plus from "../images/plus.svg";
import {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, getCardId }) => {
  const { name, avatar, about } = useContext(CurrentUserContext)

  return(
    <main className="main">
      <section className="profile container">
        <button
          onClick={onEditAvatar}
          type="button"
          className="profile__edit-avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        >
          <div className="profile__avatar-overlay" />
        </button>
        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 className="profile__name">{name}</h1>
            <button onClick={onEditProfile} className="profile__edit-button">
              <img src={editButton} alt="редкатировать"
                   className="profile__edit-button-icon" />
            </button>
          </div>
          <p className="profile__status">{about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__add-button">
          <img src={plus} alt="добавить" className="profile__add-button-icon" />
        </button>
      </section>
      <section className="cards container">
        {cards.map(({link, _id, name, likes, owner}) => (
          <Card
            link={link}
            cardId={_id}
            name={name}
            likes={likes}
            onCardClick={onCardClick}
            onLikeClick={onCardLike}
            onCardDelete={onCardDelete}
            owner={owner}
            getCardId={getCardId}
            key={_id} />
        ))}
      </section>
    </main>
  )
}
export default Main
