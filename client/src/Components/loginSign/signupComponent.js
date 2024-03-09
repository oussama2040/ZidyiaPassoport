
// import React, { useState,useEffect } from 'react';
// import styles from './loginSign.module.css';
// import imageecom from '../Assets/ecom.gif';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// function SignupComponent() {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     console.log('Form:', formData);
// }, [formData]); // Log the form data whenever it changes

// const handleChange = (e) => {
//     setFormData({
//         ...formData,
//         [e.target.name]: e.target.value
//     });
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         // Send form data to the backend
//         const response = await axios.post('http://localhost:5000/author/register', formData);
//         console.log('Response:', response.data);
//         setSuccessMessage('Registration successful!'); // Display success message to the user
//         setFormData({ // Clear form fields after successful registration
//             first_name: '',
//             last_name: '',
//             email: '',
//             password: ''
//         });
//         setErrorMessage(''); // Clear any previous error messages
//         alert('A verification email has been sent. Please check your email inbox.');
//     } catch (error) {
//         console.error('Error:', error.response.data);
//         setErrorMessage(error.response.data.message); // Display error message to the user
//         setSuccessMessage(''); // Clear any previous success messages
//     }
// };
//    console.log('Form ', formData);



//   return (
    
            
//     <div className={styles.backgroudFlex}>
//       <div className={styles.rightImage}>
//         <img src={imageecom} alt="App Store" />
//       </div>

//       <div className={`max-w-md mx-auto p-6 ${styles.box}`}>
//         <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Create an account</h2>
//         {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//         {successMessage && <div style={{ color: '#579AD3',textAlign:'center' }}>{successMessage}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-2">
//             <label htmlFor="first_name" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Firstname</label>
//             <input
//               type="text"
//               id="firstname"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className={`w-full p-1 border rounded-md ${styles.inputText}`}
//               placeholder="Enter your firstname"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="last_name" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Lastname</label>
//             <input
//               type="text"
//               id="lastname"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className={`w-full p-1 border rounded-md ${styles.inputText}`}
//               placeholder="Enter your lastname"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="email" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-1 border rounded-md ${styles.inputText}`}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="password" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full p-1 border rounded-md mb-6 ${styles.inputText}`}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={styles.SignUpLoginbutton}
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className={styles.haveAccountName}>
//           <h3>Already have an account ? </h3>

//           <h3> <Link to="/login" className={styles.loginLink}>
//             Log in
//           </Link>
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default SignupComponent
