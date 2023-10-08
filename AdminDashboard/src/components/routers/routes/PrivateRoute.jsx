import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../hooks/useAuthStore'



const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore()

    return (
        isAuthenticated ? (
            children
        ) : (
            <Navigate to="/sign-in" />
        )
    )
}

export default PrivateRoute
