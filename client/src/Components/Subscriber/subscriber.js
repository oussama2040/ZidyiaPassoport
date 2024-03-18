import React, { useState } from 'react';
import axios from 'axios';
import   './subscriber.css';
import { json } from 'react-router-dom';


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
            const response = await axios.post('http://localhost:5000/subscriber/scanQRCode', formData);
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
                    <p>{result.message}</p>
                    {result && result.decodedQRData && (
                    <p>Student ID: {JSON.parse(result.decodedQRData).studentId}</p>
                   
                    )}
                     {result && result.decodedQRData && (
                     <p>StudentName:{JSON.parse(result.decodedQRData).studentName}</p>
                     )}
                     </div>
                   
                
            )}
        </div>
  )
}

export default Subscriber
