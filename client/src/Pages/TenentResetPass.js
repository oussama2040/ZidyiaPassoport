import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/resetPassComponent'
function TenentResetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/Tenent/resetpass?token=${token}"  userRole="tenent"  />
    </div>
  )
}

export default TenentResetPass