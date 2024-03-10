// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const VerificationComponent = () => {
//   const { verificationToken } = useParams(); // Extract the token from the URL
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         // Send the token to the backend for verification
//         const response = await axios.post(`http://localhost:5000/author/registerverify?token=${verificationToken}`);
        
//         // If verification is successful, redirect to the login page
//         console.log('Verification successful');
//         navigate('http://localhost:3000/login'); // Redirect to the login page
//       } catch (error) {
//         // If verification fails or there's an error, set validUrl to false
//         console.error('Error verifying token:', error);
//         // setValidUrl(false);
//       }
//     };

//     verifyToken();
//   }, [verificationToken, navigate]);

//   return (
//     <div>
//       <h2>Verifying your account...</h2>
//       {/* You can show a loader or some message while verification is in progress */}
//     </div>
//   );
// };

// export default VerificationComponent;
