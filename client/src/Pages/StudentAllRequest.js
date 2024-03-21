import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllCertificate from '../Components/Student/RequestCertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarStudent from '../Components/NavBarAdmin/NavBarStudent'


function Home() {

//    // ---------authentication Student--------//    
// const [authenticated, setAuthenticated] = useState(true);
// const navigate = useNavigate();
  
// useEffect(() => {
//     const studentaccessToken = getCookie('studentaccessToken');
//     if (!studentaccessToken) {
//         setAuthenticated(false);
//         navigate('/student/login');
//     } else {
//         // Decode the access token to extract role information
//         const decodedToken = decodeAccessToken(studentaccessToken);
//         if (decodedToken && decodedToken.student.role !== 'student') {
//           setAuthenticated(false);
//           navigate('/student/login');
//         }
//         else{
//           setAuthenticated(true);
//         }
//     }
// }, []);

// const getCookie = (name) => {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith(name + '=')) {
//             return cookie.substring(name.length + 1);
//         }
//     }
//     return null;
// };

// const decodeAccessToken = (accessToken) => {
//   try {
//       // Decode the JWT token
//       const tokenPayload = accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//       const decodedToken = JSON.parse(atob(tokenPayload));
//       return decodedToken;
//   } catch (error) {
//       console.error('Error decoding access token:', error);
//       return null;
//   }
// };


// if(!authenticated){
//   navigate('/student/login');
// }

//============================================================================//

  return (
    // authenticated ? (
    <div>
      <NavBarStudent />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarStudent />
        <AllCertificate />
      </div>
    </div>
    // ) : null
  )
}

export default Home



