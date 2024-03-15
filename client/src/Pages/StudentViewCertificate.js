import React from 'react';
import Certificate from '../Components/Student/Viewcertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarSupperAdmin from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div>
      <NavBarSupperAdmin />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarStudent />
        <Certificate />
      </div>
    </div>
  )
}

export default Home



