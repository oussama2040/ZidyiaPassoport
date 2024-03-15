import React from 'react';
import Profile from '../Components/Student/profile';
import SideBarStudent from '../Components/SideBar/SideBarStudent';
import NavBarStudent from '../Components/NavBarAdmin/NavBarStudent'


function Home() {
  return (
    <div>
      <NavBarStudent />
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <SideBarStudent />
        <Profile />
      </div>
    </div>
  )
}

export default Home



