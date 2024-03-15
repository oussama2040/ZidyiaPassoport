import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/resetPassComponent'
function StudentResetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/student/resetpass" userRole="student"  />
    </div>
  )
}

export default StudentResetPass