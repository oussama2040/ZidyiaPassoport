import React from 'react';
import styles from './SideBar.module.css';

function Nav({ icon, name }) {
  const iconColor = "white";

  return (
    <div className={styles.NavMain}>
      {icon && React.cloneElement(icon, { size: 20, color: iconColor })}
      <h2 className={`ml-4 ${styles.NavTopicText}`}>{name}</h2>
    </div>
  );
}

export default Nav;
