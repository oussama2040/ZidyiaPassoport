import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../NavBarAdmin/NavBarAdmin.module.css';
import { useNavigate } from 'react-router-dom';

function NavbarSub() {
  const [subscriberName, setSubscriberName] = useState(null);
  const navigate = useNavigate(); // Importing useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/subscriber/getsubscriberinfo',{withCredentials:true});
        setSubscriberName(response.data.subscriberName);
        console.log(subscriberName)
      } catch (error) {
        console.error('Error fetching subscriber info:', error);
      }
    };

    fetchData();
  }, []);

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
