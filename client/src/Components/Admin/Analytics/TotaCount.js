import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Analytics.module.css';

function TotalCount({ organizationId }) {
    const [certificateCount, setCertificateCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [DocumentCount, setDocumentCount] = useState(0);
    const [pendingDocumentCount, setPendingDocumentCount] = useState(0);
    const [approvedDocumentCount, setApprovedDocumentCount] = useState(0);
    const [rejectedDocumentCount, setRejectedDocumentCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    totalCertificatesResponse,
                    pendingCertificatesResponse,
                    approvedCertificatesResponse,
                    rejectedCertificatesResponse,
                    totalDocumentsResponse,
                    pendingDocumentsResponse,
                    approvedDocumentsResponse,
                    rejectedDocumentsResponse
                ] = await Promise.all([
                    axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count`, { withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/pending`, { withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/approved`,{ withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/certificates/organization/${organizationId}/count/rejected`,{ withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/documents/organization/${organizationId}/count`,{ withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/documents/organization/${organizationId}/count/pending`,{ withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/documents/organization/${organizationId}/count/approved`,{ withCredentials: true }),
                    axios.get(`http://localhost:5000/admin/documents/organization/${organizationId}/count/rejected`,{ withCredentials: true })
                ]);

                setCertificateCount(totalCertificatesResponse.data.totalCertificates);
                setPendingCount(pendingCertificatesResponse.data.pendingCertificates);
                setApprovedCount(approvedCertificatesResponse.data.approvedCertificates);
                setRejectedCount(rejectedCertificatesResponse.data.rejectedCertificates);
                setDocumentCount(totalDocumentsResponse.data.totalDocuments);
                setPendingDocumentCount(pendingDocumentsResponse.data.pendingDocuments);
                setApprovedDocumentCount(approvedDocumentsResponse.data.approvedDocuments);
                setRejectedDocumentCount(rejectedDocumentsResponse.data.rejectedDocuments);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [organizationId]);

    return (
        <div className={styles.analyticsContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table className={styles.analyticsTable}>
                    <thead>
                        <tr className={styles.tableHeader} >
                            <th >Category</th>
                            <th >Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Total Requset Certificate </td>
                            <td className={styles.AnalyticsValue}> {certificateCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Pending Certificate </td>
                            <td className={styles.AnalyticsValue}> {pendingCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Approved Certificate </td>
                            <td className={styles.AnalyticsValue}> {approvedCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Rejected Certificate </td>
                            <td className={styles.AnalyticsValue}> {rejectedCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Total Documents</td>
                            <td className={styles.AnalyticsValue}> {DocumentCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Pending Document</td>
                            <td className={styles.AnalyticsValue}> {pendingDocumentCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Approved Document</td>
                            <td className={styles.AnalyticsValue}> {approvedDocumentCount}</td>
                        </tr>
                        <tr>
                            <td className={styles.AnalyticsTitle}>Rejected Document</td>
                            <td className={styles.AnalyticsValue}> {rejectedDocumentCount}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TotalCount;
