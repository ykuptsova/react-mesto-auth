import React from 'react'
import { Route } from 'react-router-dom'

const UnprotectedRoute = ({ component: Component, path, ...props }) => {
  return (
    <Route path={path}>
      <Component {...props} />
    </Route>
  )
}

export default UnprotectedRoute
