import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import InfoTooltip from './InfoTooltip'
import auth from '../utils/auth'

function Login(props) {
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
    auth
      .signin(email, password)
      .then((token) => {
        localStorage.setItem('jwt', token)
        props.onSignIn()
        history.push('/')
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
    setTooltipStatus(null)
  }

  function handleGoToSignUp() {
    history.push('/sign-up')
  }

  return (
    <div>
      <Header buttonLabel="Регистрация" onButtonClick={handleGoToSignUp} />

      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__form-field">
            <input
              className="login__input login__input_type_email"
              name="email"
              type="text"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={email || ''}
              onChange={handleEmailChange}
              required
            />
            <span className="login__input-error login__input-error_type_email"></span>
          </label>
          <label className="login__form-field">
            <input
              className="login__input login__input_type_password"
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              value={password || ''}
              onChange={handlePasswordChange}
              required
            />
            <span className="login__input-error login__input-error_type_password"></span>
          </label>
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
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

export default Login
