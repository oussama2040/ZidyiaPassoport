import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './requestCertificate.css';
import { IoIosArrowBack } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortingOption, setSortingOption] = useState('');

    useEffect(() => {
        // Fetch All certificates for a specific student
        const fetchAllCertificates = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/student/RequestCertificate`, {
                    withCredentials: true
                });
                const formattedCertificates = response.data.certificates.map(formatCertificateDate);
                const sortedCertificates = sortCertificates(formattedCertificates, sortingOption);
                setCertificates(sortedCertificates);
                console.log(response.data.certificates);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            }
        };
        fetchAllCertificates();
    }, [sortingOption]);
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

    const sortCertificates = (certificates, sortingOption) => {
        switch (sortingOption) {
            case 'pending':
                return certificates.filter(certificate => certificate.status === 'pending');
            case 'verified':
                return certificates.filter(certificate => certificate.status === 'verified');
            case 'rejected':
                return certificates.filter(certificate => certificate.status === 'rejected');
            default:
                return certificates;
        }
    };

    const handleSortingChange = (event) => {
        setSortingOption(event.target.value);
    };

    const verifyFct = (certificate) => {
        window.location.href = `/student/customize/${certificate.organization_id}`;
    };

    const CertificateCard = ({ certificate }) => (
        <div className="CertificateCard">
            <span className={`tag tag-${certificate.status === 'verified' ? 'Green' : certificate.status === 'pending' ? 'Yellow' : 'Red'}`}>
                {certificate.status}
            </span>
            <div className="CertHeader">
                <img src={certificate.CertificateFile} className="CertImage" alt="Certificate" />
            </div>
            <div className="CertInfo">
                <h4>{certificate.name} </h4>
                <p>{certificate.formatted_issued_date}</p>
                {/* <p>{certificate.organization_id}</p> */}
                <p>Issued by: {certificate.organization_name}</p>
            </div>

            {certificate.status === 'verified' && (
                // <Link to="/student/customize">
                //     <button onClick={verifyFct} className='btnVerify'>Verify</button>
                // </Link>
                <button onClick={() => verifyFct(certificate)} className='btnVerify'>Verified</button>
            )}
        </div>
    );

    const CertificatesContainer1 = ({ certificates }) => (
        <div className="cardsContainer">
            <div className='LineCerti'>
                {certificates.map(certificate => (
                    <CertificateCard key={certificate.id} certificate={certificate} />
                ))}</div>
        </div >
    );
    const CertificatesContainer = ({ certificates }) => {
        const pageSize = 4;
        const pageCount = Math.ceil(certificates.length / pageSize);
        const startIndex = currentPage * pageSize;
        const endIndex = Math.min(startIndex + pageSize, certificates.length);
        const currentCertificates = certificates.slice(startIndex, endIndex);

        const handleNextPage = () => {
            setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
        };

        const handlePrevPage = () => {
            setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
        };

        return (
            <div className="cardsContainer">
                <div className='LineCerti'>
                    {currentCertificates.map(certificate => (
                        <CertificateCard key={certificate.id} certificate={certificate} />
                    ))}
                </div>
                <div className="pagination p1">
                    <ul>
                        <a href="#" onClick={handlePrevPage}><li><MdArrowBackIosNew /></li></a>
                        {Array.from(Array(pageCount).keys()).map(page => (
                            <a key={page} className={currentPage === page ? 'is-active' : ''} href="#" onClick={() => setCurrentPage(page)}><li>{page + 1}</li></a>
                        ))}
                        <a href="#" onClick={handleNextPage}><li><MdArrowForwardIos /></li></a>
                    </ul>
                </div>

            </div>
        );
    };
    return (
        <>
            <div>
                <div class="request-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <div class="containerRequest">
                    <button class="btnRequest">Requests</button>
                    <Link to="/student/viewCertificate" class="btnCertificates">Certificates</Link>
                    {/* <button class="">Certificates</button> */}

                    <div class="sortingBystatus">
                        <select onChange={handleSortingChange}>
                            <option value="" disabled selected>Sorting by Status</option>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                        </select>

                    </div>
                    <button className="btnADDcertificate">
                        <Link to="/student/addCertificate">Add Certificate</Link>
                    </button>
                </div>
                <CertificatesContainer certificates={certificates} /></div>
        </>
    );
};



export default Certificates
