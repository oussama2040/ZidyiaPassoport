import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import styles from './profile.css';
import axios from 'axios';

const Profile = () => {

    const [countries, setCountries] = useState([]);
    const [profile_Img, setProfileImg] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        bio: '',
        location: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    useEffect(() => {
        fetchStudentData();
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/student/GetStudentData`, {
                withCredentials: true
            });
            const studentData = response.data.data;
            console.log(studentData);
            setFormData(prevState => ({
                ...prevState,
                first_name: studentData.first_name || '',
                last_name: studentData.last_name || '',
                bio: studentData.bio || '',
                location: studentData.location || '',
                mobile: studentData.mobile || '',
            }));
            console.log(studentData.profile_img);
            if (studentData.profile_img) {
                // setProfileImg(studentData.profile_img);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requiredFields = ['first_name', 'last_name', 'password'];
        const emptyFields = requiredFields.filter(field => {
            const value = formData[field];
            return typeof value !== 'string' || !value.trim(); // Check if value is not a string or is empty after trimming
        });

        console.log("emptyFields",emptyFields)
        if (emptyFields.length > 0) {
            alert(`Please fill all empty fields`);
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('bio', formData.bio);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('profile_img', profile_Img);

            console.log(formDataToSend);

            const { data } = await axios.put(`http://localhost:5000/student/updateProfile`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            console.log(data);
            alert("Profile updated successfully");
            window.location.href="/student/requestCertificate"
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <>
            <div className='profileFull'>
                <div class="profile-title">
                    <IoIosArrowBack style={{ color: '#5DD3B3' }} />
                    <span>CertPass</span>
                </div>
                <h1 className="titleProfile"> Let's Get To Know You</h1>
                <div className='containerofTwoDiv'>
                    <form className="ProfileForm" onSubmit={handleSubmit}>
                        <div className='ProfileContainer'>
                            <h2 className="titleProfile"> Update Your Profile</h2>
                            <div className="formProfile-container">
                                <div className="fieldProfile-container">
                                    <label id="name">First Name*</label>
                                    <input id="first_name" type="text" placeholder="Enter Your Name" value={formData.first_name} onChange={handleChange} />
                                </div>
                                <div className="fieldProfile-container">
                                    <label id="location">Your Location</label>
                                    <select id="location" className="location" value={formData.location} onChange={handleChange}>
                                        <option value="" disabled>Select Your Country / Territory</option>
                                        {countries.map(country => (
                                            <option key={country.alpha2Code} value={country.name}>{country.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="fieldProfile-container">
                                    <label htmlFor="name">Last Name*</label>
                                    <input id="last_name" type="text" placeholder="Enter Your Last Name" value={formData.last_name} onChange={handleChange} />                                </div>
                                <div className="fieldProfile-container">
                                    <label htmlFor="name">Password*</label>
                                    <input id="password" type="password" value={formData.password} onChange={handleChange} />

                                </div>
                                <div className="fieldProfile-container">
                                    <label htmlFor="name">Phone Number*</label>
                                    <input id="mobile" type="phone" placeholder="Enter Your Phone Number" value={formData.mobile} onChange={handleChange} />
                                </div>
                                <div className="fieldProfile-container" >
                                    <label htmlFor="name" ></label>
                                </div>
                                <div className="fieldProfile-container">
                                    <label htmlFor="name">Bio*</label>
                                    <textarea id="bio" placeholder="Enter Your Bio" value={formData.bio} onChange={handleChange}></textarea>
                                </div>
                                <div className="fieldProfile-container" >
                                    <label htmlFor="name"></label>
                                </div>
                                <div className="buttonProfile-container">
                                    <button className="SaveBtn" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className='ContainerProfileImage'>
                            <label className="titleProfilePhoto">Profile Photo</label>
                            <div className='ContainerProfileselectImage'>
                            <input id="profile_img" type="file" accept="image/*" onChange={(e) => setProfileImg(e.target.files[0])}
                                style={{ display: 'none' }} />

                            {profile_Img && (
                                <img src={URL.createObjectURL(profile_Img)} alt="Profile" />
                            )}
                            </div>
                            <div className='btnUpdate' onClick={() => document.getElementById("profile_img").click()}>
                                <a href="#">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Change Profile Photo
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
