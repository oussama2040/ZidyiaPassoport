import React, { useState, useEffect } from 'react';
import styles from './superAdmin.module.css'
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const AllDocumentsPieComponent = () => {
    const [counts, setCounts] = useState({
        approved: 0,
        pending: 0,
        rejected: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                fetch('http://localhost:5000/superadmin/pending-docs-count'),
                fetch('http://localhost:5000/superadmin/approved-docs-count'),
                fetch('http://localhost:5000/superadmin/rejected-docs-count')
            ]);


            const data = await Promise.all(responses.map(response => response.json()));
            const [pendingCount, approvedCount, rejectedCount] = data;

            setCounts({
                pending: pendingCount.PendingDocsCount,
                approved: approvedCount.countApprovedDocs,
                rejected: rejectedCount.countRejectedDocs
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const { pending, approved, rejected } = counts;
    console.log(counts)


    const totalCount = approved + pending + rejected;


    const approvedPercentage = ((approved / totalCount) * 100).toFixed(2);
    const pendingPercentage = ((pending / totalCount) * 100).toFixed(2);
    const rejectedPercentage = ((rejected / totalCount) * 100).toFixed(2);

    const isDataLoaded = approved !== 0 && pending !== 0 && rejected !== 0;

    const percentages = {
        labels: ['Pending', 'Approved', 'Rejected'].map((label, index) => {
            if (index === 0) return `${label} (${approvedPercentage}%)`;
            else if (index === 1) return `${label} (${pendingPercentage}%)`;
            else return `${label} (${rejectedPercentage}%)`;
        }),
        datasets: [
            {
                data: [pending, approved, rejected],
                backgroundColor: [
                    'rgba(47, 128, 237, 0.5)', // Increase opacity to 50%
                    'rgba(111, 207, 151, 0.5)', // Increase opacity to 50%
                    'rgba(235, 81, 7, 0.5)', // Increase opacity to 50%
                ],
                borderWidth: 0,
            }
        ]
    };
    const chartOptions = {
        plugins: {
            legend: {
                display: false, // Remove the legend
            },
        },
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: '#fff', marginBottom: '10px', marginTop: '-10px' }}>Documents</p>

            </div>
            <div className={styles.doughnutCont}>

                {isDataLoaded ? (
                    <Pie data={percentages} options={chartOptions} className={styles.doughnut} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default AllDocumentsPieComponent;
