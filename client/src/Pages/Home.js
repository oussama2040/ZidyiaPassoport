import React from 'react';
import Certificate from '../Components/certificatebuilder';
import SideBarStudent from '../Components/SideBar/SideBarStudent';


function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <SideBarStudent />  
      <Certificate/>
    </div>
  )
}

export default Home


 
