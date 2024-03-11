import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import { GrAnalytics } from "react-icons/gr";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import ZidyiaLogo from './ZidyiaLogo';
import styles from './SideBar.module.css';

function SideBarSupperAdmin({ activeTab, handleTabClick }) {
  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />
        <Nav
          icon={<GrAnalytics />}
          name="Analytics"
          active={activeTab === 'Analytics'}
          onClick={() => handleTabClick('Analytics')}
        />
        <Nav
          icon={<MdOutlineCreateNewFolder />}
          name="Create Tenant"
          active={activeTab === 'Create Tenant'}
          onClick={() => handleTabClick('Create Tenant')}
        />
        <Nav
          icon={<IoMdPersonAdd />}
          name="Create Verifier"
          active={activeTab === 'Create Verifier'}
          onClick={() => handleTabClick('Create Verifier')}
        />
        <Nav
          icon={<PiStudentBold />}
          name="Students Account"
          active={activeTab === 'Students Account'}
          onClick={() => handleTabClick('Students Account')}
        />
        <ZidyiaLogo />
      </div>
    </div>
  );
}

export default SideBarSupperAdmin;
