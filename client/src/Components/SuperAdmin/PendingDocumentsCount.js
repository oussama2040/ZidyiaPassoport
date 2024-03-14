import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const PendingDocuments = ({ style }) => {
    const [pendingsCount, setPendingsCount] = useState(0);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/pending-docs-count');
                setPendingsCount(response.data.PendingDocsCount);
            } catch (error) {
                console.error('Failed to fetch pending documents count:', error);
            }
        };

        fetchPending();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Pending Documents</p>
            <p className={styles.count}>{pendingsCount}</p>

        </div>
    );
};

export default PendingDocuments;
