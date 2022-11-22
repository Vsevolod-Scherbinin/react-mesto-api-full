import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__avatarContainer">
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
            <button type="button" className="profile__avatarEditButton" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit" onClick={onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map((cardItem) => (
            <Card key={cardItem._id} card={cardItem} showImage={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
