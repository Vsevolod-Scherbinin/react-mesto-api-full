function PopupWithForm({title, name, buttonText, isOpen, onClose, onSubmit, children}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && "popup_open"}`}>
    <form className={`popup__container popup__container_type_form popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit} >
      <h2 className={`popup__header`}>{title}</h2>
      {children};
      <button type="submit" className={`popup__button popup__button_type_${name}`}>{buttonText}</button>
    </form>
    <div className="popup__overlay" onClick={onClose}></div>
  </div>
  )
}

export default PopupWithForm;
