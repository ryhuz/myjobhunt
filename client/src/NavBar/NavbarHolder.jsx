import React from 'react'
import { useSelector } from 'react-redux'
import NavBarLoggedIn from './NavBarLoggedIn'
import NavBarLoggedOut from './NavBarLoggedOut'
import { checkLogin } from '../app/loginSlice'

function NavbarHolder({ modalSetting }) {
    const loginState = useSelector(checkLogin)

    return (
        <>
            {loginState.login ? 
            <NavBarLoggedIn />:
            <NavBarLoggedOut modalSetting={modalSetting}/>}
        </>
    )
}

export default NavbarHolder
