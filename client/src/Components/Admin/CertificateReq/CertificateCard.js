import React, { useState } from 'react';
import styles from './CertificateReq.module.css';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

const CertificateCard = ({ certificate }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);

  const handleCertificateClick = (cert) => {
    setSelectedCertificate(cert);
  };

  const handleRejectChange = (event) => {
    setRejectionReason('');
    setShowRejectionInput(event.target.value === 'reject');
  };

  const handleRejectionInputChange = (event) => {
    setRejectionReason(event.target.value);
  };

  const handleRespond = async () => {
    try {
      let requestData;
      if (showRejectionInput) {
        requestData = {
          status: 'rejected',
          rejection_section: rejectionReason
        };
      } else {
        requestData = {
          status: 'verified',
          rejection_section: ''
        };
      }

      console.log('Request Data:', requestData);
      console.log('certificate id:', selectedCertificate.certificate_id);

      // Update certificate status and rejection reason accordingly
      const response = await axios.put(`http://localhost:5000/admin/certificatesRequest/${selectedCertificate.certificate_id}`, requestData);

      console.log('Response Data:', response.data);

      setSelectedCertificate(null);
    } catch (error) {
      console.error('Error responding to certificate:', error);
      // Handle error
    }
  };

  return (
    <div className={`flex flex-wrap ${styles.CertificateCardFlex}`}>
      {certificate.map((cert, index) => (
        <div key={cert.certificate_id} className={`mb-4 w-full md:w-1/2 lg:w-1/4 ${index < 4 ? 'mr-4' : ''} ${styles.CertificateCard}`} onClick={() => handleCertificateClick(cert)}>
          <img className="w-full h-64 object-cover object-center" src={cert.CertificateFile} alt="Certificate" />
          <div className="p-4">
            <h2 className={styles.customizeFieldNametext}>{cert.first_name} {cert.last_name}</h2>
            <p className={styles.customizeFieldNametext}>Status: {cert.status}</p>
            <p className="text-sm text-gray-400">Created At: {new Date(cert.created_at).toDateString()}</p>
          </div>
        </div>
      ))}
      {selectedCertificate && (
        <div className={styles.Certificateoverlay} onClick={() => setSelectedCertificate(null)}>
          <div className={styles.CertificateoverlayContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closebtn} onClick={() => setSelectedCertificate(null)}><IoMdClose /></button>
            <img className={`w-full object-cover object-center ${styles.certificateOverlayImg}`} src={selectedCertificate.CertificateFile} alt="Certificate" />
            <div>
              <h2 className={styles.customizeFieldTopicName}>{selectedCertificate.first_name} {selectedCertificate.last_name}</h2>
              <h2 className={styles.customizeFieldTopicName}>{selectedCertificate.name}</h2>
              <div className={styles.certificateflexDetails}>
                <p className={`${styles.customizeFieldNametextOverlay} flex`}>Issued on:<div className="text-sm text-gray-400 ml-2">{new Date(selectedCertificate.issued_date).toDateString()}</div></p>
                <p className={`${styles.customizeFieldNametextOverlay} flex`}>Expires on: <div className="text-sm text-gray-400 ml-2">{new Date(selectedCertificate.expiry_date).toDateString()}</div></p>
              </div>
              <div className={styles.certificateflexDetails}>
                <p className={`${styles.customizeFieldNametextOverlay} flex`}>Body:<div className="text-sm text-gray-400 ml-2"> {selectedCertificate.body} </div></p>
                <p className={`${styles.customizeFieldNametextOverlay} flex`}>Created At:<div className="text-sm text-gray-400 ml-2"> {new Date(selectedCertificate.created_at).toDateString()}</div></p>
              </div>
              <div className={styles.rejectReason}>
                <label>
                  Reject:
                  <input type="radio" value="reject" name="rejectionReason" onChange={handleRejectChange} />
                </label>
                <label>
                  Verify:
                  <input type="radio" value="verify" name="rejectionReason" onChange={handleRejectChange} />
                </label>
                {showRejectionInput && (
                  <label >
                   <div >Rejection Reason:</div> 
                    <input type="text" value={rejectionReason} onChange={handleRejectionInputChange} />
                  </label>
                )}
              </div>
              <button className={styles.ReasonBtn} type="button" onClick={handleRespond}>Respond</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
