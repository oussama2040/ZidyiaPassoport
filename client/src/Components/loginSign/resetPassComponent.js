import React, { useState, useEffect  } from 'react';
import styles from './loginSign.module.css';
import imageecom from '../Assets/ecom.gif';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function ResetPasswordComponent(){
  
    const navigate = useNavigate();
    const location = useLocation();
    const [useremail, setEmail] = useState('');
    const [formData, setFormData] = useState({
        password: '',
        verifyPassword: ''
      });
    
      useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const useremail = searchParams.get('email');
        setEmail(useremail);
      }, [location]);


      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value 
        });
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        console.log(useremail)
        if (formData.password !== formData.verifyPassword) {
          console.error("Passwords do not match");
          return;
        }
        console.log(useremail)
        
        try {
          const response = await axios.post('http://localhost:5000/author/resetpass', {
            email: useremail,
            password: formData.password,
            verifyPassword: formData.verifyPassword
          });
          if (response.data.success) {
            console.log('Form submitted:', response.data);
            // Handle success response
            // Password reset was successful
            alert(response.data.message); // Display success message to the user
            // Optionally, redirect the user to a different page or perform any other action
            navigate('/login');

          } else {
            navigate('/resetPassword');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          // Handle error response
        }
      };
  // console.log('Form ', formData);
  return (
    <div className={styles.backgroudFlex}>
      <div className={styles.rightImage}>
      <img src={imageecom} alt="App Store" />
      </div>
    
    <div className={`max-w-md mx-auto p-6 ${styles.box}`}>
      <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Forget Password</h2>
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
      <div className={styles.haveAccountName}>
      <h3>You Don't have an account ? </h3>

     <h3> <Link to="/signup" className={styles.loginLink}>
    Sign up
     </Link>
     </h3>
    </div>
    </div>
    </div>
  );
};

export default ResetPasswordComponent
