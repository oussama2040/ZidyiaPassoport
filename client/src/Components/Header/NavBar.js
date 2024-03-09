import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Cookies from 'js-cookie'; // Import Cookies library

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if access token and refresh token cookies are present
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');

        // Update isLoggedIn state based on the presence of cookies
        setIsLoggedIn(accessToken && refreshToken);
    },[Cookies.get('accessToken')]);

    const location = useLocation();
    const activePath = location.pathname;

    const [isNavBarExtended, setNavBarExtended] = useState(false);

    const toggleNavBar = () => {
        setNavBarExtended(!isNavBarExtended);
    };

    const closeNavBar = () => {
        setNavBarExtended(false);
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear the access token and refresh token cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user_id');
        Cookies.remove('first_name');
        Cookies.remove('role');

        // Update isLoggedIn state to false
        setIsLoggedIn(false);

        // Redirect to the home page
        navigate('/');
    };

    return (
        <>
            <nav className={`bg-white-800 p-4 nav-bar ${isNavBarExtended ? styles.extended : styles.navBar}`}>
                <div className="container mx-auto">
                    <ul className="flex space-x-4">
                        <Link to="/" className={`${styles.item} ${activePath === "/" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Home</li></Link>
                        <Link to="/about" className={`${styles.item} ${activePath === "/about" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>About</li></Link>
                        <Link to="/contact" className={`${styles.item} ${activePath === "/contact" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Contact</li></Link>
                        {isLoggedIn ? (
                            <li className={styles.item} onClick={handleLogout}>
                                <Link to="/">Logout</Link>
                            </li>
                        ) : (
                            <Link to="/login" className={`${styles.item} ${activePath === "/login" ? styles.activeTab : ""}`} onClick={closeNavBar}>
                                <li>Login</li>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
            <GiHamburgerMenu className={styles.hamburger} onClick={toggleNavBar} />
        </>
    );
}

export default NavBar;
