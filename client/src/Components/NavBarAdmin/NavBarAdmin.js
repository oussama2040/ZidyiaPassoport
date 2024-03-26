import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from './NavBarAdmin.module.css';
import { useNavigate } from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";



function NavbarAdmin() {
  const [tenantName, setTenantName] = useState(null);
  const accessToken = Cookies.get('tenentaccessToken');
  const navigate = useNavigate();
  const [organizationName, setorganizationName] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:5000/tenent/OrganiztionName`,
    { withCredentials: true })
      .then(response => {
        setorganizationName(response.data.organizationName)
      })
      .catch(error => {
        console.error('Error fetching certificate data:', error);
      });
  }, [organizationName]);


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
      <div className={styles.NavBarAdminPanelText}>Admin Panel  <SlArrowRight className='ml-4' /></div>  <div className='ml-4'>{organizationName ? `${organizationName}` : ' '}</div> 
      </span>

      <button className={styles.NavBarAdminLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavbarAdmin;
