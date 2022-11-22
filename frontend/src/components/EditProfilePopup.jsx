import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionInput(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <PopupWithForm title="Редактировать профиль" name="edit" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <>
        <input type="text" name="name" id="name-input" className="popup__input popup__input_content_name"
        onChange={handleNameInput} value={name || ''}
        placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="name-input-error popup__error"></span>
        <input type="text" name="job" id="status-input" className="popup__input popup__input_content_job"
        onChange={handleDescriptionInput} value={description || ''}
        placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="status-input-error popup__error"></span>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
