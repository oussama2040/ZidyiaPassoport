import React, { useState, useEffect  } from 'react';
import styles from './loginSign.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function UpdatePasswordComponent({apiUrl, userRole}){
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        verifyPassword: ''
      });


      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value 
        });
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        if (formData.password !== formData.verifyPassword) {
          console.error("Passwords do not match");
          return;
        }
        
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const email = urlParams.get('email');
          const response = await axios.post(`${apiUrl}?email=${email}`, {
            password: formData.password,
            verifyPassword: formData.verifyPassword
          });
          if (response.data.success) {
            console.log('Form submitted:', response.data);
            alert(response.data.message); // Display success message to the user
        
            // Navigate based on user role
            if (userRole === 'subscriber') {
                // Navigate to subscriber page
                navigate('/subscriber');
            } else if (userRole === 'tenent') {
                // Navigate to tenant page
                navigate('/admin');
            } else {
                // If user role is not subscriber or tenant, navigate to login page
                navigate(`/${userRole}/login`);
            }
        } else {
            // If password reset was not successful, navigate to update password page
            navigate(`/${userRole}/updatepassword`);
        }
        } catch (error) {
          console.error('Error submitting form:', error);
          // Handle error response
        }
      };
  // console.log('Form ', formData);
  return (
  
    <div className={`max-w-md mx-auto p-6 ${styles.updatePassbox}`}>
      <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="newPassword" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
            placeholder="Enter your new password"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="verifyPassword" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Verify new password</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
            placeholder="Verify the new password"
            required
          />
        </div>

        
        <button
          type="submit"
          className={styles.SignUpLoginbutton}
        >
          Update Password
        </button>
      </form>
      {userRole === 'student' && (
        <div className={styles.haveAccountName}>
          <h3>You Don't have an account ? </h3>
          <h3>
            <Link to="/signup" className={styles.loginLink}>
              Sign up
            </Link>
          </h3>
        </div>
      )}
      
    </div>
  );
};

export default UpdatePasswordComponent
