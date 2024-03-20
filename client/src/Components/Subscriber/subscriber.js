import React, { useState } from 'react';
import axios from 'axios';
import './subscriber.css';

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

                console.log('Server response:', response.data);

                setResult(response.data);
            } else {
                console.error('No file selected');
            }
        } catch (error) {
            console.error('Error scanning QR code:', error);
        }
    };

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
