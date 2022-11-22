import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';


function Register ({onRegister}) {

  const [state, setState] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const {email, password} = state;

    onRegister(email, password)
      .catch((err) => {
        console.log(err);

        setState((old) => ({
          ...old,
          message: 'Что-то пошло не так'
        }))
      })
  }

  return(
    <>
      <AuthForm title="Регистрация" name="register" buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <>
          <input type="email" name="email" id="email-input" className="authForm__input authForm__input_content_email"
            value={state.email} onChange={handleChange}
            placeholder="E-mail" minLength="2" maxLength="30" required />
          <span className="email-input-error authForm__error"></span>
          <input type="password" name="password" id="password-input" className="authForm__input authForm__input_content_password"
            value={state.password} onChange={handleChange}
            placeholder="Пароль" required />
          <span className="password-input-error authForm__error"></span>
        </>
      </AuthForm>
      <p className="registerQuestion">Уже зарегистрированы? <Link className="registerQuestion__link" to="/sign-in">Войти</Link></p>
    </>
  )
}

export default Register;
