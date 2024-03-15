
// import React, { useState } from 'react';
// import styles from './loginSign.module.css';
// import imageecom from '../Assets/ecom.gif';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; 


// function ForgetPasswordComponent(){

//   const [formData, setFormData] = useState({
//     email: ''
//   });
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value 
//     });
//   // console.log('e target name '+ e.target.name);
//   // console.log('e target value '+ e.target.value);
//   };

//   const cookieValue = document.cookie.match('(^|;)\\s*refreshToken\\s*=\\s*([^;]+)');
//   console.log(cookieValue);

//   // Function to get a specific cookie by name
// const getCookie = (name) => {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : '';
// };
  
//   //for sending the reset pass email
//   const handleSubmit= async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//         // Get the refresh token from the cookie
//         const cookieValue = document.cookie.match('(^|;)\\s*refreshToken\\s*=\\s*([^;]+)');
//         console.log(cookieValue);
//         const tokenResponse = await axios.get('http://localhost:5000/getAccessToken', {
//           params: {
//             email: formData.email // Include the user's email as a query parameter
//           }
//         });
//         const accessToken = tokenResponse.data.accessToken;
//         console.log(accessToken);
//       // Send a POST request to the server with the email
//       const response = await axios.post('http://localhost:5000/author/resetpassverify', formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         // Set withCredentials to true to send cookies in the request
//         withCredentials: true
//       });
//       console.log(response.data); // Handle response as needed
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle errors
//     }
//   };
//   // console.log('Form ', formData);
//   return (
//     <div className={styles.backgroudFlex}>
//       <div className={styles.rightImage}>
//       <img src={imageecom} alt="App Store" />
//       </div>
    
//     <div className={`max-w-md mx-auto p-6 ${styles.box}`}>
//       <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Forget Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-2">
//           <label htmlFor="email" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className={styles.SignUpLoginbutton}
//         >
//           Reset Password
//         </button>
//       </form>
//       <div className={styles.haveAccountName}>
//       <h3>You Don't have an account ? </h3>

//      <h3> <Link to="/signup" className={styles.loginLink}>
//     Sign up
//      </Link>
//      </h3>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default ForgetPasswordComponent


// export default ForgetPasswordComponent
import React, { useState } from 'react';
import styles from './loginSign.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgetPasswordComponent({apiUrl, userRole}) {
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

      try {
        // Send a POST request to the server with the email
        const response = await axios.post(apiUrl, formData);
        console.log('Reset password email sent:', response.data); // Log response for debugging
        if (response.data.success) {
          alert(response.data.message); 
        }
      } catch (error) {
        console.error('Error sending reset password email:', error); // Log error for debugging
        // Handle errors
      }
  };

  return (
    <div className={`max-w-md mx-auto p-6 ${styles.forgetPasswordBox}`}>
      <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          type="submit"
          className={styles.SignUpLoginbutton}
        >
          Reset Password
        </button>
      </form>
      {userRole === 'student' && (
        <div className={styles.haveAccountName}>
          <h3>You Don't have an account ? </h3>
          <h3>
            <Link to="/student/register" className={styles.loginLink}>
              Sign up
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};  
export default ForgetPasswordComponent;
