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
            <StudentsCount style={{ backgroundColor: '#9df326' }} />
            <TenantsCount style={{ backgroundColor: '#E45A5A' }} />
            <SubscriberCount style={{ backgroundColor: '#F2C94C' }} />
            <PendingDocuments style={{ backgroundColor: '#2F80ED' }} />
            <ApprovedDocuments style={{ backgroundColor: '#6FCF97' }} />
            <RejectedDocuments style={{ backgroundColor: '#EB5107' }} />
            <IssuedCertificates style={{ backgroundColor: '#BB6BD9' }} />
        </div>
    );
};

export default AnalyticsComponent;
