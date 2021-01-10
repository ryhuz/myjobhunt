import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { checkToken, getUserJobData } from './components/Account/LoginFunctions'
import { successfulLogin, checkedLoginStatus } from './app/loginSlice'
import { storeUser } from './app/userDetailSlice'
import { storeHunts, storeJobApps } from './app/huntSlice';

import NavbarHolder from './components/NavBar/NavbarHolder';
import Home from './components/Home/Home';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import LogOut from './components/Account/LogOut';
import Hunt from './components/Hunts/Hunt';


function App() {
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

    let token = localStorage.getItem('mjh_user_token');
    if (token) {
      checkToken(token)
        .then(tokenVerify => {
          if (tokenVerify.success) {
            /* Update store with user details and token */
            dispatch(storeUser(tokenVerify.user));
            dispatch(successfulLogin(tokenVerify.token));

            /* Get user job data and update store */
            getUserJobData()
              .then(userJobsData => {
                dispatch(storeHunts(userJobsData.hunts));
                dispatch(storeJobApps(userJobsData.jobs));
              })
              .catch(e => {
                console.log(e);
              })
          } else {
            /* Token invalid */       // want to differenciate between invalid and expired?
            localStorage.removeItem('mjh_user_token')
            dispatch(checkedLoginStatus());
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [])
  return (
    <BrowserRouter>
      <NavbarHolder modalSetting={modalSetting} />
      <Route exact path="/">
        <Home login={login} register={register} setDisplay={modalSetting} />
      </Route>

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/hunt/:id" component={Hunt} />
      <PrivateRoute path="/logout" component={LogOut} />
    </BrowserRouter>
  )
}

export default App
