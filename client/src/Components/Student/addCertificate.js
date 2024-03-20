import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import styles from './addCert.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Certificate = () => {
    const [organizations, setOrganizations] = useState([]);
    const [certificateName, setCertificateName] = useState('');
    const [institution, setInstitution] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [body, setBody] = useState('');

    const [certificateImage, setCertificateImage] = useState(null);
    const [transcriptImage, setTranscriptImage] = useState(null);


    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const response = await fetch('http://localhost:5000/tenent/Allorganization');
            if (response.ok) {
                const data = await response.json();
                setOrganizations(data);
            } else {
                console.error('Failed to fetch organizations');
            }
        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
        
    //     reader.onloadend = () => {
    //       setCertificateImage(reader.result);
    //     };
        
    //     if (file) {
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const handleCreateCertificate = async (event) => {
        event.preventDefault();
        try {
            const student_id = 3;
            const formData = new FormData();
            formData.append('student_id', student_id); 
            formData.append('name', certificateName);
            formData.append('organization_id', institution);
            
            console.log('institution:', institution);
            
            formData.append('issued_date', issueDate);
            formData.append('expiry_date', expiryDate);
            formData.append('body', body);

            console.log('CertificateFile:', certificateImage);
            formData.append('CertificateFile', certificateImage); 
            formData.append('TranscriptFile', transcriptImage); 

            const response = await axios.post('http://localhost:5000/students/addRequest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Certificate created:', response.data);
            toast.success('Certificate created.');
        } catch (error) {
            console.error('Error creating certificate:', error);
            toast.error('Error creating certificate. Please try again later.');
        }
    };
    return (
        <>
            <div >
                <div class="certificate-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>Add Certificate</span>
                </div>
                <form className='addCert'>
                    <div className='Twofiles'>
                    <div className="containeradd">
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={(e) => setCertificateImage(e.target.files[0])} 
                        />
                        <label htmlFor="imageInput" className="ChooseCertificate">
                            Add Your Certificate
                        </label>
                        {certificateImage && (
                            <div className="cert">
                                <div className="img">
                                    <img id="selectedImage" src={URL.createObjectURL(certificateImage)} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                     {/* Transcript image upload */}
                     <div className="containeradd">
                        <input
                            type="file"
                            id="transcriptInput"
                            accept="image/*"
                            onChange={(e) => setTranscriptImage(e.target.files[0])}
                        />
                        {/* Transcript image label */}
                        <label htmlFor="transcriptInput" className="ChooseCertificate">
                            Add Your Transcript*
                        </label>
                        {/* Render transcript image */}
                        {transcriptImage && (
                            <div className="certT">
                                <div className="imgT">
                                    <img id="transcriptImage" src={URL.createObjectURL(transcriptImage)} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                    <div className="form-container">
                        <div className="AddCertContainer">
                            <label id="name">Certificate Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter certificate name"
                                value={certificateName}
                                onChange={(e) => setCertificateName(e.target.value)}
                            />
                        </div>
                        <div className="AddCertContainer">
                            <label id="name">Certificate Institution</label>

                            <select
                                id="organization"
                                className="selectOrganization"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                            >
                                <option value="" disabled>Select Certificate</option>
                                {organizations.map(org => (
                                    <option key={org.id} value={org.id}>{org.name}</option> 
                                ))}
                            </select>

                        </div>
                        <div className="AddCertContainer">
                            <label htmlFor="name">Issue Date*</label>
                            <input
                                id="issueDate"
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                            />
                        </div>
                        <div className="AddCertContainer">
                            <label htmlFor="name">Expiry Date*</label>
                             <input
                                id="expiryDate"
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>
                        <div className="AddCertContainer">
                            <label htmlFor="name">Certificate Body*</label>
                            <input
                                id="body"
                                className='bodyCert'
                                type="text"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </div>
                        <div className="AddCertContainer">
                            
                        </div>
                        
                        <div className="button-container">
                            <button onClick={(e) => handleCreateCertificate(e)} className="createBtn">
                                Create
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default Certificate;
