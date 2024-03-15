import React from 'react'
import LoginComponent from '../Components/loginSign/loginComponent';
const SuperAdminLogin = () => {
  return (
    <div>
    <LoginComponent apiUrl="http://localhost:5000/superadmin/login" userRole="SuperAdmin" />
    </div>
  )
}
export default SuperAdminLogin;