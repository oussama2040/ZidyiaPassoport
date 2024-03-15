import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/forgetPasswordComponent'
function ForgetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/student/resetpassverify" userRole="student" />
    </div>
  )
}

export default ForgetPass
