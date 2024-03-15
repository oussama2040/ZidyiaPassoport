import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/resetPassComponent'
function SubscriberResetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/subscriber/resetpass"  userRole="subscriber"  />
    </div>
  )
}

export default SubscriberResetPass