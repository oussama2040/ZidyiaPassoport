import React from 'react'
import LoginComponent from '../Components/loginSign/loginComponent';
const SubscriberLogin = () => {
  return (
    <div>
    <LoginComponent apiUrl="http://localhost:5000/Subscriber/login" userRole="Subscriber" />
    </div>
  )
}
export default SubscriberLogin;