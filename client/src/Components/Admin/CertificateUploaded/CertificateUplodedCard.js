import React, { useState } from 'react';
import styles from './CertificateUploaded.module.css';
import { IoMdClose } from 'react-icons/io';
import { LiaCertificateSolid } from "react-icons/lia";

function CertificateUplodedCard({ certificate }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const handleCertificateClick = (cert) => {
        setSelectedCertificate(cert);
        console.log("cert",cert)
    };

    return (
        <div className={`flex flex-wrap ${styles.CertificateCardFlex}`}>
            {certificate.map((cert, index) => (
                <div key={cert.verification_id} className={`mb-4 w-full md:w-1/2 lg:w-1/4 ${index < 4 ? 'mr-4' : ''} ${styles.CertificateCard}`} onClick={() => handleCertificateClick(cert)}>
                    <LiaCertificateSolid className={styles.certificateIcon} />
                    <img className={`w-full h-64 object-cover object-center ${styles.certificateUplodedimages}`} src={cert.certificate_url} alt="Certificate" />
                    <div className="p-4">
                        <h2 className={styles.customizeFieldNameTOPIC}>{cert.first_name} {cert.last_name}</h2>
                        <p className={`text-sm text-gray-400 flex ${styles.responsiveText}`} >mobile: <div className={styles.customizeFieldNametext}>{cert.mobile}</div></p>
                        <p className={`text-sm text-gray-400 flex ${styles.responsiveText}`}>location: <div className={styles.customizeFieldNametext}>{cert.location}</div></p>
                        <p className={`text-sm text-gray-400 flex ${styles.responsiveText}`}>email: <div className={styles.customizeemail}>{cert.email}</div></p>
                    </div>
                </div>
            ))}

{selectedCertificate && (
        <div className={styles.Certificateoverlay} onClick={() => setSelectedCertificate(null)}>
          <div className={styles.CertificateoverlayContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closebtn} onClick={() => setSelectedCertificate(null)}><IoMdClose /></button>
            <img className={` ${styles.certificateOverlayImg}`} src={selectedCertificate.certificate_url} alt="Certificate" />
          </div>
        </div>
      )}

        </div>
    );
};

export default CertificateUplodedCard;
