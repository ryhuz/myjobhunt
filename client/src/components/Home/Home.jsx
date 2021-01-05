import React from 'react'
import LogIn from '../Account/LogIn';
import Register from '../Account/Register';
import HomeContent from './HomeContent';

function Home({ login, register, setDisplay, modalSetting }) {
    function changeModal(thisModal, otherModal) {
        setDisplay(thisModal, false)
        setDisplay(otherModal, true)
    }
    return (
        <>
            <HomeContent />
            <LogIn display={login} setDisplay={setDisplay} changeModal={changeModal} />
            <Register display={register} setDisplay={setDisplay} changeModal={changeModal} />
        </>
    )
}

export default Home
