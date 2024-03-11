import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const SubscriberCount = ({ style }) => {
    const [subscriberCount, setsubScriberCount] = useState(0);

    useEffect(() => {
        const fetchSubscribersCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/subscribers-count');
                setsubScriberCount(response.data.subscriberCount);
            } catch (error) {
                console.error('Failed to fetch subscribers count:', error);
            }
        };

        fetchSubscribersCount();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Count of Subscribers</p>
            <p className={styles.count}>{subscriberCount}</p>

        </div>
    );
};

export default SubscriberCount;
