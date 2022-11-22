function AuthForm({title, name, buttonText, onSubmit, children}) {
  return(
    <form className="authForm" name={name} onSubmit={onSubmit} >
      <h2 className="authForm__title">{title}</h2>
      {children}
      <button type="submit" className={`authForm__button authForm__button_type_${name}`}>{buttonText}</button>
    </form>
  )
}

export default AuthForm;
