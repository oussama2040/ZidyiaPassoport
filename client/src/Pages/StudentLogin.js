import React from 'react'
import LoginComponent from '../Components/loginSign/loginComponent';
const Login = () => {
  return (
    <div>
    <LoginComponent apiUrl="http://localhost:5000/student/login" userRole="student" />
    </div>
  )
}
export default Login;
