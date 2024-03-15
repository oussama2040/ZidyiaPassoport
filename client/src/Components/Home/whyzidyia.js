import React from 'react';
import Styles from './whyzidyia.module.css';
import { GrSecure } from "react-icons/gr";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

const Whyzidyia = () => {
  return (
    <div className={Styles.whyzidyiacontainer}>
        <div className={Styles.whyzidyiatext}> Why Choose<span className={Styles.greenpart}> Zidyia Passport </span>?</div>
    <div className={Styles.Cardcontainer}>
        
        <div className={Styles.card}>
            <div className={Styles.icon}><GrSecure /></div>
            <div className={Styles.txt}>Secure & Transparent <hr className={Styles.hrr}/></div>
            
        </div>
        
        <div className={Styles.card}>
        <div className={Styles.icon}><MdOutlineVerified /></div>
            <div className={Styles.txt}>Trusted Verification <hr className={Styles.hrr}/></div>
        </div>
        <div className={Styles.card}><div className={Styles.icon}><MdOutlineManageAccounts /></div>
            <div className={Styles.txt}>Credential Management<hr className={Styles.hrr}/></div></div>
      
    </div>
    <div className={Styles.Joinzidyia}>
      <p className={Styles.joinpara}>Join Zidyia Passport today and embark on a journey towards streamlined credential management and verification. Whether you're a student, institution, or employer, our platform caters to your unique needs and empowers you to succeed in a rapidly evolving digital landscape.</p>
      <input type='email' placeholder='enter your email' className={Styles.inputsub}></input>
      <button className={Styles.subbtn}>Subscribe</button>
    </div>
    </div>
  )
}

export default Whyzidyia
