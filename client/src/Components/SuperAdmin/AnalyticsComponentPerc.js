import React from 'react'
import styles from './superAdmin.module.css'
import AllUsersPieComponent from './AllUsersPieComponent';
import AllDocumentsPieComponent from './AllDocumentsPieComponent';


const AnalyticsComponent = () => {
    return (
        <div className={styles.analyticsContainerPerc}>
            <AllUsersPieComponent />
            <AllDocumentsPieComponent />
        </div>
    );
};

export default AnalyticsComponent;
