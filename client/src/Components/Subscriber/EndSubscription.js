import React, { useState } from 'react';
import Styles from '../Home/whyzidyia.module.css';
import RequestSubscriptionComponent from '../Home/RequestSubscriptionComponent.js'
import { GrSecure } from "react-icons/gr";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

const Endsubscription = () => {
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };
  const handleCancelClick = () => {
    setShowSubscription(false);
  };

  return (
    <div className={Styles.whyzidyiacontainer}>
  
  
      <div className={Styles.Joinzidyia}>
        <p className={Styles.joinpara}>Your Subscription has Ended Please submit your info to subscribe again</p>
        <button className={Styles.subbtn} onClick={handleSubscribeClick}>Subscribe</button>
      </div>
      {showSubscription && <RequestSubscriptionComponent handleCancelClick={handleCancelClick} />}
    </div>
  )
}

export default Endsubscription
