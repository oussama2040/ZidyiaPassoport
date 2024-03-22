import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from '../NavBarAdmin/NavBarAdmin.module.css';
import { useNavigate } from 'react-router-dom';




function NavbarSub() {
  const [subscriberName, setSubcriberName] = useState(null);
  const accessToken = Cookies.get('subscriberaccessToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const subscriberName = payload.subscriber.subscribername;
        setSubcriberName(subscriberName.charAt(0).toUpperCase() + subscriberName.slice(1));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [accessToken]);

  const handleLogout = () => {
    try {
      // Attempt to remove cookies
      console.log('Removing cookies...');
      Cookies.remove('subscriberaccessToken');
      Cookies.remove('subscriberrefreshToken'); 
      console.log('Cookies removed successfully.');
  
      
  
      setTimeout(() => {
        navigate("/");
      }, 1000); 
    } catch (error) {
      console.error('Error removing cookies:', error);
    }
  };
  

  return (
    <div className={styles.NavBarAdminMain}>
      <span className={styles.NavBarAdminDashborad}>
        {subscriberName ? `Hello, ${subscriberName}` : 'Subscriber Panel'}
      </span>

      <button className={styles.NavBarAdminLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavbarSub;
