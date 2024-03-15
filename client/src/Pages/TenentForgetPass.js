import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/forgetPasswordComponent'
function TenentForgetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/tenent/resetpassverify" userRole= "tenent" />
    </div>
  )
}

export default TenentForgetPass