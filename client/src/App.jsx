import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom';
import { checkLogin } from './app/loginSlice'
import NavbarHolder from './components/NavBar/NavbarHolder';
import Home from './components/Home/Home';
import Dashboard from './components/dashboard/Dashboard';
import { successfulLogin, checkedLoginStatus } from './app/loginSlice'
import { axiosBase } from './https_requests/requests'
import jwtDecode from 'jwt-decode';
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
    async function checkToken(token) {
      try {
        await axiosBase.get('verify_token', {
          headers: {
            token: token,
          }
        })
        // console.log(check)
        let deToken = jwtDecode(token);
        dispatch(successfulLogin(deToken.data.ref));
      } catch (e) {
        // console.log(e.response)
        if (e.response.data.invalid === 'expired' || e.response.data.invalid === 'invalid') {
          localStorage.removeItem('mjh_user_token')
          dispatch(checkedLoginStatus());
          console.log(loginState)
        }
      }
    }

    let token = localStorage.getItem('mjh_user_token');
    if (token) {
      checkToken(token);
    }
  }, [])

  console.log(loginState)
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
