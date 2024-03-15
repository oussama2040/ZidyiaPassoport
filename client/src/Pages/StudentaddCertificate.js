import React from 'react';
import AddCertificate from '../Components/Student/addCertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarStudent from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div>
      <NavBarStudent />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarStudent />
        <AddCertificate />
      </div>
    </div>
  )
}

export default Home



