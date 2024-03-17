import React, { useState } from 'react';
import Styles from './whyzidyia.module.css';
import RequestSubscriptionComponent from '../Home/RequestSubscriptionComponent.js'
import { GrSecure } from "react-icons/gr";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

const Whyzidyia = () => {
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };
  const handleCancelClick = () => {
    setShowSubscription(false);
  };

  return (
    <div className={Styles.whyzidyiacontainer}>
      <div className={Styles.whyzidyiatext}> Why Choose<span className={Styles.greenpart}> Zidyia Passport </span>?</div>
      <div className={Styles.Cardcontainer}>

        <div className={Styles.card}>
          <div className={Styles.icon}><GrSecure /></div>
          <div className={Styles.txt}>Secure & Transparent <hr className={Styles.hrr} /></div>

        </div>

        <div className={Styles.card}>
          <div className={Styles.icon}><MdOutlineVerified /></div>
          <div className={Styles.txt}>Trusted Verification <hr className={Styles.hrr} /></div>
        </div>
        <div className={Styles.card}><div className={Styles.icon}><MdOutlineManageAccounts /></div>
          <div className={Styles.txt}>Credential Management<hr className={Styles.hrr} /></div></div>

      </div>
      <div className={Styles.Joinzidyia}>
        <p className={Styles.joinpara}>Join Zidyia Passport today and embark on a journey towards streamlined credential management and verification. Whether you're a student, institution, or employer, our platform caters to your unique needs and empowers you to succeed in a rapidly evolving digital landscape.</p>
        <button className={Styles.subbtn} onClick={handleSubscribeClick}>Subscribe</button>
      </div>
      {showSubscription && <RequestSubscriptionComponent handleCancelClick={handleCancelClick} />}
    </div>
  )
}

export default Whyzidyia
