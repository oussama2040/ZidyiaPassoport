import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import SideBarAdmin from '../Components/SideBar/SideBarAdmin'
// import NavBarAdmin from '../Components/NavBarAdmin/NavBarAdmin'
import Analytics from '../Components/Admin/Analytics/Analytics'


function Admin({organizationId}) {

  //   // ---------authorization Admin--------//    
const [validToken, setValidToken] = useState(false);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  const checkTokenValidity = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tenent/authorization', { withCredentials: true });
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
  navigate('/tenent/login');
  return null; 
}
//============================================================================================================//


  return (
    <div>
      {/* <NavBarAdmin />
      <SideBarAdmin /> */}
      <Analytics organizationId={organizationId} />
    </div>
  );
}

export default Admin

