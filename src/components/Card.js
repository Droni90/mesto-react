
const Card = ({name, likes, link, onCardClick}) => {
  const handleClick = () => {
    onCardClick({name, link})
  }
  return(
    <article className="cards__item">
      <img onClick={handleClick} src={link} alt={name} className="cards__img" />
      <button type="button" className="cards__delete" />
      <div className="cards__info">
        <h2 className="cards__text">{name}</h2>
        <div className="cards__like-box">
          <button className="cards__like" />
          <span className="cards__likes-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  )
}
export default Card
