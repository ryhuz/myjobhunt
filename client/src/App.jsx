import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom';
import { checkLogin } from './app/loginSlice'
import NavbarHolder from './components/NavBar/NavbarHolder';
import Home from './components/Home/Home';
import Dashboard from './components/dashboard/Dashboard';
import jwt_decode from "jwt-decode";
import { successfulLogin } from './app/loginSlice'
import { axiosBase } from './https_requests/requests'

function App() {
  const loginState = useSelector(checkLogin)
  const dispatch = useDispatch();


  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  function modalSetting(modal, turnOn) {
    if (modal === 'login') {
      setLogin(turnOn);
    } else {
      setRegister(turnOn);
    }
  }

  useEffect(() => {
    let enToken = localStorage.getItem('mjh_user_token');
    if (enToken) {
      let check = axiosBase.get('verify_token', {
        headers: {
          token: enToken,
        }
      })
      console.log(check)
      dispatch(successfulLogin(enToken))
    }
  }, [])

  console.log(loginState)
  return (
    <BrowserRouter>
      <NavbarHolder modalSetting={modalSetting} />
      <Route exact path="/">
        <Home login={login} register={register} setDisplay={modalSetting} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </BrowserRouter>
  )
}

export default App
