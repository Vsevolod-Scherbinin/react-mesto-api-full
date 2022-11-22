import React from 'react';
import AuthForm from './AuthForm';

const initState = {
  password: '',
  email: ''
}

function Login ({onLogin}) {
  const [state, setState] = React.useState(initState);

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

    if(!email || !password) return;
    onLogin(email, password)
      // .then(() => {
      //   // setState(initState);
      // })
      .catch((err) => {
        console.log(err);

        setState((old) => ({
          ...old,
          message: 'Что-то пошло не так'
        }));
      });
  }

  return(
    <AuthForm title="Вход" name="login" buttonText="Войти" onSubmit={handleSubmit}>
      <>
        <input type="email" name="email" id="email-input" className="authForm__input authForm__input_content_email"
          value={state.email} onChange={handleChange}
          placeholder="Email" minLength="2" maxLength="30" required />
        <span className="email-input-error authForm__error"></span>
        <input type="password" name="password" id="password-input" className="authForm__input authForm__input_content_password"
          value={state.password} onChange={handleChange}
          placeholder="Пароль" required />
        <span className="password-input-error authForm__error"></span>
      </>
    </AuthForm>
  )
}

export default Login;
