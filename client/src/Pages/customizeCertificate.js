import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Certificate from '../Components/Certificate/certificatebuilder';
import SideBarAdmin from '../Components/SideBar/SideBarAdmin';
import NavbarAdmin from '../Components/NavBarAdmin/NavBarAdmin';

function CustomizeCertificate() {

 // ---------authorization Admin--------//    
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


  //==========================================================================================================================//    
  return (
    <div>
      <NavbarAdmin />
      <div style={{ display: 'flex', flexDirection: 'row'}}>
       <SideBarAdmin />
        <Certificate/>
      </div>
      </div>
  );
};
export default CustomizeCertificate;

