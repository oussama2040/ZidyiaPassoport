import React, { useState } from 'react';
import styles from './NavBarAdmin.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function NavBarSupperAdmin() {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);
    Cookies.remove('SuperAdminaccessToken');
    Cookies.remove('SuperAdminrefreshToken');
    setTimeout(() => {
      navigate("/");
    }, 1000);

  };
  return (
    <div className={styles.NavBarAdminMain}>
      <span className={styles.NavBarAdminDashborad}>
        Super admin {loggingOut && <span style={{ fontSize: '0.5em' }}>Logging Out ...</span>}
      </span>

      <button className={styles.NavBarAdminLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBarSupperAdmin;
