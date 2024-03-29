import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './issueCert.module.css'
import { IoIosArrowBack } from "react-icons/io";


function IssueCert() {
  // const  organizationId  =4;
  const [customFields, setCustomFields] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({});
  const [FileOption, setFileOption] = useState(null);
  const [organizationId, setorganizationId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/getcustomizefields/${organizationId}`,
        { withCredentials: true });
        setCustomFields(response.data);
      } catch (error) {
        console.error('Error fetching custom fields:', error);
      }
    };
    fetchData();
  }, [organizationId]);


// this for fetch the organiztion in dropdown
useEffect(() => {
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tenent/Allorganization`,
      { withCredentials: true });
      setOrganizations(response.data);
      console.log("organizations",organizations)
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };
  fetchOrganizations();
}, []);


  console.log('Custom Fields:', customFields);
  console.log('Form Data:', formData);
  console.log('option :', FileOption);
  const parseOptions = (options) => {
    try {
      return JSON.parse(options);
    } catch (error) {
      console.error('Error parsing options:', error);
      return [];
    }
  };

  const handleInputChange = (fieldId, value, fieldType, fieldName) => {
    setFormData((prevFormData) => {
      if (fieldType === 'checkbox') {

        const prevValues = Array.isArray(prevFormData[fieldName]) ? prevFormData[fieldName] : [];
        const updatedValues = value.checked
          ? [...prevValues, value.value]
          : prevValues.filter((item) => item !== value.value);

        return {
          ...prevFormData,
          [fieldName]: updatedValues,
        };
      } else {
        return {
          ...prevFormData,
          [fieldName]: value,
        };
      }
    });
  };


  //   const handleFileChange = (fieldName, file) => {
  //     setFileOption((prevFormData) => {
  //       const newFormData = {
  //         ...prevFormData,
  //         [fieldName]: file,
  //       };
  //       return newFormData;
  //     });
  //   };
  const handleFileChange = (fieldName, file) => {
    setFileOption((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [fieldName]: file,
      };
      return newFormData;
    });

    // Read the file content and display it
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgDataUrl = e.target.result;
      // Update the UI or store the data URL as needed
      console.log('Image Data URL:', imgDataUrl);
    };
    reader.readAsDataURL(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    
    // formDataToSend.append('request_id', 36); // Replace with the actual student ID
    formDataToSend.append('filledForm', JSON.stringify(formData));
    
    for (const key in FileOption) {
      formDataToSend.append('FileOption', FileOption[key]);
    }

    console.log('FileOption before submit:', FileOption);   // Log the formDataToSend before making the request


    try {
      const response = await axios.post(`http://localhost:5000/student/issuefilledform/${organizationId}`, formDataToSend,
      { withCredentials: true });
      console.log('Response:', response.data);
      console.log('Form submitted successfully!');
      window.location.href="/student/requestCertificate"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div>
      <div className={styles.MainstudentCustomizeform}> 
        <div class="certificate-title1">
          <IoIosArrowBack style={{ color: '#5DD3B3' }} />
            <span>Issue Certificate</span>
            </div>


                 <div className={styles.selectOrganizition}>
                       <select
                         id="organization"
                         className="selectOrganization"
                         value={organizationId}
                         onChange={(e) => setorganizationId(e.target.value)}    
                            >
                           <option value="" disabled>Select Tenent</option>
                           {organizations.map(org => (
                           <option key={org.id} value={org.id}>{org.name}</option>
                            ))}
                         </select>
            </div>
         
        <h1 className={styles.studentCustomizformTitle}> Fill Information </h1>
        <form className={styles.studentCustomizeform} onSubmit={handleSubmit}>
        {customFields.map((field) => (
          <div key={field.field_id} className={styles.studentCustomizefieldContainer}>
            <label>
              <div className={styles.studentcustomizeFieldNametext}>{field.fieldName}:</div>

              {field.fieldType === 'text' && (
                <div>
                  <input
                    className={styles.studentcustomizeInputtext}
                    type="text"
                    placeholder={`Enter ${field.fieldName}`}
                    required={!field.isOptional}
                    onChange={(e) => handleInputChange(field.field_id, e.target.value, field.fieldType, field.fieldName)}
                  />
                  {field.isOptional ? null : <span style={{ color: 'red', marginLeft: '20px', fontSize: '20px' }}>*</span>}
                </div>
              )}

              {field.fieldType === 'date' && (
                <div>
                  <input
                    required={!field.isOptional}
                    className={styles.customizeInputdate}
                    type="date"
                    placeholder={`Enter ${field.fieldName}`}
                    onChange={(e) => handleInputChange(field.field_id, e.target.value, field.fieldType, field.fieldName)}
                  />
                  {field.isOptional ? null : <span style={{ color: 'red', marginLeft: '20px', fontSize: '20px' }}>*</span>}
                </div>
              )}

              {/* {field.fieldType === 'file' && (
                    <input
                    className={styles.customizeInputfile}
                    type="file"
                    placeholder={`Enter ${field.fieldName}`}
                    onChange={(e) => handleFileChange(field.field_id, e.target.files[0])}
                    />
                )} */}

              {/* ... (existing input elements) */}

              {field.fieldType === 'file' && (
                <div className={styles.CustomizeFileMain}>
                  <div>
                    <label className={styles.customizeInputfileLabel}>
                      {/* Keep the input inside the label for accessibility */}
                      <input
                        required={!field.isOptional}
                        className={styles.customizeInputfile}
                        type="file"
                        onChange={(e) => handleFileChange(field.field_id, e.target.files[0])}
                      />
                      {/* Display the selected image */}
                      {FileOption && (
                        <img
                          src={FileOption[field.field_id] instanceof File ? URL.createObjectURL(FileOption[field.field_id]) : FileOption[field.field_id]}
                          alt="Selected Image"
                          className={styles.selectedImage}
                        />
                      )}
                    </label>
                    {field.isOptional ? null : <span style={{ color: 'red', marginLeft: '20px', fontSize: '20px' }}>*</span>}
                  </div>
                </div>
              )}
              {field.fieldType === 'dropdown' && (
                <div>
                  <select
                    className={styles.studentcustomizeDropdownOptions}
                    required={!field.isOptional}
                    onChange={(e) => handleInputChange(field.field_id, e.target.value, field.fieldType, field.fieldName)}
                  >
                    <option value="" className={styles.studentcustomizeDropdownOptionsSelect}>
                      Select {field.fieldName}
                    </option>
                    {parseOptions(field.options).map((option, index) => (
                      <option key={index} value={option} className={styles.studentcustomizeDropdownOptionsSelect}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {field.isOptional ? null : <span style={{ color: 'red', marginLeft: '20px', fontSize: '20px' }}>*</span>}
                </div>
              )}

              {field.fieldType === 'checkbox' && (
                <div className={styles.studentcustomizeflex} >
                  <div className={styles.studentcustomizecheckboxInput}>
                    {parseOptions(field.options).map((option, index) => (
                      <label key={index} className={styles.customizeFielddropcheck}>
                        <input
                          value={option}
                          type="checkbox"
                          onChange={(e) => handleInputChange(field.field_id, e.target, field.fieldType, field.fieldName)}
                        />
                        {option}
                      </label>
                    ))}

                  </div>
                </div>
              )}


              {field.fieldType === 'radio' && (
                <div className={styles.studentcustomizeflex} >
                  <div className={styles.studentcustomizecheckboxInput}>
                    {parseOptions(field.options).map((option, index) => (
                      <label key={index} className={styles.customizeFielddropcheck}>

                        <input
                          className={styles.studentcustomizecheckboxInput}
                          type="radio"
                          name={`radio_${field.fieldName}`}
                          value={option}
                          onChange={(e) => handleInputChange(field.field_id, e.target.value, field.fieldType, field.fieldName)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {field.isOptional ? null : <span style={{ color: 'red', marginLeft: '20px', fontSize: '20px' }}>*</span>}
                </div>
              )}


            </label>
          </div>
        ))}
        <div className={styles.submitfloat}>
        <button className={styles.customizesubmit} type="submit">Submit</button>
        </div>
      </form>
 
      </div>
    </div>
  )
}

export default IssueCert
