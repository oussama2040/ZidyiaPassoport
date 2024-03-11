import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const RejectedDocuments = ({ style }) => {
    const [pendingsCount, setPendingsCount] = useState(0);

    useEffect(() => {
        const fetchRejected = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/rejected-docs-count');
                setPendingsCount(response.data.countRejectedDocs);
            } catch (error) {
                console.error('Failed to fetch rejected documents count:', error);
            }
        };

        fetchRejected();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Rejected Documents</p>
            <p className={styles.count}>{pendingsCount}</p>

        </div>
    );
};

export default RejectedDocuments;
