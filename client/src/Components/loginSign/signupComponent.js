
import React, { useState,useEffect } from 'react';
import styles from './loginSign.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
function SignupComponent() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    academic_id:'',
    ID:''

  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('Form:', formData);
}, [formData]); // Log the form data whenever it changes

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleImageChange = (e) => {
  const file = e.target.files[0]; // Get the first selected file
  
  if (!file) {
      return; // No file selected, exit function
  }

  // Read the file asynchronously
  const reader = new FileReader();
  reader.onload = () => {
      // Set the image data to the form data
      setFormData({
          ...formData,
          ID: reader.result, // Store the ArrayBuffer of the file
      });
  };
  reader.onerror = (error) => {
      console.error('Error reading file:', error);
  };
  reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
};





  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:5000/student/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      setSuccessMessage('Registration successful!'); // Display success message to the user
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        mobile: '',
        academic_id: '',
        ID: ''
      });
      setErrorMessage(''); // Clear any previous error messages
      alert('A verification email has been sent. Please check your email inbox.');
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage(error.response.data.message); // Display error message to the user
      setSuccessMessage(''); // Clear any previous success messages
    }
  }
   console.log('Form ', formData);



  return (
    
            
    <div className={styles.backgroudFlexRegister}>

      <div className={`max-w-md mx-auto p-6 ${styles.rightImage}`}>
        <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Create an account</h2>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: '#579AD3',textAlign:'center' }}>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first_name" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Firstname</label>
            <input
              type="text"
              id="firstname"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full p-1 border rounded-md ${styles.inputText}`}
              placeholder="Enter your firstname"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last_name" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Lastname</label>
            <input
              type="text"
              id="lastname"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full p-1 border rounded-md ${styles.inputText}`}
              placeholder="Enter your lastname"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-1 border rounded-md ${styles.inputText}`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-1 border rounded-md mb-2 ${styles.inputText}`}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-2">
          <label htmlFor="mobile" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your mobile number"
            required
          />
         </div>
         <div className="mb-2">
          <label htmlFor="academic_id" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Academic ID</label>
          <input
            type="text"
            id="academic_id"
            name="academic_id"
            value={formData.academic_id}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your academic ID"
            required
          />
         </div>
         <div className="mb-2">
          <label htmlFor="ID" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Upload ID Image</label>
          <input
            type="file"
            id="ID"
            name="ID"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full p-1 border rounded-md mb-6 ${styles.inputText}`}
            multiple
          />
         </div>
          <button
            type="submit"
            className={styles.SignUpLoginbutton}
          >
            Sign Up
          </button>
        </form>
        <div className={styles.haveAccountName}>
          <h3>Already have an account ? </h3>

          <h3> <Link to="/login" className={styles.loginLink}>
            Log in
          </Link>
          </h3>
        </div>
      </div>


      <div className={styles.boxRegister}>
      <div className={styles.rightImageContainerRegister}>
        <div className={styles.helloText} >Welcome Back!</div>
        <div className={styles.registerText} >Login By entering your personal details</div>
        <div className={styles.registerText2} >to use the platform features.</div>
        <button
        type="submit"
        className={styles.SignUpbutton}
        >
        Log in
        </button>
      </div>
        
      </div>
    </div>
  );
};


export default SignupComponent
