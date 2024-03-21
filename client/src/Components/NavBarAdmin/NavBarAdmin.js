import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './NavBarAdmin.module.css';
import { useNavigate } from 'react-router-dom';




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
        {tenantName ? `Hello, ${tenantName}` : 'Admin Panel'}
      </span>

      <button className={styles.NavBarAdminLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavbarAdmin;
