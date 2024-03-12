import React from 'react';
import styles from './SideBar.module.css';
import Logo from './Logo';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { GrAnalytics } from "react-icons/gr";
import { BiCustomize } from "react-icons/bi";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { TbFileCertificate } from "react-icons/tb";
import { LiaCertificateSolid } from "react-icons/lia";
import ZidyiaLogo from './ZidyiaLogo';



function SideBarAdmin() {
  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />

        <Link to="/admin/analytics">
          <Nav icon={<GrAnalytics />} name="Analytics" />
        </Link>
        <Link to ="/admin/customize">
        <Nav icon={< BiCustomize  />} name="Field Customize" />
        </Link>
        <Link to ="/admin/reqcustomize">
        <Nav icon={< BiCustomize  />} name="Request Customize" />
        </Link>
        <Nav icon={< IoGitPullRequestSharp  />} name="Certificate Request" />
        <Nav icon={< TbFileCertificate  />} name="Certificate Uploaded" />
        <Nav icon={< LiaCertificateSolid  />} name="Issue Certificates" />

        <ZidyiaLogo />

        
      </div>
    </div>
  );
}

export default SideBarAdmin;
