import React from 'react'
import styles from './Footer.module.css';
import { CiFacebook,CiTwitter,CiInstagram,CiLinkedin } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Qrcode from './../Assets/Qrcode.png'
import googleplay from './../Assets/googleplay.png'
import appstore from './../Assets/appstore.png'





const Footer = () => {
  return (
    <>
   
    <div>
        <div className={styles.Footer}>
            <div className={styles.Exclusive}>
               <h3>Exclusive</h3>
               <p>Subscribe</p>
               <p>Get 10% off your first order</p>
               <input type='email' name='email' id='email' placeholder='enter your email'/>

            </div>

            <div className={styles.Support}>
                <h3>Support</h3>
                <p>Hamra,beirut,Lebanon</p>
                <p><a href=''>Ecommerce@gmail.com</a></p>
                <p>+961-88888-99999</p>


            </div>    

            <div className={styles.Account}>
                <h3>Account</h3>
                <p><Link to="/about">About Us</Link></p>
                <p><Link to="/login">Login</Link>/<Link to="/register">Register</Link></p>
                <p><Link to="/cart">Cart</Link></p>
                <p><Link to="/wishlist">Wishlist</Link></p>

            
            </div>  

            <div className={styles.Quicklist}>
                <h3>QuickLink</h3>
                <p>Privacy Policy</p>
                <p>Terms of use</p>
                <p>FAQ</p>
                <p>Contact</p>
            
            </div>  


            <div className={styles.DoumloadApp}>
                <h3>Download App</h3>
                <h1 className={styles.smallfont}>Save $3 with App New User Only</h1>
                <div className={styles.maindiv}>
                    <div className='divone'>
                <img  className={styles.Qrcode} id="Qrcode" src={Qrcode} alt="Qrcode" />
                </div>
                <div className={styles.divtwo}>
                <img  className={styles.googleplay} id="Qrcode" src={appstore} alt="appstore" />
                <img  className={styles.googleplay} id="Qrcode" src={googleplay} alt="googleplay" />

                </div>
                </div>
                <div className={styles.socialmedia}>
                <a href="#"><CiFacebook /></a>
                <a href="#"><CiInstagram /></a>
                <a href="#"><CiTwitter /></a>
                <a href="#"><CiLinkedin /></a>
                
                </div>
        
            </div>   
            
        </div>
    <div className={styles.copyright}>
    <hr className={styles.hrline}/>
    <h1>Copyright 2024. All right reserved</h1>
    </div>
    </div>
    
    </>
    
  )
}

export default Footer
