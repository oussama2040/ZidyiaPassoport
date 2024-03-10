import React from 'react'
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin'
import SideBarAdmin from '../../SideBar/SideBarAdmin'

function getAdminAfterFilled() {
  return (
    <div>
    <NavbarAdmin />
    <div className='flex'>
    <SideBarAdmin />


    
      Get admin after Filled
      </div>
    </div>
  )
}

export default getAdminAfterFilled
