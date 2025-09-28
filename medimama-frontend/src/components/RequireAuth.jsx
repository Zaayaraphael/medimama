import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)

  // Prefer real user state from store. Fallback to localStorage for compatibility.
  const isAuth = !!user || localStorage.getItem('isAuthenticated') === 'true'

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
