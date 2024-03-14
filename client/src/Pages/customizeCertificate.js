import React from 'react';
import Certificate from '../Components/Certificate/certificatebuilder';
import SideBarStudent from '../Components/SideBar/SideBarStudent';


function CustomizeCertificate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' ,backgroundColor:'#384450'}}>
      <SideBarStudent />  
      <Certificate/>
    </div>
  )
}

export default CustomizeCertificate;


 
