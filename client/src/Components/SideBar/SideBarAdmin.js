import React from 'react';
import styles from './SideBar.module.css';
import Logo from './Logo';
import Nav from './Nav';
import { NavLink, useLocation } from 'react-router-dom'; 
import { GrAnalytics } from "react-icons/gr";
import { BiCustomize } from "react-icons/bi";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { TbFileCertificate } from "react-icons/tb";
import { LiaCertificateSolid } from "react-icons/lia";
import ZidyiaLogo from './ZidyiaLogo.js';

function SideBarAdmin() {
  const location = useLocation(); // Get current location

  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />

        <NavLink to="/admin" >
          <div className={location.pathname === '/admin' ? styles.active : ''}>
          <Nav icon={<GrAnalytics />} name="Analytics" />
          </div>
        </NavLink>
        <NavLink to="/admin/reqcertificate" >
          <div className={location.pathname === '/admin/reqcertificate' ? styles.active : ''}>
          <Nav icon={< IoGitPullRequestSharp />} name="Certificate Request" />
          </div>
        </NavLink>
        <NavLink to="/admin/reqcustomize" >
          <div className={location.pathname === '/admin/reqcustomize' ? styles.active : ''}>
          <Nav icon={< BiCustomize />} name="Customize Request" />
          </div>
        </NavLink>

        <NavLink to="/admin/issuecertificate" >
          <div className={location.pathname === '/admin/issuecertificate' ? styles.active : ''}>
          <Nav icon={< BiCustomize />} name="Issue Certificate" />
          </div>
        </NavLink>

        <NavLink to="/admin/certificateuploaded" >
          <div className={location.pathname === '/admin/certificateuploaded' ? styles.active : ''}>
          <Nav icon={< TbFileCertificate />} name="Certificate Uploaded" />
          </div>
        </NavLink>

        <NavLink to="/admin/customize">
          <div  className={location.pathname === '/admin/customize' ? styles.active : ''}>
          <Nav icon={< BiCustomize />} name="Field Customize" />
          </div>
        </NavLink>

        {/* 
        <Nav icon={< LiaCertificateSolid />} name="Issue Certificates" /> */}
      </div>
      <ZidyiaLogo />
    </div>
  );
}

export default SideBarAdmin;
