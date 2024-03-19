import React, { useEffect, useState } from 'react';
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
    axios.get(`http://localhost:5000/admin/certificatesverified/${organizationId}`)
      .then(response => {
        setCertificateData(response.data.certificateRequests);
        console.log(certificateData)
      })
      .catch(error => {
        console.error('Error fetching certificate data:', error);
      });
  }, [organizationId]);

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
