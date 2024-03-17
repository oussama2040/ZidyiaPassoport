import React from 'react'

import styles from './NavBarAdmin.module.css'
function navbarAdmin() {
  return (
    <div className={styles.NavBarAdminMain}>
      <span className={styles.NavBarAdminDashborad}>
      Admin Panel
      </span>

      <button className={styles.NavBarAdminLogout}>
      Logout
    </button>
    </div>
  )
}

export default navbarAdmin
