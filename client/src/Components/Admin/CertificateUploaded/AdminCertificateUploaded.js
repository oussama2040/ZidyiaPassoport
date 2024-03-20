import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin';
import SideBarAdmin from '../../SideBar/SideBarAdmin';
import CertificateUplodedCard from './CertificateUplodedCard';
import styles from './CertificateUploaded.module.css';
import { SlArrowLeft } from "react-icons/sl";

function AdminCertificateUploaded({ organizationId }) {
const [certificateData, setCertificateData] = useState(null);
useEffect(() => {
    console.log("organiztion id is ", organizationId)
    axios.get(`http://localhost:5000/admin/certificatesverified/${organizationId}`,
    { withCredentials: true })
      .then(response => {
        setCertificateData(response.data.certificateRequests);
        console.log(certificateData)
      })
      .catch(error => {
        console.error('Error fetching certificate data:', error);
      });
  }, [organizationId]);

  // ---------authentication Admin--------//    
const [authenticated, setAuthenticated] = useState(true);
const navigate = useNavigate();
  
    useEffect(() => {
      const tenentaccessToken = getCookie('tenentrefreshToken');
      if (!tenentaccessToken) {
          setAuthenticated(false);
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
  
  if (!authenticated) {
    navigate('/tenent/login');
  }

  //--------------------------------//  
  return (
<div>
      <NavbarAdmin />
      <div className='flex'>
        <SideBarAdmin />
          <div className={styles.reqdisplayflexcolomn}>
           <div className={styles.RequestPendingTitle}> <SlArrowLeft /> All Certificates Uploaded</div> 
        <div className={styles.Certificateform}>
          {/* Display the CertificateCard component if certificateData is available */}
          {certificateData && <CertificateUplodedCard certificate={certificateData} />}
        </div>
        </div>
      </div>
    </div>
  
  )
}

export default AdminCertificateUploaded
