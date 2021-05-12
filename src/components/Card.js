import CurrentUserContext from "../contexts/CurrentUserContext";
import {useContext} from "react";

const Card = ({name, likes, link, onCardClick, owner}) => {
  const currentUserId = useContext(CurrentUserContext)._id

  const handleClick = () => {
    onCardClick({name, link})
  }
  //Проверка на свою карточку и лайк
  const isOwn = owner._id === currentUserId;
  const isLiked = likes.some(i => i._id === currentUserId);

  return(
    <article className="cards__item">
      <img onClick={handleClick} src={link} alt={name} className="cards__img" />
      <button type="button" className={`cards__delete ${isOwn ? 'cards__delete_on' : ''}`} />
      <div className="cards__info">
        <h2 className="cards__text">{name}</h2>
        <div className="cards__like-box">
          <button className={`cards__like ${isLiked ? 'cards__like_status_active' : ''}`} />
          <span className="cards__likes-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  )
}
export default Card
