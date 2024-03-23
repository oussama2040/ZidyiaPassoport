import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './NavBarAdmin.module.css';
import { useNavigate } from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";



function NavbarAdmin() {
  const [tenantName, setTenantName] = useState(null);
  const accessToken = Cookies.get('tenentaccessToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const tenantName = payload.tenent.tenentname;
        setTenantName(tenantName.charAt(0).toUpperCase() + tenantName.slice(1));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [accessToken]);

  const handleLogout = () => {
    try {
      // Attempt to remove cookies
      console.log('Removing cookies...');
      Cookies.remove('tenentaccessToken');
      Cookies.remove('tenentrefreshToken'); 
      console.log('Cookies removed successfully.');
  
      console.log('Checking if cookies are still present...');
      if (Cookies.get('tenentaccessToken') || Cookies.get('tenentrefreshToken')) {
        console.error('Cookies were not removed successfully.');
      } else {
        console.log('Cookies were removed successfully.');
      }
  
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
      <div className={styles.NavBarAdminPanelText}>Admin Panel  <SlArrowRight className='ml-4' /></div>  <div className='ml-4'>{tenantName ? `${tenantName}` : ' '}</div> 
      </span>

      <button className={styles.NavBarAdminLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavbarAdmin;
