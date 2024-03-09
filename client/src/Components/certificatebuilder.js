import React, { useState } from 'react';
import './Certificate.css';

const Certificate = () => {
  // State variables to manage user inputs

  const [outerBorderColor, setOuterBorderColor] = useState('#000000');
  const [innerBorderColor, setInnerBorderColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [badge, setBadge] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data
    // Update the certificate layout
  };

  return (
    <div className="certificate-editor">
      {/* Certificate Preview */}
      <div className="certificate-preview">
        {/* Certificate layout with dynamic styles */}
        {/* <div className="pm-certificate-container" style={{ borderRadius, borderColor, fontFamily, fontWeight, fontSize, color: fontColor }}> */}

    <div className="pm-certificate-container" style={{  fontFamily, fontWeight, fontSize, color: fontColor }}>    
    {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="logo" />}
          {<div className="outer-border" style={{  borderColor: outerBorderColor }}></div>}
          {<div className="inner-border" style={{  borderColor: innerBorderColor }}></div>}


      <div className="pm-certificate-border col-xs-12">
        <div className="row pm-certificate-header">
          <div className="pm-certificate-title cursive col-xs-12 text-center">
            <h2>Buffalo Public Schools Certificate of Completion</h2>
          </div>
        </div>

        <div className="row pm-certificate-body">

          <div className="pm-certificate-block">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                  <span className="pm-name-text bold">TrueNorth Administrator</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-earned col-xs-8 text-center">
                  <span className="pm-earned-text padding-0 block cursive">has earned</span>
                  <span className="pm-credits-text block bold sans">PD175: 1.0 Credit Hours</span>
                </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-course-title col-xs-8 text-center">
                  <span className="pm-earned-text block cursive">while completing the training course entitled</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2 "></div>
                <div className="pm-course-title  col-xs-8 text-center underline">
                  <span className="pm-credits-text block bold sans ">BPS PGS Initial PLO for Principals at Cluster Meetings</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>
          </div>

          <div className="col-xs-12">
            <div className="row">
              <div className="pm-certificate-footer ">
                <div className="col-xs-4 pm-certified   col-xs-4 text-center">
                  <span className="pm-credits-text block sans underline">Buffalo City School District</span>
                  <span className="pm-empty-space block "></span>
                  <span className="bold block">Crystal Benton Instructional Specialist II, Staff Development</span>
                </div>
                <div className="col-xs-4"></div>
                <div className="col-xs-4 pm-certified  col-xs-4 text-center">
                  <span className="pm-credits-text block sans underline">Date Completed</span>
                  <span className="pm-empty-space block "></span>
                  <span className="bold block">DOB: </span>
                  <span className="bold block">Social Security # (last 4 digits)</span>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>        </div>
      </div>

      {/* Certificate Editor Form */}
      <div className="certificate-form">
        <h2>Certificate Editor</h2>
        <form onSubmit={handleSubmit}>
          {/* Form inputs for user customization */}
          {/* Example: */}
          

          <label>Outer Border Color:</label>
          <input type="color" value={outerBorderColor} onChange={(e) => setOuterBorderColor(e.target.value)} />

         

          <label>Inner Border Color:</label>
          <input type="color" value={innerBorderColor} onChange={(e) => setInnerBorderColor(e.target.value)} />

          <label>Font Family:</label>
          <input type="text" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />

          <label>Font Weight:</label>
          <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>

          <label>Font Size:</label>
          <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />

          <label>Font Color:</label>
          <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />

          {/* Add more form inputs for other customization options */}
          {/* Example: Logo and Signature Upload */}

          <label>Upload Logo:</label>
          <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />

          <label>Upload Signature:</label>
          <input type="file" accept="image/*" onChange={(e) => setSignature(e.target.files[0])} />

          {/* Checkbox to toggle badge addition */}
          <label>Add Badge:</label>
          <input type="checkbox" checked={badge} onChange={(e) => setBadge(e.target.checked)} />

          <button type="submit">Preview</button>
        </form>
      </div>
    </div>
  );
};

export default Certificate;
