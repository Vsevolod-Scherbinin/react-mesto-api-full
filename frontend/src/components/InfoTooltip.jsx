import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip({success, isOpen, onClose, message}) {

  return(
    <div className={`popup ${isOpen && "popup_open"}`} >
      <div className="popup__container popup__container_type_registrationStatus">
        <img className="popup__icon" src={success ? successIcon : failIcon} alt="Успешная регистрация" />
        <h2 className="popup__header popup__header_type_registrationStatus">{message}</h2>
        <button type="button"  className="popup__close-button" onClick={onClose}></button>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  )
}

export default InfoTooltip;
