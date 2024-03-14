import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const StudentsCount = ({ style }) => {
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/students-count');
                setStudentCount(response.data.studentCount);
                console.log(response.data.studentCount)
            } catch (error) {
                console.error('Failed to fetch student count:', error);
            }
        };

        fetchStudentCount();
    }, []);

    return (
        <div className={styles.countContainer} style={style}>
            <p>Count of Students</p>
            <p className={styles.count}>{studentCount}</p>

        </div>
    );
};

export default StudentsCount;
