import React from 'react';
import styles from './SideBar.module.css';
import Logo from './Logo';
import Nav from './Nav';
import { GrAnalytics } from "react-icons/gr";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import ZidyiaLogo from './ZidyiaLogo';


function SideBarSupperAdmin() {
  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />
        <Nav icon={< GrAnalytics  />} name="Analytics" />
        <Nav icon={< MdOutlineCreateNewFolder  />} name="Create Tenent" />
        <Nav icon={< IoMdPersonAdd  />} name="Create Verifier" />
        <Nav icon={< PiStudentBold  />} name="Students Account" />


        <ZidyiaLogo />

        
      </div>
    </div>
  );
}

export default SideBarSupperAdmin;
