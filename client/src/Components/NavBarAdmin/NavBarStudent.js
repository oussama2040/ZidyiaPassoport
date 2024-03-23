import React, { useState, useEffect } from 'react';import { IoIosNotificationsOutline } from "react-icons/io";
import styles from './NavBarStudent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NavBarStudent() {
    const [profileImage, setProfileImage] = useState(null); 
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

    return (
        <div className="NavBarStudentMain">
            <div className="NavBarWelcome">Welcome Student</div>
            <div className="Search">
                <input type="search" placeholder="Search here"
                    class="search" />
            </div>
            <div className="userSettings">
                <div className="dark-light">
                    <IoIosNotificationsOutline />
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
