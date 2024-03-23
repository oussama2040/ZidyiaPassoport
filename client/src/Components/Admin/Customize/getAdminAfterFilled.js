import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAdmin from '../../NavBarAdmin/NavBarAdmin'
import SideBarAdmin from '../../SideBar/SideBarAdmin'
import styles from './Customize.module.css';
import { SlArrowLeft } from "react-icons/sl";

function GetAdminAfterFilled({ organizationId }) {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedFormImage, setSelectedFormImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [selectedFilledstudentId, setSelectedFilledstudentId] = useState(null);
  const [selectedFilledformId, setselectedFilledformId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);

  const handleRejectChange = (event) => {
    setRejectionReason('');
    setShowRejectionInput(event.target.value === 'reject');
  };

  const handleRejectionInputChange = (event) => {
    setRejectionReason(event.target.value);
  };

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/filledform/${organizationId}`,
        { withCredentials: true });
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
      setselectedFilledformId(selectedFormData.filled_form_id)
      console.log("FilledformId", selectedFormData.filled_form_id)
    }
  };

  // const handleButtonClicked = (filledstudentId) => {
  //   console.log(filledstudentId);
  //   window.location.href = `/admin/customizecertificate/${filledstudentId}`;
  //   // window.location.href = `/admin/customizecertificate/`;
  // };

  const handleButtonClicked = async (filledstudentId ,FilledformId) => {
    try {
      console.log("filledstudentId",filledstudentId);
      console.log("FilledformId",FilledformId);

        let requestData;
        if (showRejectionInput) {
            requestData = {
                status: 'rejected',
                rejectionReason: rejectionReason
            };
        } else {
            requestData = {
                status: 'verified',
                rejectionReason: ''
            };
        }

        const response = await axios.put(`http://localhost:5000/admin/filledformRequest/${FilledformId}`, requestData,
        { withCredentials: true });
         console.log(filledstudentId);
         window.location.href = `/admin/customizecertificate/${filledstudentId}`;


        if (response.status === 200) {
            console.log('Filled form status updated successfully.');
        } else {
            console.error('Failed to update filled form status.');
        }
    } catch (error) {
        console.error('Error updating filled form status:', error);
 
    }
};


// ------auhthorization Admin -----------//
const [validToken, setValidToken] = useState(false);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  const checkTokenValidity = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tenent/authorization', { withCredentials: true });
      const status = response.data.grantedAccess;
      setValidToken(status === true);
      setLoading(false); // Set loading to false once token validity check is complete
    } catch (error) {
      console.error('Error checking token validity:', error);
      setValidToken(false);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  checkTokenValidity();
}, []);


if (loading) {
  return <div>Loading...</div>;
}

if (!validToken) {
  navigate('/tenent/login');
  return null; 
}
// ------------------------//  
  return (
    <div>
      <NavbarAdmin />
      <div className='flex'>
        <SideBarAdmin />
        <div className={styles.reqdisplayflexcolomn}>
        <div className={styles.RequestPendingTitle}> <SlArrowLeft /> <div className='ml-3 text-white'>All Customize Pending</div></div> 

        <div className={styles.Mainformsdisplayflex}>

        <div className={styles.customizeafterform}>
          <select  className={`${styles.customizeAfterDropdown} `}
          onChange={(e) => handleSelectForm(Number(e.target.value))}>
            
            <option value='' className={styles.studentcustomizeDropdownOptionsSelect}>Select a Student</option>
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
                         {/* radio button verify and reject  */}
                         <div className={styles.rejectReason}>
                    <label>
                      <div className={styles.CustomizeReject}>Reject</div>
                      
                      <input type="radio" value="reject" name="rejectionReason" onChange={handleRejectChange} />
                    </label>
                    {showRejectionInput && (
                      <label >
                      <div className={styles.CustomizeReject}>Rejection Reason</div> 
                        <input type="text" value={rejectionReason} onChange={handleRejectionInputChange} />
                      </label>
                    )}
                    <label>
                    <div className={styles.CustomizeVerifyt}>Verify</div> 
                      <input type="radio" value="verify" name="rejectionReason" onChange={handleRejectChange} />
                    </label>
                  </div>

              <button className={styles.bottunVerfiy} onClick={() => handleButtonClicked(selectedFilledstudentId , selectedFilledformId)}>respond</button>
            </div>
         )} 
   
       
        </div>
        <div className={`${styles.customizeAfterimageContainer} ${hasImage && styles.imageWithBackground}`}>
          {selectedFormImage && <img src={selectedFormImage} alt='Form Image' className={styles.formImage} />}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default GetAdminAfterFilled;
