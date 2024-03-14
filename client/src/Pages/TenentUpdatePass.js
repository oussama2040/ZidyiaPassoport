import React from 'react'
import UpdatePasswordComponent from '../Components/loginSign/updatePassComponent'
function TenentUpdatePass() {
  return (
    <div>
      <UpdatePasswordComponent apiUrl="http://localhost:5000/Tenent/updatepassword"  userRole="tenent"  />
    </div>
  )
}

export default TenentUpdatePass