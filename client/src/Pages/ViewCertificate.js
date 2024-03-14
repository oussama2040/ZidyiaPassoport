import React from 'react';
import Certificate from '../Components/Certificate/Viewcertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarSupperAdmin from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div style={{ backgroundColor: '#384450' }}>
      <NavBarSupperAdmin />
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#384450' }}>
        <SideBarStudent />
        <Certificate />
      </div>
    </div>
  )
}

export default Home



