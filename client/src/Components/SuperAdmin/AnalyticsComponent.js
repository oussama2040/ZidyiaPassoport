import React from 'react'
import styles from './superAdmin.module.css'
import StudentsCount from './StudentsCount'
import TenantsCount from './TenantsCount'
import SubscriberCount from './SubscriberCount'
import ApprovedDocuments from './ApprovedDocumentsCount'
import PendingDocuments from './PendingDocumentsCount'
import RejectedDocuments from './RejectedDocumentsCount'
import IssuedCertificates from './IssuedCertificatesCount'

const AnalyticsComponent = () => {
    return (
        <div className={styles.analyticsContainer}>
            <StudentsCount style={{ backgroundColor: 'rgba(157, 243, 38, 0.5)' }} />
            <TenantsCount style={{ backgroundColor: 'rgba(228, 90, 90, 0.5)' }} />
            <SubscriberCount style={{ backgroundColor: 'rgba(242, 201, 76, 0.5)' }} />
            <PendingDocuments style={{ backgroundColor: 'rgba(47, 128, 237, 0.5)' }} />
            <ApprovedDocuments style={{ backgroundColor: 'rgba(111, 207, 151, 0.5)' }} />
            <RejectedDocuments style={{ backgroundColor: 'rgba(235, 81, 7, 0.5)' }} />
            <IssuedCertificates style={{ backgroundColor: 'rgba(187, 107, 217, 0.5)' }} />

        </div>
    );
};

export default AnalyticsComponent;
