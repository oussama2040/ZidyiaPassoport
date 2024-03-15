
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import connection from '../config/connection.js';
import * as crypto from 'crypto';
  
const sendResetEmail = (studentEmail,verificationToken,Role) => {
    // Send an email containing the reset link with the token
    // You can use nodemailer or any other email sending library
    // Include the reset token in the link, e.g., /reset-password?token=yourTokenHere
    console.log(`Sending reset email to ${studentEmail}`);
    const transporter = nodemailer.createTransport({
        // Set up your email transport configuration (e.g., SMTP, Gmail, etc.)
        // Example for using Gmail:
        service: 'gmail',
        auth: {
            user: 'passportzidyia@gmail.com',
            pass: 'cxnd dire ggvx qmvx',
        },
    });

    const mailOptions = {
        from: 'passportzidyia@gmail.com',
        to: studentEmail,
        subject: 'reset your password',
        text: 'Click the following link to reset your password: ',
        html:`<a href="http://localhost:3000/${Role}/resetpass?token=${verificationToken}">Reset Password</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
  };
//----------------------------------------------------------------------------------
//for student
  const requestPasswordReset = asyncHandler(async (req, res) => {
    try {
            const studentEmail = req.body.email;
            const [students] = await connection.promise().execute('SELECT * FROM student WHERE email = ? ', [studentEmail]);
        
            if (students.length > 0) {
              
                 // Generate a verification token
                const verificationToken = crypto.randomBytes(20).toString('hex');
                // Update the resetPassToken in the database with the verification token
                await connection.promise().execute('UPDATE student SET resetPassToken = ? WHERE email = ?', [verificationToken, studentEmail]);

                // Send the reset email
                const Role="student"
                sendResetEmail(studentEmail,verificationToken,Role);
                console.log("email sent successfully")
                res.status(200).json({ success : true, message: 'A reset password email has been sent. Please check your email inbox.' });

            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
});

export { requestPasswordReset };

//========================================verify user==============================================================
// Function to get a user by verification token
const getStudentByVerificationToken = async (verificationToken) => {
    try {
       
        const [rows] = await connection.promise().execute('SELECT * FROM student WHERE resetPassToken = ?', [verificationToken]);
        return rows[0]; // Assuming there's only one user per token
    } catch (error) {
        console.error('Error fetching user by verification token:', error);
        throw new Error('Error fetching user by verification token');
    }
};

  //==================================reset the password=================================================================

  const resetPassword = async (req, res) => {
    try {
        const userToken = req.query.token; // Get the token from the URL
        const { password, verifyPassword } = req.body;
        console.log('Token:', userToken); // Log the token to check if it's correctly passed
        
        // Retrieve user by token from the database
        const user = await getStudentByVerificationToken(userToken); 

        // Check if user associated with the token exists
        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE student SET password = ? WHERE email = ?', [hashedPassword, user.email]);

        res.status(200).json({ success : true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { resetPassword };

//----------------------------------------------------------------------------------------------------

//reset password for tenent:



const TenentrequestPasswordReset = asyncHandler(async (req, res) => {
    try {
            const tenentEmail = req.body.email;
            const [tenent] = await connection.promise().execute('SELECT * FROM tenent WHERE admin_email = ? ', [tenentEmail]);
        
            if (tenent.length > 0) {
              
                 // Generate a verification token
                const verificationToken = crypto.randomBytes(20).toString('hex');
                // Update the resetPassToken in the database with the verification token
                await connection.promise().execute('UPDATE tenent SET resetPassToken = ? WHERE admin_email = ?', [verificationToken, tenentEmail]);

                // Send the reset email
                const Role="tenent"
                sendResetEmail(tenentEmail,verificationToken,Role);
                console.log("email sent successfully")
                res.status(200).json({ success : true, message: 'A reset password email has been sent. Please check your email inbox.' });

            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
});

export { TenentrequestPasswordReset };

//========================================verify user==============================================================
// Function to get a user by verification token
const getTenentByVerificationToken = async (verificationToken) => {
    try {
       
        const [rows] = await connection.promise().execute('SELECT * FROM tenent WHERE resetPassToken = ?', [verificationToken]);
        return rows[0]; // Assuming there's only one user per token
    } catch (error) {
        console.error('Error fetching user by verification token:', error);
        throw new Error('Error fetching user by verification token');
    }
};

  //==================================reset the password=================================================================

  const TenentresetPassword = async (req, res) => {
    try {
        const userToken = req.query.token; // Get the token from the URL
        const { password, verifyPassword } = req.body;
        console.log('Token:', userToken); // Log the token to check if it's correctly passed
        
        // Retrieve user by token from the database
        const tenent = await getTenentByVerificationToken(userToken); 

        // Check if user associated with the token exists
        if (!tenent) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE tenent SET password = ? WHERE admin_email = ?', [hashedPassword, tenent.admin_email]);

        res.status(200).json({ success : true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { TenentresetPassword};

//----------------------------------------------------------------------------------
//for subscriber

const SubscriberrequestPasswordReset = asyncHandler(async (req, res) => {
    try {
            const subscriberEmail = req.body.email;
            const [subscriber] = await connection.promise().execute('SELECT * FROM subscriber WHERE admin_email = ? ', [subscriberEmail]);
        
            if (subscriber.length > 0) {
              
                 // Generate a verification token
                const verificationToken = crypto.randomBytes(20).toString('hex');
                // Update the resetPassToken in the database with the verification token
                await connection.promise().execute('UPDATE subscriber SET resetPassToken = ? WHERE admin_email = ?', [verificationToken, subscriberEmail]);

                // Send the reset email
                const Role="subscriber"
                sendResetEmail(subscriberEmail,verificationToken,Role);
                console.log("email sent successfully")
                res.status(200).json({ success : true, message: 'A reset password email has been sent. Please check your email inbox.' });

            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
});

export { SubscriberrequestPasswordReset };

//========================================verify user==============================================================
// Function to get a user by verification token
const getSubscriberByVerificationToken = async (verificationToken) => {
    try {
       
        const [rows] = await connection.promise().execute('SELECT * FROM subscriber WHERE resetPassToken = ?', [verificationToken]);
        return rows[0]; // Assuming there's only one user per token
    } catch (error) {
        console.error('Error fetching user by verification token:', error);
        throw new Error('Error fetching user by verification token');
    }
};

  //==================================reset the password=================================================================

  const SubscriberresetPassword = async (req, res) => {
    try {
        const userToken = req.query.token; // Get the token from the URL
        const { password, verifyPassword } = req.body;
        console.log('Token:', userToken); // Log the token to check if it's correctly passed
        
        // Retrieve user by token from the database
        const subscriber = await getSubscriberByVerificationToken(userToken); 

        // Check if user associated with the token exists
        if (!subscriber) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE subscriber SET password = ? WHERE admin_email = ?', [hashedPassword, subscriber.admin_email]);

        res.status(200).json({ success : true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { SubscriberresetPassword};

//----------------------------------------------------------------------------------------------------

//reset password for superAdmin:



const SuperAdminrequestPasswordReset = asyncHandler(async (req, res) => {
    try {
            const superAdminEmail = req.body.email;
            const [superAdmin] = await connection.promise().execute('SELECT * FROM superadmin WHERE email = ? ', [superAdminEmail]);
        
            if (superAdmin.length > 0) {
              
                 // Generate a verification token
                const verificationToken = crypto.randomBytes(20).toString('hex');
                // Update the resetPassToken in the database with the verification token
                await connection.promise().execute('UPDATE superadmin SET resetPassToken = ? WHERE email = ?', [verificationToken, superAdminEmail]);

                // Send the reset email
                const Role="superAdmin"
                sendResetEmail(superAdminEmail,verificationToken,Role);
                console.log("email sent successfully")
                res.status(200).json({ success : true, message: 'A reset password email has been sent. Please check your email inbox.' });

            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
});

export { SuperAdminrequestPasswordReset };

//========================================verify user==============================================================
// Function to get a user by verification token
const getSuperAdminByVerificationToken = async (verificationToken) => {
    try {
       
        const [rows] = await connection.promise().execute('SELECT * FROM superadmin WHERE resetPassToken = ?', [verificationToken]);
        return rows[0]; // Assuming there's only one user per token
    } catch (error) {
        console.error('Error fetching user by verification token:', error);
        throw new Error('Error fetching user by verification token');
    }
};

  //==================================reset the password=================================================================

  const SuperAdminresetPassword = async (req, res) => {
    try {
        const userToken = req.query.token; // Get the token from the URL
        const { password, verifyPassword } = req.body;
        console.log('Token:', userToken); // Log the token to check if it's correctly passed
        
        // Retrieve user by token from the database
        const superAdmin = await getSuperAdminByVerificationToken(userToken); 

        // Check if user associated with the token exists
        if (!superAdmin) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE superadmin SET password = ? WHERE email = ?', [hashedPassword, superAdmin.email]);

        res.status(200).json({ success : true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { SuperAdminresetPassword};