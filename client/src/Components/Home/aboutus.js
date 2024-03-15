import React from 'react';
import Styles from './aboutus.module.css' ;

const Aboutus = () => {
  return (
    <div className={Styles.aboutuscontainer}>
        <div className={Styles.aboutustitle}> <p>About <span className={Styles.greenpart}> Zidyia Passport </span></p></div>
        <div className={Styles.aboutuspara}>Zidyia Passport is a revolutionary platform designed to empower students, educational institutions, and employers in managing academic credentials efficiently. Our platform leverages cutting-edge blockchain technology to ensure the authenticity and integrity of certificates and transcripts, providing a trusted ecosystem for all stakeholders.</div>
      
    </div>
  )
}

export default Aboutus;
