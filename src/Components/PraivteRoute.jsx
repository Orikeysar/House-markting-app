import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from "../Components/Spinner";
function PraivteRoute() {
    const {logedIn,loading} = useAuthStatus()
    if(loading){
        return <Spinner/>
    }
  return (
    logedIn ? <Outlet/>: <Navigate to='/sign-in'/>
  )
}

export default PraivteRoute
