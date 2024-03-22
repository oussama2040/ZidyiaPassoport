import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Subscriber from '../Components/Subscriber/subscriber';
import NavbarSub from '../Components/Subscriber/navbarSubscriber.js'


const Subscribers = () => {

  // ---------authentication Subscriber--------//    
const [authenticated, setAuthenticated] = useState(true);
const navigate = useNavigate();
  
useEffect(() => {
    const subscriberaccessToken = getCookie('subscriberaccessToken');
    if (!subscriberaccessToken) {
        setAuthenticated(false);
        navigate('/subscriber/login');
    } else {
        // Decode the access token to extract role information
        const decodedToken = decodeAccessToken(subscriberaccessToken);
        if (decodedToken && decodedToken.subscriber.role !== 'subscriber') {
          setAuthenticated(false);
          navigate('/subscriber/login');
        }
        else{
          setAuthenticated(true);
        }
    }
}, []);

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

const decodeAccessToken = (accessToken) => {
  try {
      // Decode the JWT token
      const tokenPayload = accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(atob(tokenPayload));
      return decodedToken;
  } catch (error) {
      console.error('Error decoding access token:', error);
      return null;
  }
};


if(!authenticated){
  navigate('/subscriber/login');
}

//============================================================================//

  return (
    authenticated ? (
    <div >
        <NavbarSub/>
        <Subscriber/>
    </div>
    ) : null
  );
}

export default Subscribers
