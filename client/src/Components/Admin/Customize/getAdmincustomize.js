
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Customize.module.css';

function GetAdmincustomize({ organizationId }) {
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/getcustomizefields/${organizationId}`);
        setCustomFields(response.data);
      } catch (error) {
        console.error('Error fetching custom fields:', error);
      }
    };

    fetchData();
  }, [organizationId]);

  console.log('Custom Fields:', customFields);

  const deleteCustomField = async () => {
    try {
      console.log("clicked", organizationId);
      const response = await axios.delete(`http://localhost:5000/admin/deletecustomizefields/${organizationId}`);
      console.log('Delete response:', response.data);
      const updatedResponse = await axios.get(`http://localhost:5000/student/getcustomizefields/${organizationId}`);
      setCustomFields(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting custom field:', error);
    }
  };
  

  return (
    <div className={styles.CustomizeGetMain}>
      <form >
      <h1 className={styles.CustomizformTitle}> Custom Fields Form </h1> 
        {customFields.map((field) => (
          <div key={field.field_id}  className={styles.CustomizefieldContainer}>
            <label>
            <div className={styles.customizeFieldNametext}>{field.fieldName}:</div>
              
              {field.fieldType === 'text' && (
                <input
                className={styles.customizeInputte}
                  type="text"
                  placeholder={`Enter ${field.fieldName}`}
                  required={!field.isOptional}
                />
              )}

              {field.fieldType === 'date' && (
                <input
                className={styles.customizeInputdate}
                  type="date"
                  placeholder={`Enter ${field.fieldName}`}
                />
              )}

              {field.fieldType === 'file' && (
                <input
                className={styles.customizeInputfile}
                  type="file"
                  placeholder={`Enter ${field.fieldName}`}
                />
              )}

          {field.fieldType === 'dropdown' && (
            <select required={!field.isOptional}>
              <option value="" >Select {field.fieldName}</option>
              {field.options &&
                JSON.parse(field.options).map((option, index) => (
                  <option key={index} value={option} >
                    {option}
                  </option>
                ))}
            </select>
          )}

          {field.fieldType === 'checkbox' && (
            <div>
              {field.options &&
                JSON.parse(field.options).map((option, index) => (
                  <label key={index} className={styles.customizeFielddropcheck}>
                    <input type="checkbox" value={option} />
                    {option}
                  </label>
                ))}
            </div>
          )}

          {field.fieldType === 'radio' && (
            <div>
              {field.options &&
                JSON.parse(field.options).map((option, index) => (
                  <label key={index} className={styles.customizeFielddropcheck}>
                    <input
                      type="radio"
                      name={`radio_${field.fieldName}`}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
                
            </div>
              )}
      
      {field.isOptional ? " " : <span style={{ color: 'red' , marginLeft:"20px" }}>*</span>}
            </label>
          </div>
        ))}
      </form>
      <hr></hr>
      <button className={styles.CustomizeDelete} onClick={deleteCustomField}>Delete</button>
    </div>
  );
}

export default GetAdmincustomize;


