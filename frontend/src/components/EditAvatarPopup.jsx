import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return(
    <PopupWithForm title="Обновить аватар" name="editAvatar" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <>
        <input type="url" name="link" id="url-input-editAvatar" className="popup__input popup__input_content_link"
          ref={avatarRef}
          placeholder="Ссылка на картинку" required />
        <span className="url-input-editAvatar-error popup__error"></span>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
