import React from 'react';
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
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                </div>
                <div class="userMenu">

                </div>
                <img className="user-profile" src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1707420442/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_kixv3c.jpg" alt="" />
            </div>
        </div>
    );
}

export default NavBarAdmin;
