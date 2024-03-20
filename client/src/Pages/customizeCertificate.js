import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SideBarStudent from '../Components/SideBar/SideBarStudent';
import Certificate from '../Components/Certificate/certificatebuilder';

function CustomizeCertificate() {

  // ---------authentication Admin--------//    
const [authenticated, setAuthenticated] = useState(true);
const navigate = useNavigate();
  
useEffect(() => {
    const tenentaccessToken = getCookie('tenentaccessToken');
    if (!tenentaccessToken) {
        setAuthenticated(false);
        navigate('/tenent/login');
    } else {
        // Decode the access token to extract role information
        const decodedToken = decodeAccessToken(tenentaccessToken);
        if (decodedToken && decodedToken.tenent.role !== 'tenent') {
          setAuthenticated(false);
          navigate('/tenent/login');
        }
        else{
          setAuthenticated(true);
        }
    }
}, []);

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

const decodeAccessToken = (accessToken) => {
  try {
      // Decode the JWT token
      const tokenPayload = accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(atob(tokenPayload));
      return decodedToken;
  } catch (error) {
      console.error('Error decoding access token:', error);
      return null;
  }
};


if(!authenticated){
  navigate('/tenent/login');
}

  //==========================================================================================================================//    
  return (
    authenticated ? (
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <SideBarStudent />  
        <Certificate/>
      </div>
    ) : null
  );
};
export default CustomizeCertificate;

