import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import styles from './addCert.css';


const Certificate = () => {
    const [certificateImage, setCertificateImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setCertificateImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleCreateCertificate = () => {
        // Add logic to create the certificate
        console.log('Certificate created!');
    };
    return (
        <>
            <div >
                <div class="certificate-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>Add Certificate</span>
                </div>
                <div className='addCert'>
                    <div className="containeradd">
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <label htmlFor="imageInput" className="ChooseCertificate">
                            Add Your Certificate
                        </label>

                        {/* <div className="cert">
                            <div className="img">
                                <img id="selectedImage" src={certificateImage} alt="" />
                            </div>
                        </div> */}
                        {certificateImage && (
                            <div className="cert">
                                <div className="img">
                                    <img id="selectedImage" src={certificateImage} alt="" />
                                </div>
                            </div>
                        )}
                    </div>

                    <br />
                    <div className="form-container">
                        <div className="field-container">
                            <label id="name">Certificate Name</label>
                            <input id="name" type="text" placeholder="Enter certificate name" />
                        </div>
                        <div className="field-container">
                            <label id="name">Certificate Institution</label>
                            <select className="search">
                                <option value="" disabled selected>Select Certificate</option>
                                <option value="" >ESA</option>
                            </select>

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
                        <button onClick={handleCreateCertificate} className="createBtn">
                            Create
                        </button>
                    </div>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default Certificate;
