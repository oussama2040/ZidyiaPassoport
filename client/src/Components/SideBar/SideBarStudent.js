import React from 'react';
import styles from './SideBar.module.css';
import Logo from './Logo';
import Nav from './Nav';
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBook } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { MdOutlineContactSupport } from "react-icons/md";

import ZidyiaLogo from './ZidyiaLogo.js';


function SideBarStudent() {
  return (
    <div>
      <div className={styles.SideBarMain}>
        <Logo />

        <Nav icon={< IoHomeOutline  />} name="Home" />
        <Nav icon={< MdOutlineBook  />} name="CertPass" />
        <Nav icon={< MdVerified  />} name="Verify & Mint" />
        <Nav icon={< CgTranscript  />} name="Academic Transcript" />
        <Nav icon={< MdOutlineContactSupport  />} name="Get Support" />

        <ZidyiaLogo />

        
      </div>
    </div>
  );
}

export default SideBarStudent;
