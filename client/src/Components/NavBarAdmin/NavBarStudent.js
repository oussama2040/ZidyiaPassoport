import React, { useState, useEffect } from 'react'; import { IoIosNotificationsOutline } from "react-icons/io";
import styles from './NavBarStudent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import Cookies from 'js-cookie'; // Import Cookies


function NavBarStudent() {
    const [profileImage, setProfileImage] = useState(null);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student/GetStudentData`, {
                    withCredentials: true
                });
                setFirstName(response.data.data.first_name);
                console.log(response.data.data.first_name)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                // const response = await axios.get(`http://localhost:5000/student/profileImage`);

                const response = await axios.get(`http://localhost:5000/student/profileImage`, {
                    withCredentials: true
                });
                setProfileImage(response.data.profileImage);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };
        fetchProfileImage();
    }, []);

    const handleLogout = () => {
        try {
            console.log('Removing cookies...');
            Cookies.remove('studentaccessToken');
            Cookies.remove('studentrefreshToken');
            if (Cookies.get('studentaccessToken') || Cookies.get('studentrefreshToken')) {
                console.error('Cookies were not removed successfully.');
              } else {
                console.log('Cookies were removed successfully.');
              }
            window.location.href = '/'; // Redirect to the login page
        } catch (error) {
            console.error('Error removing cookies:', error);
        }
    };

    return (
        <div className="NavBarStudentMain">
            <div className="NavBarWelcome">Welcome {firstName}</div>
            <div className="Search">
                <input type="search" placeholder="Search here"
                    class="search" />
            </div>
            <div className="userSettings">
                <div className="dark-light">
                    <IoIosNotificationsOutline />
                </div>
                <div className="dark-light">
                    <IoMdLogOut onClick={handleLogout} />
                    {/* when click on this logout */}
                </div>
                <div class="userMenu">
                </div>
                <Link to="/student/profile" className="profile-link">
                    {profileImage && <img className="user-profile" src={profileImage} alt="Profile" />}
                </Link>
                {/* {profileImage && <img className="user-profile" src={profileImage} alt="Profile" />} */}
                {/* <img className="user-profile" src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1707420442/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_kixv3c.jpg" alt="" /> */}
            </div>
        </div>
    );
}

export default NavBarStudent;
