import React from 'react';
import Certificate from '../Components/certificatebuilder';
import SideBarStudent from '../Components/SideBar/SideBarStudent';


function Home() {
  return (
    <div className='flex'>
      <SideBarStudent />
      <Certificate/>
    </div>
  )
}

export default Home


 
