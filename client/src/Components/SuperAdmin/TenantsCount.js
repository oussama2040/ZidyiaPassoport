import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const TenantsCount = ({style}) => {
    const [tenantsCount, setTenantsCount] = useState(0);

    useEffect(() => {
        const fetchTenantsCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/tenants-count');
                setTenantsCount(response.data.tenantCount);
            } catch (error) {
                console.error('Failed to fetch tenant count:', error);
            }
        };

        fetchTenantsCount();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Count of Tenants</p>
            <p className={styles.count}>{tenantsCount}</p>

        </div>
    );
};

export default TenantsCount;
