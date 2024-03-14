import React from 'react';
import AddCertificate from '../Components/Certificate/addCertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarSupperAdmin from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div style={{ backgroundColor: '#384450' }}>
      <NavBarSupperAdmin />
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#384450' }}>
        <SideBarStudent />
        <AddCertificate />
      </div>
    </div>
  )
}

export default Home



