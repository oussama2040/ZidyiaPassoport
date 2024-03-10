import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div>
            <Link to="/" className={styles.logo} >Ecommrece</Link>
        </div>
    )
}

export default Logo