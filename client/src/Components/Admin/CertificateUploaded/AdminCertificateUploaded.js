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
           <div className={styles.RequestPendingTitle}> <SlArrowLeft /> <div className='ml-3 text-white'>All Certificates Uploaded</div></div> 
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
