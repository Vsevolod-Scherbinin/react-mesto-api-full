function ImagePopup({card, isOpen, onClose}) {
  return(
    <div className={`popup popup_type_image ${isOpen && "popup_open"}`}>
      <div className="popup__container popup__container_type_image">
        <img className="popup__image" alt={card.name} style={{ backgroundImage: `url(${card.link})` }} />
        <h2 className="popup__image-name">{card.name}</h2>
        <button type="button"  className="popup__close-button" onClick={onClose}></button>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}

export default ImagePopup;
