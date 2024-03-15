import React from 'react'
import LoginComponent from '../Components/loginSign/loginComponent';
const TenantLogin = () => {
  return (
    <div>
    <LoginComponent apiUrl="http://localhost:5000/tenent/login" userRole="tenent" />
    </div>
  )
}
export default TenantLogin;