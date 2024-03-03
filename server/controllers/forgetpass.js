
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import connection from '../config/connection.js';
import * as crypto from 'crypto';
  
const sendResetEmail = (studentEmail,verificationToken) => {
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
        html:`<a href="http://localhost:5000/student/resetpass?token=${verificationToken}">Reset Password</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
  };

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
                sendResetEmail(studentEmail,verificationToken);
                console.log("email sent successfully")
                res.status(200).json({ success : true, message: 'A reset password email has been sent. Please check your email inbox.' });

            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token has expired' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

export { requestPasswordReset };

//========================================verify user==============================================================
// Function to get a user by verification token
const getUserByVerificationToken = async (verificationToken) => {
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
        const user = await getUserByVerificationToken(userToken); 

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
