import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { checkLogin } from '../app/loginSlice'

function PrivateRoute({ component: Component, ...rest }) {
    const loginState = useSelector(checkLogin)
    return (
        <Route {...rest} render={props => (
            loginState.login ?
                <Component {...props}{...rest} /> :
                !loginState.refreshed &&
                < Redirect to='/' />
        )} />
    )
}

export default PrivateRoute
