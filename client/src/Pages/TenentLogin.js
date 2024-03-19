import React from 'react'
import LoginComponent from '../Components/loginSign/loginComponent';
const TenantLogin = () => {
  return (
    <div>
    <LoginComponent apiUrl="http://localhost:5000/tenent/login" userRole="Tenent" />
    </div>
  )
}
export default TenantLogin;