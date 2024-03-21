import React from 'react'
import ZidyiaPassportLogo from './../Assets/Zidyia_Logo.png'
import styles from './SideBar.module.css';

function ZidyiaLogo() {
  return (
    <div className={styles.ZidyiaPassportLogo}>
      <img src={ZidyiaPassportLogo} alt="Zidyia Logo" />
    </div>
  )
}

export default ZidyiaLogo
