import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/forgetPasswordComponent'
function SuperAdminForgetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/superadmin/resetpassverify" userRole="superadmin" />
    </div>
  )
}

export default SuperAdminForgetPass