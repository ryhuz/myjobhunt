import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { successfulLogin, successfulLogout, checkLogin } from '../../app/loginSlice'


function HomeContent() {
    let loginstate = useSelector(checkLogin)
    let dispatch = useDispatch()

    return (
        <div id="home">
            This is the home page
            <div>{loginstate.login ? "Logged In" : "Logged Out"}</div>
            <div className="btn" onClick={()=>dispatch(successfulLogin("testestsetse"))}>Log In</div>
            <div className="btn" onClick={()=>dispatch(successfulLogout())}>Log Out</div>
        </div>
    )
}

export default HomeContent
