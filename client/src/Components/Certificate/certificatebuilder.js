import React, { useState, useRef,useEffect } from 'react';
import html2canvas from 'html2canvas';
import './Certificate.css';
import axios from 'axios';

const Certificate = () => {
  // State variables to manage Tenent's Admin inputs
  const [outerBorderColor, setOuterBorderColor] = useState('#000000');
  const [innerBorderColor, setInnerBorderColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#5DD3B3'); // Set initial background color
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontColor, setFontColor] = useState('#000000');
  // const [logo, setLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [badgeImage, setBadgeImage] = useState(null);
  const [facultyName, setFacultyName] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [presidentName, setPresidentName] = useState('');
  const [deanName, setDeanName] = useState('');
 

  // ---------------------------------------------------------------------------------------------------------

  // Ref for the certificate container
  const certificateRef = useRef(null);

  // Function to handle screenshot capture
  const [organizationInfo, setOrganizationInfo] = useState(null);
  useEffect(() => {
   
    const fetchOrganizationInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tenent/organizationinfo');
            setOrganizationInfo(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching organization info:', error);
        }
    };

    fetchOrganizationInfo();
}, []);
console.log(organizationInfo)
// -----------------------------------------------------------------------------------
const [studentInfo, setstudentInfo] = useState(null);
  useEffect(() => {
   
    const fetchtudentInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/student/studentinfo');
            setstudentInfo(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching organization info:', error);
        }
    };

    fetchtudentInfo();
}, []);
console.log(studentInfo)
// ------------------------------------------------------------------------------------
const getCurrentDate = () => {
  // Create a new Date object
  const currentDate = new Date();

  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // January is 0, so we add 1
  const year = currentDate.getFullYear();

 
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
// ---------------------------------------------------------------------------------------
// Function to handle screenshot capture
const handleCapture = async () => {
    try {
        const canvas = await html2canvas(certificateRef.current);
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('certificateImage', blob, 'certificate.png');

            const response = await axios.post('http://localhost:5000/tenent/savecertificate', formData);
            console.log(response.data);
        }, 'image/png');
    } catch (error) {
        console.error('Error capturing and saving certificate:', error);
    }
};
// ----------------------------------------------------------------------------------
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // ------------------------------------------------------------------------------------------------------------------

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("starting date",startDate);
    console.log("ending date",endDate);
   
  };
// -----------------------------------------------------------------------------------------






  return (
    <div className="certificate-form">
      {/* Certificate Preview */}
      {/* Certificate layout with dynamic styles */}
      <div ref={certificateRef} className="pm-certificate-container" style={{ fontFamily, fontWeight, color: fontColor, backgroundColor }}>
        {<div className="outer-border" style={{ borderColor: outerBorderColor }}></div>}
        {<div className="inner-border" style={{ borderColor: innerBorderColor }}></div>}
        <div className="pm-certificate-border col-xs-12">
          <div className="row pm-certificate-header">
            <div className="pm-certificate-title col-xs-12 text-center">
              <div className="logo-container">
                <div className="row">
                  <div className="col-xs-4"></div>
                  <div className="col-xs-4 text-center">
                    {/* {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="logo" />} */}
                    {badgeImage && <img src={URL.createObjectURL(badgeImage)} alt="Badge" className="badge-image" />}
                  </div>
                  <div className="col-xs-4"></div>
                </div>
              </div>
              <h2 className="cursive">{organizationInfo && organizationInfo.name}</h2>
              <span className="pm-certificate-texts">Based on the University's Statute</span>
              <span className="pm-certificate-texts">Upon the Recommendation of the "{facultyName}"</span>
              <span className="pm-certificate-texts">The "{organizationInfo && organizationInfo.name}" has conferred upon</span>
            </div>
          </div>
          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              {/* Student Name */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-name margin-0 col-xs-8 text-center">
                    <span className="pm-name-text underline bold">{studentInfo && studentInfo.first_name}  {studentInfo && studentInfo.last_name}</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Student Birth Details */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-student-birth-details col-xs-8 text-center">
                    <span className="pm-birth-text block">Started on <span className="underline bold">{startDate}</span> till <span className="underline bold">{endDate}</span></span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Degree Information */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-degree-info col-xs-8 text-center">
                    The Degree of <span className="underline bold">{degree}</span> in <span className="underline bold">{major}</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Degree Information */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-degree-previleges col-xs-8 text-center">
                    <span className="">With all the honors, rights and privileges pertaining to the degree.</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row pm-certificate-footer">
                <div className="col-xs-4 pm-certified text-center">
                  <span className="pm-credits-text block sans underline">{organizationInfo && organizationInfo.location}</span>
                  <span className="bold block">President: {presidentName}</span>
                </div>
                <div className="col-xs-4">
                <div className="qr-code-container">
                 {qrCode && <img src={URL.createObjectURL(qrCode)} alt="QR Code" className="qr-code-image" />}
                </div>
                </div>
                <div className="col-xs-4 pm-certified text-center">
                  <span className="pm-credits-text block sans underline">On {getCurrentDate()} </span>
                  <span className="bold block">Dean: {deanName}</span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      
      {/* Certificate Editor Form */}
      <div className="certificate-editor">
        <h2>Certificate Editor</h2>
        <form onSubmit={handleSubmit}>
          {/* Form inputs for user customization */}
          <div className="form-input">
            <label>Outer Border Color:</label>
            <input type="color" value={outerBorderColor} onChange={(e) => setOuterBorderColor(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Inner Border Color:</label>
            <input type="color" value={innerBorderColor} onChange={(e) => setInnerBorderColor(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Background Color:</label>
            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Font Family:</label>
            <input type="text" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Font Weight:</label>
            <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>
          <div className="form-input">
            <label>Font Color:</label>
            <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Faculty Name:</label>
            <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Degree:</label>
            <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Major:</label>
            <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
          </div>
          <div className="form-input">
            <label>President Name:</label>
            <input type="text" value={presidentName} onChange={(e) => setPresidentName(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Dean Name:</label>
            <input type="text" value={deanName} onChange={(e) => setDeanName(e.target.value)} />
          </div>
          <div className='universityDate'>
      <div className="form-input">
        <label>Start:</label>
        <input type="date"  className="dateinput" onChange={(e) => handleStartDateChange(e.target.value)} />
      </div>
      <div className="form-input">
        <label>End:</label>
        <input type="date" className="dateinput" onChange={(e) => handleEndDateChange(e.target.value)} />
      </div>
          </div>
          <div className="form-input">
            <label>Upload QR Code:</label>
            <input type="file" accept="image/*" onChange={(e) => setQrCode(e.target.files[0])} />
          </div>
          <div className="form-input">
            <label>Upload Badge:</label>
            <input type="file" accept="image/*" onChange={(e) => setBadgeImage(e.target.files[0])} />
          </div>

          {/* Button to capture screenshot */}
          <button className="capture-button" onClick={handleCapture}>Capture Certificate</button>
        </form>
      </div>
    </div>
  );
};

export default Certificate;

