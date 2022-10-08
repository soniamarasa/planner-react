import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const auth = window.localStorage.getItem('auth')
  return auth ? children : <Navigate to='/auth' />
}

export default ProtectedRoute