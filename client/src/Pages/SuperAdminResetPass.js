import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/resetPassComponent'
function SuperAdminResetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/superadmin/resetpass" userRole="superadmin"  />
    </div>
  )
}

export default SuperAdminResetPass