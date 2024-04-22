import React from 'react'
import { AuthProvider } from './context/AuthProvider';
import Login from './Login.jsx';





function Login2() {
  return (
 
    <AuthProvider>
      <Login />
    </AuthProvider>
   

    
  )
}

export default Login2