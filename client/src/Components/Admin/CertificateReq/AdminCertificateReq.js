import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin';
import SideBarAdmin from '../../SideBar/SideBarAdmin';
import CertificateCard from './CertificateCard';
import styles from './CertificateReq.module.css';

function AdminCertificateReq({ organizationId }) {
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    console.log("organiztion id is ", organizationId)
    axios.get(`http://localhost:5000/admin/certificates/${organizationId}`)
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
        <div className={styles.Certificateform}>
          {/* Display the CertificateCard component if certificateData is available */}
          {certificateData && <CertificateCard certificate={certificateData} />}
        </div>
      </div>
    </div>
  );
}

export default AdminCertificateReq;
