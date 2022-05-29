import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import Header from './Header'
import InfoTooltip from './InfoTooltip'
import auth from '../utils/auth'

function Register() {
  const history = useHistory()

  const [email, setEmail] = React.useState('')
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  const [tooltipStatus, setTooltipStatus] = React.useState(null)
  const [tooltipTitle, setTooltipTitle] = React.useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    return auth
      .signup(email, password)
      .then((res) => {
        setTooltipStatus('ok')
        setTooltipTitle('Вы успешно зарегистрировались!')
      })
      .catch((err) => {
        setTooltipStatus('nok')
        setTooltipTitle(
          err.error ||
            err.message ||
            'Что-то пошло не так! Попробуйте ещё раз.',
        )
        console.error(err)
      })
  }

  function handleInfoTooltipClose() {
    const ts = tooltipStatus
    setTooltipStatus(null)
    // redirect user to login page on successful registration
    if (ts === 'ok') {
      history.push('/sign-in')
    }
  }

  function handleGoToSignIn() {
    history.push('/sign-in')
  }

  return (
    <div>
      <Header buttonLabel="Вход" onButtonClick={handleGoToSignIn} />

      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__form-field">
            <input
              className="register__input register__input_type_email"
              name="email"
              type="text"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={email || ''}
              onChange={handleEmailChange}
              required
            />
            <span className="register__input-error register__input-error_type_email"></span>
          </label>
          <label className="register__form-field">
            <input
              className="register__input register__input_type_password"
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              value={password || ''}
              onChange={handlePasswordChange}
              required
            />
            <span className="register__input-error register__input-error_type_password"></span>
          </label>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="login__question">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="login__link">
            Войти
          </Link>
        </div>
      </div>

      <InfoTooltip
        title={tooltipTitle}
        status={tooltipStatus}
        visible={!!tooltipStatus}
        onClose={handleInfoTooltipClose}
      />
    </div>
  )
}

export default Register
