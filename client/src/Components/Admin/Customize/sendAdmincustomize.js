import React, { useState } from 'react';
import axios from 'axios';
import GetAdmincustomize from "./getAdmincustomize.js"
import styles from './Customize.module.css'

import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin'
import SideBarAdmin from '../../SideBar/SideBarAdmin'


function SendAdmincustomize({organizationId}) {
  const [formData, setFormData] = useState({
    organizationId, // organization id 
    fields: [],
  });

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = [...formData.fields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    setFormData({
      ...formData,
      fields: updatedFields,
    });
  };

  const handleAddOption = (index) => {
    const updatedFields = [...formData.fields];
    const options = updatedFields[index].options || [];
    updatedFields[index].options = [...options, ''];
    setFormData({
      ...formData,
      fields: updatedFields,
    });
  };

  const handleRemoveOption = (index, optionIndex) => {
    const updatedFields = [...formData.fields];
    const options = updatedFields[index].options || [];
    updatedFields[index].options = [...options.slice(0, optionIndex), ...options.slice(optionIndex + 1)];
    setFormData({
      ...formData,
      fields: updatedFields,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        organizationId: formData.organizationId,
        fields: formData.fields.map(field => {
          const { options, ...fieldData } = field;
          if (options) {
            fieldData.options = options;
          }
          return fieldData;
        }),
      };

      console.log(dataToSend);
      const response = await axios.post('http://localhost:5000/admin/customizefields', dataToSend);
      console.log('Response:', response.data);
      console.log('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div>
    <NavbarAdmin />
    <div className={styles.Customizeflex}>
    <SideBarAdmin />
    <form className={styles.Customizeform} onSubmit={handleSubmit}>
    <h1 className={styles.CustomizformTitle}> Customize Form To Send </h1> 
      <div>
        {formData.fields.map((field, index) => (
          <div key={index}  className={styles.CustomizefieldContainer}>
             <label>
             <div className={styles.customizeFieldNametext}>Field Name:</div>
              <input
                className={styles.customizeInputtext}
                type="text"
                value={field.fieldName || ''}
                onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
              />
            </label>
            <label>
              <div className={styles.customizeFieldNametext}>Field Type:</div>
              <select
               className={styles.customizeselecttype}
                value={field.fieldType || ''}
                onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
              > <option className={styles.customizeselecttypeback}>choose Type</option>
                <option className={styles.customizeselecttypeback}value="text">Text</option>
                <option className={styles.customizeselecttypeback} value="date">Date</option>
                <option className={styles.customizeselecttypeback} value="file">File</option>
                <option className={styles.customizeselecttypeback} value="radio">Radio</option>
                <option className={styles.customizeselecttypeback} value="dropdown">Dropdown</option>
                <option className={styles.customizeselecttypeback} value="checkbox">Checkbox</option>
              </select>
            </label>
            <label className={styles.customizeIsOptional}>
              Is Optional:
              <input
                type="checkbox"
                checked={field.isOptional || false}
                onChange={(e) => handleFieldChange(index, 'isOptional', e.target.checked)}
              />
            </label>

            {field.fieldType === 'dropdown' && (
              <div className={styles.customizeDropdownOptions}>
                {field.options && field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      className={styles.customizeDropdownInput}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedFields = [...formData.fields];
                        updatedFields[index].options[optionIndex] = e.target.value;
                        setFormData({
                          ...formData,
                          fields: updatedFields,
                        });
                      }}
                    />
                    <button className={styles.customizeRemove} type="button" onClick={() => handleRemoveOption(index, optionIndex)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button className={styles.customizeAddOption} type="button" onClick={() => handleAddOption(index)}>
                  Add Option
                </button>
              </div>
            )}

{field.fieldType === 'checkbox' && (
        <div className={styles.customizeCheckboxRadioOptions}>
          {field.options && field.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                className={styles.customizecheckboxInput}
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedFields = [...formData.fields];
                  updatedFields[index].options[optionIndex] = e.target.value;
                  setFormData({
                    ...formData,
                    fields: updatedFields,
                  });
                }}
              />
              <button   className={styles.customizeRemove} type="button" onClick={() => handleRemoveOption(index, optionIndex)}>
                Remove
              </button>
            </div>
          ))}
          <button  className={styles.customizeAddOption}  type="button" onClick={() => handleAddOption(index)}>
            Add Option
          </button>
        </div>
      )}

{field.fieldType === 'radio' && (
        <div className={styles.customizeCheckboxRadioOptions}>
          {field.options && field.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                className={styles.customizeradioInput }
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedFields = [...formData.fields];
                  updatedFields[index].options[optionIndex] = e.target.value;
                  setFormData({
                    ...formData,
                    fields: updatedFields,
                  });
                }}
              />
              <button type="button" className={styles.customizeRemove} onClick={() => handleRemoveOption(index, optionIndex)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className={styles.customizeAddOption}  onClick={() => handleAddOption(index)}>
            Add Option
          </button>
        </div>
      )}
          </div>
        ))}
      </div>

      <div className={styles.Customizebutton}>
      <button  className={styles.CustomizeAddField} type="button" onClick={() => setFormData({ ...formData, fields: [...formData.fields, {}] })}>
        Add Field
      </button>

      <button className={styles.CustomizeSubmit}  type="submit">Submit</button>
      </div>
      
    </form>


      <GetAdmincustomize organizationId={organizationId} />
      </div>
    </div>
  )
}

export default SendAdmincustomize
