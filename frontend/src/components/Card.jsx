import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, showImage, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner  === currentUser._id;

  const cardDeleteButtonClassName = (
    `elements__delete ${!isOwn && 'elements__delete_disabled'}`
  );

  const isLiked = card.likes.includes(currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_activated'}`
  );

  function handleClick() {
    showImage(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="elements__item">
      <div className="elements__image" onClick={handleClick} alt={card.name} style={{ backgroundImage: `url(${card.link})` }}></div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="elements__bottom">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like-area">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
