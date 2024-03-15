import styles from './loginSign.module.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

function LoginComponent({ apiUrl, userRole }) {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      const { [userRole]: userData, success, message } = response.data;
      const { accessToken, refreshToken } = userData;

      //const accessToken = SuperAdmin.accessToken
      //const refreshToken = SuperAdmin.refreshToken
      //const studentId = student.id
      //const firstName = student.first_name;
      //const lastName = student.last_name;
      //const email = student.email;

      console.log(accessToken);
      console.log(refreshToken);
      // console.log(studentId);
      // console.log(firstName);
      // console.log(lastName);
      // console.log(email);
      // console.log(response.data);
     
      //document.cookie = `user_id=${studentId}; Secure; Max-Age=${3 * 60 * 60};`;
      //document.cookie = `first_name=${firstName}; Secure; Max-Age=${3 * 60 * 60};`;
      document.cookie = `${userRole}accessToken=${accessToken}; Secure; Max-Age=${3 * 60 * 60};`;
      document.cookie = `${userRole}refreshToken=${refreshToken}; Secure; Max-Age=${3 * 60 * 60};`;
      


      // Assuming your backend returns a success message upon successful login
      if (success) {
        // Login was successful
        console.log('Login successful!');
        console.log(`${userRole}:`, userRole); // User data
       
          // Redirect to student page if login is successful
          navigate('/#');

      } else {
        // Handle other cases, such as incorrect credentials
        setError(response.data.message);
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        alert('Email or password incorrect,please try again!!');

      } else {
        setError('An error occurred. Please try again.'); // Handle generic errors
      }
    }

  };
  // console.log('Form ', formData);




  return (
    <div className={styles.backgroudFlex}>
      <div className={styles.rightImage}>
      <div className={styles.rightImageContainerLogin}>
        <div className={styles.helloText} >Hello,Student!</div>
        <div className={styles.welcomeText} >Welcome to</div>
        <div className={styles.welcomeText2} >Zidyia Passport!</div>
        <div className={styles.registerText} >Register with your personal details to use</div>
        <div className={styles.registerText2} >the platform features.</div>
        <button
        type="submit"
        className={styles.SignUpbutton}
        >
        Sign Up
        </button>
      </div>
        
     </div>

      <div className={`max-w-md mx-auto p-6 ${styles.box}`}>
        <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Login</h2>
        <form onSubmit={handleSubmit}>
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
              className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={styles.SignUpLoginbutton}
          >
            Log in
          </button>
        </form>
        {userRole === 'student' && (
          <div className={styles.haveAccountName}>
            <h3>You Don't have an account ? </h3>
            <h3>
              <Link to="/register" className={styles.loginLink}>
                Sign up
              </Link>
            </h3>
          </div>
        )}

        <div className={styles.ForgetPass}>
          <h3>
            <Link to={`/${userRole}/forgetpassword`} className={styles.loginLink}>
              Forget Password ?
            </Link>
          </h3>

        </div>
      </div>
    </div>
  );
};

export default LoginComponent
