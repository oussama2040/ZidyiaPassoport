import React from 'react';
import AllCertificate from '../Components/Student/RequestCertificate';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarStudent from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div>
      <NavBarStudent />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarStudent />
        <AllCertificate />
      </div>
    </div>
  )
}

export default Home



