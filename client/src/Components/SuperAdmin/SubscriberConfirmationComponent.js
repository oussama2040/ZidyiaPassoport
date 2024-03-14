import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';
import ConfirmationPopup from './ConfirmationPopUp';

const SubscriberConfirmation = () => {
    const [subscriptionRequests, setSubscriptionRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/superadmin/subscription-requests');
                setSubscriptionRequests(response.data.subscriptionRequests);
                console.log('Subscription requests:', response.data.subscriptionRequests);
            } catch (error) {
                console.error('Error fetching subscription requests:', error);
            }
        };

        fetchData();
    }, []);

    const handleConfirm = (request) => {
        setSelectedRequest(request);
        setShowPopup(true);
    }



    const handleConfirmPopup = async () => {
        console.log('Confirmed:', selectedRequest);
        console.log("id:", selectedRequest.id);

        try {
            const response = await axios.post('http://localhost:5000/superadmin/subscriptions', {
                subscriptionRequestId: selectedRequest.id
            });

            console.log('Subscription Confirmed:', response.data);
            setSelectedRequest(null);
            setShowPopup(false);
            setSuccessMessage(`Subscription for ${selectedRequest.subscriber_name} created successfully.`);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            setSubscriptionRequests(prevRequests =>
                prevRequests.filter(request => request.id !== selectedRequest.id)
            );
        } catch (error) {
            console.error('Error occurred while making POST request:', error);
        }
    };



    const handleCancelPopup = () => {
        setSelectedRequest(null);
        setShowPopup(false);
    }

    return (
        <div className={styles.SubscriberCreationContainer}>
            {successMessage && <div className={styles.subsSuccess}>{successMessage}</div>}
            <h2>Subscription Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptionRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.subscriber_email}</td>
                            <td>{request.subscriber_name}</td>
                            <td>{request.location}</td>
                            <td style={{ color: '#5DD3B3' }}>{request.status}</td>
                            <td>
                                <button onClick={() => handleConfirm(request)}>Confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <div className={styles.overlay}>

                    <div>
                        {selectedRequest && (
                            <ConfirmationPopup
                                message={`Are you sure you want to confirm subscription request for ${selectedRequest.subscriber_name}`}
                                email={selectedRequest.subscriber_email}
                                location={selectedRequest.location}
                                onConfirm={handleConfirmPopup}
                                onCancel={handleCancelPopup}
                            />
                        )}

                    </div>


                </div>
            )}
        </div>
    );

};

export default SubscriberConfirmation;
