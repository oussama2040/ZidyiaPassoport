import React from 'react'

import SideBarStudent from '../Components/SideBar/SideBarStudent';
import Certificate from '../Components/Certificatebuilder.js';

function CustomizeCertificate() {
  return (
    
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <SideBarStudent />  
      <Certificate/>
    </div>
  )
};
export default CustomizeCertificate;