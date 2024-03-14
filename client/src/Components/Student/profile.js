import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import styles from './profile.css';


const Profile = () => {

    return (
        <>
            <div >
                <div class="certificate-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <div className='addCert'>
                    <div className="containeradd">
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                        />

                        <label htmlFor="imageInput" className="ChooseCertificate">
                            
                        </label>

                        {/* <div className="cert">
                            <div className="img">
                                <img id="selectedImage" src={certificateImage} alt="" />
                            </div>
                        </div> */}
                      
                            <div className="cert">
                                <div className="img">
                                    <img id="selectedImage" alt="" />
                                </div>
                            </div>
                     
                    </div>

                    <br />
                    <div className="form-container">
                        <div className="field-container">
                            <label id="name">Certificate Name</label>
                            <input id="name" type="text" placeholder="Enter certificate name" />
                        </div>
                        <div className="field-container">
                            <label id="name">Certificate Institution</label>
                           

                        </div>
                        <div className="field-container">
                            <label htmlFor="name">Issue Date*</label>
                            <input id="date"  type="date" />
                        </div>
                        <div className="field-container">
                            <label htmlFor="name">Expiry Date*</label>
                            <input id="date"  type="date" />
                        </div>
                        <div className="button-container">
                        <button className="createBtn">
                            Create
                        </button>
                    </div>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default Profile;
