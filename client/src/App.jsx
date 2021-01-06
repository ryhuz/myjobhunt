import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom';
import { axiosBase } from './https_requests/requests'
import jwtDecode from 'jwt-decode';

import { successfulLogin, checkedLoginStatus, checkLogin } from './app/loginSlice'
import { retrieveUser } from './app/userDetailSlice'

import NavbarHolder from './components/NavBar/NavbarHolder';
import Home from './components/Home/Home';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import LogOut from './components/Account/LogOut';

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
    console.log('app useeffect')
    async function checkToken(token) {
      try {
        let check = await axiosBase.get('verify_token', {
          headers: {
            token: token,
          }
        })
        let deToken = jwtDecode(token);
        dispatch(storeUser(check.data.user))
        dispatch(successfulLogin(deToken.data.ref));
      } catch (e) {
        // console.log(e.response)
        if (e.response.data.invalid === 'expired' || e.response.data.invalid === 'invalid') {
          localStorage.removeItem('mjh_user_token')
          dispatch(checkedLoginStatus());
        }
      }
    }

    let token = localStorage.getItem('mjh_user_token');
    if (token) {
      checkToken(token);
    }
  }, [])

  return (
    <BrowserRouter>
      <NavbarHolder modalSetting={modalSetting} />
      <Route exact path="/">
        <Home login={login} register={register} setDisplay={modalSetting} />
      </Route>

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/logout" component={LogOut} />
    </BrowserRouter>
  )
}

export default App
