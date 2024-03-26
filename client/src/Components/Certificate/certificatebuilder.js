import React, { useState, useRef,useEffect } from 'react';
// import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import './Certificate.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  // const [studentId, setStudentId] = useState('');
  // const [studentName, setStudentName] = useState('');
  const [badgeImage, setBadgeImage] = useState(null);
  const [facultyName, setFacultyName] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [presidentName, setPresidentName] = useState('');
  const [deanName, setDeanName] = useState('');
  // const { studentIdFromURL } = useParams(); // Use useParams to access URL parameters

  // useEffect(() => {
  //   // Set the student ID from the URL parameter when the component mounts
  //   setStudentId(studentIdFromURL);
  // }, [studentIdFromURL]);

 

  // ---------------------------------------------------------------------------------------------------------

  // Ref for the certificate container
  const certificateRef = useRef(null);

  
  const [organizationInfo, setOrganizationInfo] = useState(null);
  useEffect(() => {
   
    const fetchOrganizationInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tenent/organizationinfo',{
              withCredentials: true,
            });
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
const { studentID } = useParams();

// console.log("studentid",studentID)
  useEffect(() => {
   
    const fetchtudentInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/student/studentinfo/${studentID}`,{
              withCredentials: true
            });
            setstudentInfo(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching student info:', error);
        }
    };

    fetchtudentInfo();
}, [studentID]);
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
const handleCapture = async () => {
  try {
    // Get the certificate element
    const certificateElement = certificateRef.current;

    // Delay for 2 seconds to ensure font loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use dom-to-image to capture the screenshot
    const dataUrl = await domtoimage.toPng(certificateElement);

    // Convert the data URL to a blob
    const blob = dataURLToBlob(dataUrl);

    // Create a FormData object to send the blob data
    const formData = new FormData();
    formData.append('certificateImage', blob, 'certificate.png');

    // Send the captured image data to the server
    const response = await axios.post(`http://localhost:5000/tenent/savecertificate/${studentID}`, formData,{
      withCredentials: true
    });

    console.log('Certificate saved successfully:', response.data);
  } catch (error) {
    console.error('Error capturing and saving certificate:', error);
  }
};

// Helper function to convert data URL to blob
const dataURLToBlob = (dataURL) => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
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
const generateQRCode = async () => {
  try {
    const studentId = studentID;
    const studentName = studentInfo.first_name;
    const organization_Name=organizationInfo.name;

    // Step 1: Generate QR code and save filename to the database
    const qrCodeResponse = await axios.get(`http://localhost:5000/admin/generateQR/${studentId}/${studentName}/${organization_Name}`,{
        withCredentials: true
      });
    const qrCodeFilename = qrCodeResponse.data.qrCodeFilename;
    setQrCode(qrCodeFilename)
   

    // Step 2: Retrieve Cloudinary URL using the filename from the database
    const cloudinaryResponse = await axios.get(`http://localhost:5000/admin/getgeneratedQR/${studentId}`,{
      withCredentials: true
    });
    const qrCodeUrl = cloudinaryResponse.data.qrCodeUrl;

    // Set the Cloudinary URL for the QR code
    setQRCodeUrl(qrCodeUrl);
    console.log(qrCodeUrl)
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

//-------------------------------------------------------------------------------------------



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
                    <span className="pm-name-text  bold">{studentInfo && studentInfo.first_name}  {studentInfo && studentInfo.last_name}</span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Student Birth Details */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-student-birth-details col-xs-8 text-center">
                    <span className="pm-birth-text block">Started on <span className=" bold">{startDate}</span> till <span className=" bold">{endDate}</span></span>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
              {/* Degree Information */}
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-degree-info col-xs-8 text-center">
                    The Degree of <span className=" bold">{degree}</span> in <span className=" bold">{major}</span>
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
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code"  className='qr-code-image'/>}



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
            <select  className="values" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
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
            <label>Upload Badge:</label>
            <input type="file" accept="image/*" onChange={(e) => setBadgeImage(e.target.files[0])} />
          </div>
          {/* <div className="form-input">
            <label>Upload QR Code:</label> 
            <input type="file" accept="image/*" onChange={(e) => setQrCode(e.target.files[0])} />
           
          </div> */}

          {/* Button to capture screenshot and generate qr code */}
          <div className='certificatebtns'>
          <button  className="capture-button" onClick={generateQRCode}>Generate QR Code</button>
          <button className="capture-button" onClick={handleCapture}>Capture Certificate</button>
          </div>
        </form>
      </div>
      
    </div>
   
  );
};

export default Certificate;

