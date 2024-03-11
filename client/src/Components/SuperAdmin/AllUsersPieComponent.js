import React, { useState, useEffect } from 'react';
import styles from './superAdmin.module.css'
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const AllUsersPieComponent = () => {
    const [counts, setCounts] = useState({
        students: 0,
        tenants: 0,
        subscribers: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                fetch('http://localhost:5000/superadmin/students-count'),
                fetch('http://localhost:5000/superadmin/tenants-count'),
                fetch('http://localhost:5000/superadmin/subscribers-count')
            ]);

            const data = await Promise.all(responses.map(response => response.json()));
            const [studentsCount, tenantsCount, subscribersCount] = data;

            setCounts({
                students: studentsCount.studentCount,
                tenants: tenantsCount.tenantCount,
                subscribers: subscribersCount.subscriberCount
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const { students, tenants, subscribers } = counts;


    const totalCount = students + tenants + subscribers;

    const studentPercentage = ((students / totalCount) * 100).toFixed(2);
    const tenantPercentage = ((tenants / totalCount) * 100).toFixed(2);
    const subscriberPercentage = ((subscribers / totalCount) * 100).toFixed(2);

    const isDataLoaded = students !== 0 && tenants !== 0 && subscribers !== 0;

    const percentages = {
        labels: ['Students', 'Tenants', 'Subscribers'].map((label, index) => {
            if (index === 0) return `${label} (${studentPercentage}%)`;
            else if (index === 1) return `${label} (${tenantPercentage}%)`;
            else return `${label} (${subscriberPercentage}%)`;
        }),
        datasets: [
            {
                data: [students, tenants, subscribers],
                backgroundColor: ['#9df326', '#E45A5A', '#F2C94C'],
            }
        ]
    };


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: '#fff' }} >Users</p>
            </div >
            <div className={styles.doughnutCont}>

                {isDataLoaded ? (
                    <Doughnut data={percentages} className={styles.doughnut} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default AllUsersPieComponent;
