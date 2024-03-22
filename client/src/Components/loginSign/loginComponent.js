import styles from './loginSign.module.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Zidyia_Logo from './../Assets/Zidyia_Logo.png';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

function LoginComponent({ apiUrl, userRole }) {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null)



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      const { [userRole]: userData, success, message } = response.data;
      const { accessToken, refreshToken, adminemail, firstPassUpdate } = userData;


      console.log(accessToken);
      console.log(refreshToken);



      // Assuming your backend returns a success message upon successful login
      if (success) {
        // Login was successful
        console.log('Login successful!');
        console.log(`${userRole}:`, userRole); // User data
        console.log(firstPassUpdate); // User data
        Cookies.set(`${userRole}accessToken`, accessToken, { secure: true, expires: new Date(Date.now() + 3 * 60 * 1000) });
        Cookies.set(`${userRole}refreshToken`, refreshToken, { secure: true, expires: 7 });
        // if the user is a student redirect to student page when login successful, if the user is a super admin redirect to super admin page
        //if the user is a subscriber or a tenent redirect to update password page, and send the email of the user in the url
        // Redirect based on user role
        if (userRole === 'student') {
          // Redirect to student page
          navigate('/student/customize');
        } else if (userRole === 'SuperAdmin') {
          // Redirect to super admin page
          navigate('/superadmin');
        } else {
          // Check firstPassUpdate
          if (firstPassUpdate === 1) {
            if (userRole === 'tenent') {
              navigate(`/admin`);
            } else {
              // If firstPassUpdate is 1, navigate to ${userRole} page
              navigate(`/${userRole}/scanqrcode`);
            }
          } else {
            // If firstPassUpdate is 0, navigate to update password page with email in the URL
            navigate(`/${userRole}/updatepassword?email=${adminemail}`);
          }
        }
      } else {
        setError(message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Email or password incorrect, please try again!!');
      } else {
        setError('An error occurred. Please try again.');
      }
    }

  };




  return (
    <div className={styles.backgroudFlex}>
      <div className={styles.rightImage}>
        <div className={styles.rightImageContainerLogin}>
          <div className={styles.logoImg}>
            <img className={styles.logoImage} src={Zidyia_Logo} />
          </div>
          <div className={styles.helloText} >Hello, {userRole}!</div>
          <div className='flex'>
          <div className={styles.welcomeText} >Welcome to </div>
          <div className={styles.welcomeTextZidyia} >Zidyia Passport</div>
          </div>
          {userRole === 'student' && (
            <React.Fragment>
              <div className={styles.registerText} >Register with your personal details to use</div>
              <div className={styles.registerText2} >the platform features.</div>
              <button type="submit" className={styles.SignUpbutton}>
                <Link to="/student/register" >
                  Sign Up
                </Link>
              </button>
            </React.Fragment>
          )}
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
        {/* {userRole === 'student' && (
          <div className={styles.haveAccountName}>
            <h3>You Don't have an account ? </h3>
            <h3>
              <Link to="/student/register" className={styles.loginLink}>
                Sign up
              </Link>
            </h3>
          </div>
        )} */}

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