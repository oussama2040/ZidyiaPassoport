import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const ApprovedDocuments = ({ style }) => {
    const [approvedCount, setApprovedCount] = useState(0);

    useEffect(() => {
        const fetchApprovedDocsCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/approved-docs-count');
                setApprovedCount(response.data.countApprovedDocs);
            } catch (error) {
                console.error('Failed to fetch approved documents count:', error);
            }
        };

        fetchApprovedDocsCount();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Approved Documents</p>
            <p className={styles.count}>{approvedCount}</p>

        </div>
    );
};

export default ApprovedDocuments;
