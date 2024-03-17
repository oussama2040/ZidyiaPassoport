import React from 'react'
import styles from './NavBarAdmin.module.css'
function NavBarSupperAdmin() {
    return (
        <div className={styles.NavBarAdminMain}>
          <span className={styles.NavBarAdminDashborad}>
          SupperAdmin Panel
          </span>
    
          <button className={styles.NavBarAdminLogout}>
          Logout
        </button>
        </div>
      )
}

export default NavBarSupperAdmin
