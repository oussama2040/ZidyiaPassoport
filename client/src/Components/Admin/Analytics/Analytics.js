import React from 'react';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin';
import SideBarAdmin from '../../SideBar/SideBarAdmin';
import styles from './Analytics.module.css';
import CombinedCertificatesChart from './CombinedCertificatesChart';
import TotalCount from './TotaCount';
import { SlArrowLeft } from "react-icons/sl";
import CombinedDocumentsChart from './CombinedDocumentsChart';


function Analytics() {
const organizationId =4;
  return (
    <div>
      <NavbarAdmin />
      <div className='flex'>
        <SideBarAdmin />
          <div className={styles.reqdisplayflexcolomn}>
           <div className={styles.RequestPendingTitle}> <SlArrowLeft /> Analytics </div> 
        <div className={styles.Analyticsform}>
          {/* Display the CertificateCard component if certificateData is available */}
          <TotalCount  organizationId={organizationId} />
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

