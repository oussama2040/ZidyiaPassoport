import React from 'react';
import styles from './SideBar.module.css';
import Logo from './Logo';
import Nav from './Nav';
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBook } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link } from 'react-router-dom';
import ZidyiaLogo from './ZidyiaLogo.js';
import { NavLink, useLocation } from 'react-router-dom'; 


function SideBarStudent() {
  const location = useLocation(); // Get current location

  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />
        {/* <Nav icon={<IoHomeOutline />} name="Home" to="/Home" /> */}
        <NavLink to="/student/requestCertificate" >
          <div className={location.pathname === '/student/requestCertificate' ? styles.active : ''}>
          <Nav icon={< MdOutlineBook />} name="Request Cert" />
          </div>
        </NavLink>
       
        <NavLink to="/student/viewCertificate" >
          <div className={location.pathname === '/student/viewCertificate' ? styles.active : ''}>
          <Nav icon={< MdVerified />} name="Verified Cert" />
          </div>
        </NavLink>
        <NavLink to="/student/addCertificate" >
          <div className={location.pathname === '/student/addCertificate' ? styles.active : ''}>
          <Nav icon={< CgTranscript />} name="Add Cert" />
          </div>
        </NavLink>
        <NavLink to="/student/issueCertificate" >
          <div className={location.pathname === '/student/issueCertificate' ? styles.active : ''}>
          <Nav icon={< CgTranscript />} name="issue Cert" />
          </div>
        </NavLink>
        {/* <Nav icon={<MdOutlineContactSupport />} name="Get Support" to="/getSupport" /> */}

        <ZidyiaLogo />

        
      </div>
    </div>
  );
}

export default SideBarStudent;
