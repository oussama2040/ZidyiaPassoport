import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin'
import SideBarAdmin from '../../SideBar/SideBarAdmin'
import styles from './Customize.module.css';

function GetAdminAfterFilled({ organizationId }) {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedFormImage, setSelectedFormImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [selectedFilledstudentId, setSelectedFilledstudentId] = useState(null);


  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/filledform/${organizationId}`);
        setFormFields(response.data);
      } catch (error) {
        console.error('Error fetching form fields:', error);
      }
    };

    fetchFormFields();
  }, [organizationId]);

  const parseFormData = (formDataString) => {
    try {
      return JSON.parse(formDataString);
    } catch (error) {
      console.error('Error parsing form data:', error);
      return {};
    }
  };

  const handleSelectForm = (selectedFormId) => {
    const selectedFormData = formFields.find((form) => form.filled_form_id === selectedFormId);
    if (selectedFormData) {
      setFormData(JSON.parse(parseFormData(selectedFormData.form_data)));
      setSelectedFormImage(selectedFormData.FileOption);
      setHasImage(!!selectedFormData.FileOption);
      setSelectedFilledstudentId(selectedFormData.student_id);
      console.log(formData)
    }
  };

  const handleButtonClicked = (filledstudentId) => {
    console.log(filledstudentId);
    window.location.href = `/admin/customizecertificate/${filledstudentId}`;
    // window.location.href = `/admin/customizecertificate/`;
  };
  return (
    <div>
      <NavbarAdmin />
      <div className='flex'>
        <SideBarAdmin />
        <div className={styles.customizeafterform}>
          <select  className={`${styles.customizeAfterDropdown} `}
          onChange={(e) => handleSelectForm(Number(e.target.value))}>
            
            <option value='' className={styles.studentcustomizeDropdownOptionsSelect}>Select a Form</option>
            {formFields.map((form) => (
              <option key={form.filled_form_id} value={form.filled_form_id} className={styles.studentcustomizeDropdownOptionsSelect} >
                {form.first_name} {form.last_name}
                
              </option>
              
            ))}
            
          </select>

          {formData && Object.keys(formData).length > 0 && (
            <div className={styles.customizeAfterDetails}>
              <h3 className={styles.customizeFieldNametext} >Filled Form Details</h3>
              <ul>
                {Object.entries(formData).map(([fieldName, value]) => (
                  <li key={fieldName} className={styles.customizeFieldDetails}>
                   <div className={styles.customizeFieldName}>{fieldName}:</div>
                    <div className={styles.customizeFieldValue}>{Array.isArray(value) ? value.join(', ') : value}</div>
                  </li>
                ))}
              </ul>
              <button className={styles.bottunVerfiy} onClick={() => handleButtonClicked(selectedFilledstudentId)}>verify</button>
            </div>
          )}


        </div>

        <div className={`${styles.customizeAfterimageContainer} ${hasImage && styles.imageWithBackground}`}>
          {selectedFormImage && <img src={selectedFormImage} alt='Form Image' className={styles.formImage} />}
        </div>
      </div>
    </div>
  );
}

export default GetAdminAfterFilled;
