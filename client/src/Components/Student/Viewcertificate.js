import React, { useState, useEffect } from 'react';
    import axios from 'axios';
import styles from './Viewcertificate.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaShareAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Certificates = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [studentId, setTenentId] = useState(null);

    const toggleModal = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Fetch verified certificates for a specific student
        const fetchCertificates = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/student/verifiedCertificate`, {
                    withCredentials: true
                });
                setCertificates(response.data.certificates.map(formatCertificateDate));
                console.log(response.data.certificates);
                console.log()
            } catch (error) {
                console.error('Error fetching certificates:', error);

            }
        };

        fetchCertificates();
    }, []);

    const formatCertificateDate = (certificate) => {
        if (!certificate.verification_date) {
            return certificate;
        }
        const issuedDate = new Date(certificate.verification_date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = issuedDate.toLocaleDateString('en-US', options);
        const day = issuedDate.getDate();
        const suffix = getDaySuffix(day);
        certificate.formatted_issued_date = `Issued On: ${dateString.replace(/\d+(st|nd|rd|th)/, `$&${suffix}`)}`;


        // Format expiry date if it exists
        if (certificate.expiry) {
            const expiryDate = new Date(certificate.expiry);
            certificate.formatted_expiry_date = `Expiry Date: ${expiryDate.toLocaleDateString('en-US', options)}`;
        }
        return certificate;
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const sortCertificates = () => {
        switch (sortCriteria) {
            case 'issued-date':
                return [...certificates].sort((a, b) => new Date(a.verification_date) - new Date(b.verification_date));
            case 'expiry-date':
                return [...certificates].sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
            default:
                return certificates;
        }
    };


    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };
    return (
        <>
            <div>
                <div class="certificate-title1">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <div class="containerBtn">
                    {/* <button class="btnRequestCertificates">Requests</button> */}
                    <Link to="/student/requestCertificate" class="btnRequestCertificates">Requests</Link>
                    <Link class="btn-certificates">Certificates</Link>
                    <div class="sorting-dropdown">
                        <select value={sortCriteria} onChange={handleSortChange}>
                            <option value="" disabled selected>Sorting</option>

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
                        {sortCertificates().map(certificate => (
                            <div key={certificate.certificate_id} className="profile-card js-profile-card" onClick={() => toggleModal(certificate)}>
                                <div class="profile-card__img">
                                    <img src="https://res.cloudinary.com/daa9irzfz/image/upload/v1710177429/badge3_ed8zsi.png" />
                                </div>
                                <div class="profile-card__cnt js-profile-cnt">
                                    <div class="card_image">
                                        <img src={certificate.CertificateFile} />
                                    </div>
                                    <div class="card_content">
                                        <p className='issueBy'>Issued by: <span className='esa'>{certificate.organization_name}</span> </p>
                                        <p className='issueDate'>{certificate.formatted_issued_date}</p>    
                                        {certificate.formatted_expiry_date && <p className='expiry'>{certificate.formatted_expiry_date}</p>}
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
    const handleLinkedInShare = async () => {
        const certificateImageSrc = certificate.CertificateFile;
        const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateImageSrc)}`;
        try {
            window.open(linkedinShareUrl, '_blank');
        } catch (error) {
            console.error('Error sharing on LinkedIn:', error);
            toast.error('Error sharing on LinkedIn. Please try again later.');
        }
    };

    const handleDownload = async () => {
        const certificateImageSrc = certificate.CertificateFile;
        try {
            const response = await fetch(certificateImageSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificate_image.png');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading certificate image:', error);
        }
    };

    return (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
            <div className="modal-content">
                {certificate && (
                    <>
                        <div class="closeBtn"><button class="btnClose" onClick={closeModal}><IoMdClose /></button></div>
                        <div className="certShare">
                            <p>Certificate</p>
                            {/* <p>{certificate.expiry_date} </p> */}
                            <div className="share-download-options">
                                <p className="shareLinkedin" onClick={handleLinkedInShare}><FaShareAlt /> &nbsp;Share On LinkedIn</p>
                                <p className="download" onClick={handleDownload}><FaDownload /> &nbsp;Download</p>
                            </div>
                        </div>
                        <img src={certificate.CertificateFile} class="imgselected" alt="certificate File" />
                    </>
                )}
            </div>
        </div>
    );
};


export default Certificates
