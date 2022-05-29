/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import UnprotectedRoute from './UnprotectedRoute'
import Register from './Register'
import Login from './Login'
import App from './App'
import auth from '../utils/auth'

function Routes() {
  const history = useHistory()

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const [email, setEmail] = useState(null)
  function handleSignIn() {
    setLoggedIn(true)
    tokenCheck()
  }
  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setEmail(null)
    history.push('/sign-in')
  }
  function tokenCheck() {
    const token = localStorage.getItem('jwt')
    if (!token) return
    auth
      .usersMe(token)
      .then((data) => {
        setEmail(data.email)
      })
      .catch((res) => {
        handleSignOut()
      })
  }
  useEffect(() => {
    tokenCheck()
  }, [])
  return (
    <Switch>
      <UnprotectedRoute path="/sign-up" component={Register} />
      <UnprotectedRoute
        path="/sign-in"
        component={Login}
        onSignIn={handleSignIn}
      />
      <ProtectedRoute
        exact
        path="/"
        loggedIn={loggedIn}
        onSignOut={handleSignOut}
        email={email}
        component={App}
      />
    </Switch>
  )
}

export default Routes
