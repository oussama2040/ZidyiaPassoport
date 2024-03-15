import React from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from './NavBarStudent.css';

function NavBarAdmin() {
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
                <img className="user-profile" src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1707420442/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_kixv3c.jpg" alt="" />
            </div>
        </div>
    );
}

export default NavBarAdmin;
