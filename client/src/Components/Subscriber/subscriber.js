import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './subscriber.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Subscriber = () => {
    const [result, setResult] = useState('');

    const handleScan = async () => {
        try {
            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput.files[0]; // Get the first file selected by the user

            // Check if a file was selected
            if (file) {
                // Create FormData object to send file data
                const formData = new FormData();
                formData.append('certificate', file);

                // Send request to server
                const response = await axios.post('http://localhost:5000/subscriber/scanQRCode', formData, {
                    withCredentials: true
                });

                // console.log('Server response:', response.data);

                setResult(response.data);
            } else {
                console.error('No file selected');
            }
        } catch (error) {
            console.error('Error scanning QR code:', error);
        }
    };
    // -------------------------------------------------------------------------------------
    const [expirydate, setexpirydate] = useState(null);
const navigate = useNavigate(); // Importing useNavigate hook

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/subscriber/getsubscriberinfo', { withCredentials: true });
      const fetchedExpiryDate = response.data.expiryDate;
      setexpirydate(fetchedExpiryDate);
      
      // Log the fetched expiry date
      console.log("Fetched expiry date:", fetchedExpiryDate);

      const expiryDate = new Date(fetchedExpiryDate);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        // Cookies.remove('subscriberaccessToken');
        // Cookies.remove('subscriberrefreshToken');
        navigate(`/subscriber/subscriptionEnd`);
      
      }
    } catch (error) {
      console.error('Error fetching subscriber info:', error);
    }
  };

  fetchData();
}, []);

  
    // ------------------------------------------------------------------------------------------

    return (
        <div className='subscribercontainer'>
            <h1 className='subtitle'>Scan Certificate To Verify</h1>
            <form>
                <input type="file" name="certificate" className='subfile'/>
                <button type="button" className='subbtn' onClick={handleScan}>Scan</button>
            </form>
          
            {result && result.message && (
                <div className="result">
                    <p className='resultmessage'>{result.message}</p>
                    <div className='resultinfo'>
                        {result.decodedQRData && (
                            <p>Student ID: {JSON.parse(result.decodedQRData).studentId}</p>
                        )}
                        {result.decodedQRData && (
                            <p>Student Name: {JSON.parse(result.decodedQRData).studentName}</p>
                        )}
                        {result.decodedQRData && (
                            <p>Organization Name: {JSON.parse(result.decodedQRData).organizationName}</p>
                        )}
                        {result.decodedQRData && (
                            <p>Academic ID: {JSON.parse(result.decodedQRData).academicID}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscriber;