import React from 'react';
import Styles from './features.module.css';
import design from './../Assets/design.png';
import boy from './../Assets/boy.png';

const Features = () => {
  return (
    <div className={Styles.featurescontainer}>
        {/* <div className={Styles.designContainer}>
             <img src={design} className={Styles.rotatedImage} alt="Design" />
          </div> */}
          <div className={Styles.featurestitle}> <p><span className={Styles.greenpart}> Zidyia Passport </span> Features</p></div>
          <div className={Styles.blocks}>
            <div className={Styles.firstfeature}>
                <div className={Styles.featuretext}>
                <p className={Styles.featuretitle}>Student Registration</p>
                <p className={Styles.featurepara}> Register effortlessly on Zidyia Passport and unlock a world of opportunities to manage and showcase your academic achievements.</p>
                </div>
                <div className={Styles.featurepic}><img src={boy} alt=''/></div>
            </div>
            <div className={Styles.secondfeature}>
            <div className={Styles.featurepic}><img src={boy} alt=''/></div>
            
                <div className={Styles.featuretext}>
                <p className={Styles.featuretitle}>Academic Transcript Sharing</p>
                <p className={Styles.featurepara}> Initiate the process of sharing your academic transcript with educational institutions or employers seamlessly.</p>
                </div>
               
            </div>
            
            
            <div className={Styles.firstfeature}>
                <div className={Styles.featuretext}>
                <p className={Styles.featuretitle}>Certificate Verification</p>
                <p className={Styles.featurepara}>Utilize our robust verification system powered by blockchain technology to authenticate and validate certificates securely.</p>
                </div>
                <div className={Styles.featurepic}><img src={boy} alt=''/></div>
            </div>
            
          </div>
      
    </div>
  )
}

export default Features
