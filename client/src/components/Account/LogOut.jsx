import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux'
import { successfulLogout, checkLogin } from '../../app/loginSlice'
import { logoutUser } from '../../app/userDetailSlice'

function LogOut() {
    const loginState = useSelector(checkLogin);
    const dispatch = useDispatch();
    localStorage.removeItem('mjh_user_token');

    if (!loginState.login) {
        return <Redirect to="/" />
    }
    setTimeout(() => {
        dispatch(logoutUser())
        dispatch(successfulLogout());
    }, 1700);

    return (
        <div>
            {!loginState.login ?
                <>Log Out Successful, redirecting you to home page</> :
                <>Logging you out</>
            }
        </div>
    )
}

export default LogOut
