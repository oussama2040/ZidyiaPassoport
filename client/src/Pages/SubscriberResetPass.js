import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/resetPassComponent'
function SubscriberResetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/subscriber/resetpass?token=${token}"  userRole="subscriber"  />
    </div>
  )
}

export default SubscriberResetPass