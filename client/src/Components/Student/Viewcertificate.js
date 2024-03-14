import React, { useState } from 'react';
import styles from './Viewcertificate.css';
import { IoIosArrowBack } from "react-icons/io";
import { certificate as certificateData } from './data';
import { Link } from 'react-router-dom';
import { FaShareAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Certificates = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const toggleModal = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div>
                <div class="certificate-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <div class="container">
                    <button class="btn-certificates">Certificates</button>
                    <div class="sorting-dropdown">
                        <select>
                            <option value="" disabled selected>Sorting</option>
                            <option value="name">Name</option>
                            <option value="issued-by">Issued by (A-Z)</option>
                            <option value="issued-date">Issued date (ascending)</option>
                            <option value="expiry-date">Expiry date (ascending)</option>
                        </select>
                    </div>
                    <button className="btn-add-certificate">
                        <Link to="/student/addCertificate">Add Certificate</Link>
                    </button>
                </div>

                <div class="wrapper">
                    <div className='Line'>
                        {certificateData.map((certificate, index) => (
                            // <div key={certificate.id} class="profile-card js-profile-card">
                            <div key={certificate.id} className="profile-card js-profile-card" onClick={() => toggleModal(certificate)}>
                                <div class="profile-card__img">
                                    <img src="https://res.cloudinary.com/daa9irzfz/image/upload/v1710177429/badge3_ed8zsi.png" />
                                </div>
                                <div class="profile-card__cnt js-profile-cnt">
                                    <div class="card_image">
                                        <img src={certificate.CertficateFile} alt={`Certificate ${index}`} />
                                    </div>
                                    <div class="card_content">
                                        <p className='issueBy'>Issued by: <span className='esa'>{certificate.issedBy}</span> </p>
                                        <p className='issueDate'>Issued on:<span className='esaDate'>{certificate.issuedOn}</span> </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
            <CertificateModal certificate={selectedCertificate} isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
};

const CertificateModal = ({ certificate, isModalOpen, closeModal }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = certificate.CertficateFile;
        link.target = '_blank';  // Open the link in a new tab/window to trigger the download
        link.download = `Certificate_${certificate.id}.png`; // Customize the filename if needed
        link.click();
    };
    return (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
            <div className="modal-content">
                {certificate && (
                    <>
                        <div class="closeBtn"><button class="btnClose" onClick={closeModal}><IoMdClose /></button></div>
                        <div className="certShare">
                            <p>Certificate</p>
                            <div className="share-download-options">
                                <p className="shareLinkedin"><FaShareAlt /> Share On Linkedin</p>
                                <p className="download" onClick={handleDownload}><FaDownload /> Download</p>                            </div>
                        </div>
                        <img src={certificate.CertficateFile} alt="certificate File"/>

                    </>
                )}
            </div>
        </div>
    );
};


export default Certificates
