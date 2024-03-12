import React from 'react'
import ZidyiaPassportLogo from './../Assets/logo.png'
import styles from './SideBar.module.css';

function ZidyiaLogo() {
  return (
    <div className={styles.ZidyiaPassportLogo}>
      <img src={ZidyiaPassportLogo} alt="Zidyia Logo" ></img>
    </div>
  )
}

export default ZidyiaLogo
