import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin';
import SideBarAdmin from '../../SideBar/SideBarAdmin';
import styles from './Analytics.module.css';
import CombinedCertificatesChart from './CombinedCertificatesChart';
import TotalCount from './TotaCount';
import { SlArrowLeft } from "react-icons/sl";
import CombinedDocumentsChart from './CombinedDocumentsChart';



function Analytics() {
  const organizationId = 4;


// ------auhtentication Admin -----------//
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

// If user is not authenticated, redirect to login page
if (!authenticated) {
navigate('/tenent/login');
}

// ------------------------//
  return (
    <div>
      <NavbarAdmin />
      <div className='flex'>
        <SideBarAdmin />
        <div className={styles.reqdisplayflexcolomn}>
          <div className={styles.RequestPendingTitle}> <SlArrowLeft />  <div className='ml-3 text-white'>Analytics </div> </div>
          <div className={styles.Analyticsform}>
            {/* Display the CertificateCard component if certificateData is available */}
            <TotalCount organizationId={organizationId} />
            <div className={styles.chartsContainer}>
              <CombinedCertificatesChart organizationId={organizationId} />
              <CombinedDocumentsChart organizationId={organizationId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

