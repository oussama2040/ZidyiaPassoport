import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin';
import SideBarAdmin from '../../SideBar/SideBarAdmin';
import styles from './Analytics.module.css';
import CombinedCertificatesChart from './CombinedCertificatesChart';
import TotalCount from './TotaCount';
import { SlArrowLeft } from "react-icons/sl";
import CombinedDocumentsChart from './CombinedDocumentsChart';



function Analytics() {
  const organizationId = 4;


// ------auhthorization Admin -----------//
const [validToken, setValidToken] = useState(false);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  const checkTokenValidity = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tenent/authorization', { withCredentials: true });
      const status = response.data.grantedAccess;
      setValidToken(status === true);
      setLoading(false); // Set loading to false once token validity check is complete
    } catch (error) {
      console.error('Error checking token validity:', error);
      setValidToken(false);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  checkTokenValidity();
}, []);


if (loading) {
  return <div>Loading...</div>;
}

if (!validToken) {
  navigate('/tenent/login');
  return null; 
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

