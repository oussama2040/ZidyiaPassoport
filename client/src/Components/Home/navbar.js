import React, { useState } from 'react';
import Styles from './navbar.module.css';
import Logo from './../Assets/logo.png';



const Navbar = () => {
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const toggleDropdown = () => {setIsDropdownActive(!isDropdownActive);
      };
  return (
    <div>
        <div className={Styles.navbarContainer}>
            <div className={Styles.navbarLogo}>
                <img src={Logo} alt='logo'/>

            </div>
            <div className={Styles.navbarElements}>
            <ul className={Styles.navList}>
            <li><a href="#">Home</a></li>
            {/* <li><a href="#">Contact</a></li> */}
            <li className={Styles.dropdownParent} onClick={toggleDropdown}>
            <a href="#">Login</a>          
            <ul className={`${Styles.dropdown} ${isDropdownActive ? Styles.active : ''}`}>
              <li><a href="/student/login">Student</a></li>
              <li><a href="/tenent/login">Tenent</a></li>
              <li><a href="subscriber/login">Subscriber</a></li>
            </ul>
          </li>
            </ul>
             
            </div>
            
        </div>
      
    </div>
  )
}

export default Navbar
