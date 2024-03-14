import React from 'react'
import ForgetPasswordComponent from '../Components/loginSign/forgetPasswordComponent'
function SubscriberForgetPass() {
  return (
    <div>
      <ForgetPasswordComponent apiUrl="http://localhost:5000/subscriber/resetpassverify" userRole="subscriber" />
    </div>
  )
}

export default SubscriberForgetPass