import React from 'react';
import Styles from './coverphoto.module.css';
import certificate from './../Assets/certificate.png';
import design from './../Assets/design.png';

const Coverphoto = () => {
  return (
    <div>
        <div className={Styles.coverContainer}>
        <div className={Styles.designContainer}>
             <img src={design} className={Styles.rotatedImage} alt="Design" />
          </div>
          <div className={Styles.covercaption}>
          
            <h2 className={Styles.captiontitle}>Welcome to <span className={Styles.greenpart}>Zidyia Passport</span> </h2>
            <p className={Styles.captionheader}>Your Digital Credential Hub for Verified Certificates</p>
            <p className={Styles.captionpara}>Our platform provides a secure and efficient solution for creating, verifying, and sharing digital certificates.</p>
          </div>
          <div className={Styles.coverpic}>
            <div className={Styles.firstcertificate}>
              <div className={Styles.certimage}>
              <img src={certificate}/>
              </div>
              
              
            </div>
            <div className={Styles.secondcertificate}>
            <div className={Styles.certimage}>
              <img src={certificate}/>
              </div>
            
            </div>
            <div className={Styles.notes}>
              <ol><li className={Styles.items}> &#10003; Create your Digital Certificate </li>
                  <li className={Styles.items}> &#10003; Use Verification platform</li></ol>
            </div>
          </div>
            
        </div>
      
    </div>
  )
}

export default Coverphoto
