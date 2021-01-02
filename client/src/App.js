import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom';
import LogIn from './Account/LogIn';
import Register from './Account/Register';
import { checkLogin } from './app/loginSlice'
import Dashboard from "./dashboard/Dashboard";
import NavbarHolder from './NavBar/NavbarHolder';

function App() {
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  function modalSetting(modal, turnOn) {
    if (modal === 'login') {
      setLogin(turnOn);
    } else {
      setRegister(turnOn);
    }
  }

  const loginState = useSelector(checkLogin)
  const dispatch = useDispatch();

  console.log(loginState)
  return (
    <BrowserRouter>
      <NavbarHolder modalSetting={modalSetting} />
      <Route path="/">
        <Dashboard />
      </Route>
      <LogIn display={login} setDisplay={modalSetting} />
      <Register display={register} setDisplay={modalSetting} />
    </BrowserRouter>
  )
}

export default App
