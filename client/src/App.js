import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { successfulLogin, successfulLogout, checkLogin } from './app/loginSlice'
import Dashboard from "./dashboard/Dashboard";

function App() {
  // const [state, setstate] = useState(initialState)
  const loginState = useSelector(checkLogin)
  const dispatch = useDispatch();
  
  
  console.log(loginState)
  return (
    <>
      <Dashboard />
      <button onClick={() => dispatch(successfulLogin({name:'Shawn', id:'some hash'}))}>Log In</button>
      <button onClick={() => dispatch(successfulLogout())}>Log Out</button>
    </>
  )
}

export default App
