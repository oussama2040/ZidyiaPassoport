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
                const studentId = 3;
                const response = await axios.get(`http://localhost:5000/students/certificates/verified/${studentId}`);
                setCertificates(response.data.certificates.map(formatCertificateDate)); 
                console.log(response.data.certificates);
            } catch (error) {
                console.error('Error fetching certificates:', error);
               
            }
        };

        fetchCertificates(); 
    }, []); 

    const formatCertificateDate = (certificate) => {
        const issuedDate = new Date(certificate.issued_date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = issuedDate.toLocaleDateString('en-US', options);
        const day = issuedDate.getDate();
        const suffix = getDaySuffix(day);
        certificate.formatted_issued_date = `Issued On: ${dateString.replace(/\d+(st|nd|rd|th)/, `$&${suffix}`)}`;
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
                return [...certificates].sort((a, b) => new Date(a.issued_date) - new Date(b.issued_date));
            case 'expiry-date':
                return [...certificates].sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
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
                <div class="certificate-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <div class="containerBtn">
                    <button class="btnRequestCertificates">Requests</button>
                    <button class="btn-certificates">Certificates</button>

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
                                        <p className='issueDate'>{certificate.formatted_issued_date}</p> {/* Use formatted date */}
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
        const certificateName = certificate.name; // Assuming you have a name property in your certificate object

        const shareContent = {
            content: {
                "contentEntities": [
                    {
                        "entityLocation": certificateImageSrc,
                        "thumbnails": [
                            {
                                "resolvedUrl": certificateImageSrc
                            }
                        ]
                    }
                ],
                "title": "Check out my certificate: " + certificateName,
                "shareMediaCategory": "IMAGE"
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        };

        try {
            const response = await fetch('https://api.linkedin.com/v2/shares', {
                method: 'POST',
                // headers: {
                //     'Authorization': `Bearer ${accessToken}`,
                //     'Content-Type': 'application/json',
                //     'x-li-format': 'json'
                // },
                body: JSON.stringify(shareContent)
            });

            if (response.ok) {
                console.log('Successfully shared on LinkedIn');
                // Handle success, e.g., show a success message to the user
            } else {
                console.error('Failed to share on LinkedIn:', response.status);
                toast.error('Failed to share on LinkedIn. Please try again later.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // Adjust the auto-close time as needed
                });
            }
        } catch (error) {
            console.error('Error sharing on LinkedIn:', error);
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