import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddCard}) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  return(
    <PopupWithForm title="Новое место" name="addCard" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <>
        <input type="text" name="name" id="title-input" className="popup__input popup__input_content_place"
        ref={nameRef}
        placeholder="Название" minLength="2" maxLength="30" required />
        <span className="title-input-error popup__error"></span>
        <input type="url" name="link" id="url-input-addCard" className="popup__input popup__input_content_link"
        ref={linkRef}
        placeholder="Ссылка на картинку" required />
        <span className="url-input-addCard-error popup__error"></span>
        <button type="button"  className="popup__close-button" onClick={onClose}></button>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
