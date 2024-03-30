import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../Components/Student/profile';
import axios from 'axios';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarStudent from '../Components/NavBar/NavBarStudent'


function Home() {

   // ---------authentication Student--------//    
   const [validToken, setValidToken] = useState(false);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   
   useEffect(() => {
     const checkTokenValidity = async () => {
       try {
         const response = await axios.get('http://localhost:5000/student/authorization', { withCredentials: true });
         const status = response.data.grantedAccess;
         setValidToken(status === true);
         setLoading(false); // Set loading to false once token validity check is complete
       } catch (error) {
         console.error('Error checking token validity:', error);
         setValidToken(false);
         setLoading(false); // Set loading to false if there's an error
       }
     };
   
     checkTokenValidity();
   }, []);
   
   
   if (loading) {
     return <div>Loading...</div>;
   }
   
   if (!validToken) {
     navigate('/student/login');
     return null; 
   }

//============================================================================//

  return (
    <div>
      <NavBarStudent />
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <SideBarStudent />
        <Profile />
      </div>
    </div>
  )
}

export default Home



