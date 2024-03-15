import React from 'react'
import UpdatePasswordComponent from '../Components/loginSign/updatePassComponent'
function SubscriberUpdatePass() {
  return (
    <div>
      <UpdatePasswordComponent apiUrl="http://localhost:5000/subscriber/updatepassword"  userRole="subscriber"  />
    </div>
  )
}

export default SubscriberUpdatePass