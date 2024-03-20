import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SideBarStudent from '../Components/SideBar/SideBarStudent';
import Certificate from '../Components/Certificate/certificatebuilder';

function CustomizeCertificate() {

  // ---------authentication Admin--------//    
const [authenticated, setAuthenticated] = useState(true);
const navigate = useNavigate();
  
    useEffect(() => {
      const tenentaccessToken = getCookie('tenentrefreshToken');
      if (!tenentaccessToken) {
          setAuthenticated(false);
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
  
  if (!authenticated) {
    navigate('/tenent/login');
  }

  //--------------------------------//    
  return (
    
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <SideBarStudent />  
      <Certificate/>
    </div>
  )
};
export default CustomizeCertificate;