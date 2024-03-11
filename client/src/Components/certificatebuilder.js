import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './Certificate.css';
import axios from 'axios';

const Certificate = () => {
  // State variables to manage user inputs
  const [outerBorderColor, setOuterBorderColor] = useState('#000000');
  const [innerBorderColor, setInnerBorderColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#618597'); // Set initial background color
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontColor, setFontColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [badgeImage, setBadgeImage] = useState(null);
  const [facultyName, setFacultyName] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [presidentName, setPresidentName] = useState('');
  const [deanName, setDeanName] = useState('');

  // Ref for the certificate container
  const certificateRef = useRef(null);

  // Function to handle screenshot capture
  const handleCapture = async () => {
    try {
        const canvas = await html2canvas(certificateRef.current);
        canvas.toBlob(async (blob) => {
            // Create FormData object
            const formData = new FormData();
            formData.append('certificateImage', blob, 'certificate.png');

            // Make a POST request to your server to upload the image to Cloudinary
            const response = await axios.post('http://localhost:5000/tenent/savecertificate', formData);

            // Handle the response from the server
            console.log(response.data);
        }, 'image/png');
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error capturing and saving certificate:', error);
    }
};

  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data
    // Update the certificate layout
  };

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
                    {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="logo" />}
                  </div>
                  <div className="col-xs-4"></div>
                </div>
              </div>
              <h2 className="cursive">University Of Lebanon</h2>
              <span className="pm-certificate-texts">Based on the University's Statute</span>
              <span className="pm-certificate-texts">Upon the Recommendation of the "{facultyName}"</span>
              <span className="pm-certificate-texts">The "University Of Lebanon" has conferred upon</span>
            </div>
          </div>
          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              {/* Student Name */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-name margin-0 col-xs-8 text-center">
                    <span className="pm-name-text underline bold">Rayan Soltan</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Student Birth Details */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-student-birth-details col-xs-8 text-center">
                    <span className="pm-birth-text block">Born on <span className="underline bold">17/11/1999</span> in <span className="underline bold">Nabatieh</span></span>
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
                  <span className="pm-credits-text block sans underline">Khaldeh, Lebanon</span>
                  <span className="bold block">President: {presidentName}</span>
                </div>
                <div className="col-xs-4">
                  <div>
                    {badgeImage && <img src={URL.createObjectURL(badgeImage)} alt="Badge" className="badge-image" />}
                  </div>
                </div>
                <div className="col-xs-4 pm-certified text-center">
                  <span className="pm-credits-text block sans underline">On 26/7/2023</span>
                  <span className="bold block">Dean: {deanName}</span>
                </div>
              </div>
            </div>
          </div>
          {qrCode && <img src={URL.createObjectURL(qrCode)} alt="QR Code" className="qr-code-image" />}
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
          <div className="form-input">
            <label>Upload Logo:</label>
            <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
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

