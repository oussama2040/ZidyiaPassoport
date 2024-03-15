import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const IssuedCertificates = ({ style }) => {
    const [issuedCertCount, setIssuedCertCount] = useState(0);

    useEffect(() => {
        const fetchIssuedCert = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/issued-cert-count');
                setIssuedCertCount(response.data.IssuedCertCount);
            } catch (error) {
                console.error('Failed to fetch issued certificates count:', error);
            }
        };

        fetchIssuedCert();
    }, []);

    return (
        <>
        <div className={styles.countContainer} style={style}>
            <p>Issued Certificates</p>
            <p className={styles.count}>{issuedCertCount}</p>

        </div>
        </>
    );
};

export default IssuedCertificates;
