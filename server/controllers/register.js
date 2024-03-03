
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'; 
import nodemailer from 'nodemailer';
import connection from '../config/connection.js';
import { uploadImage } from './imageuploadcontroller.js';


//====================================================================================================================
// Function to send a verification email
function sendVerificationEmail(email, verificationToken) {
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
        to: email,
        subject: 'Verify Your Email',
        text: 'Click the following link to verify your email: ',
        html: `<a href="http://localhost:5000/student/registerverify?token=${verificationToken}">Verify email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}




// ==============================================================================================================
// register user
const registerstudent = async (req, res) => {
    let ID = await uploadImage(req.file.buffer);
    const { first_name, last_name, email, password, mobile_number} = req.body;
    console.log(ID)

    try {
        // Check if all required fields are provided
        if (!first_name || !last_name || !email || !password || !mobile_number || !ID) {
            res.status(400).json({ message: 'All fields are mandatory' });
            return;
        }

        // Validate email format using regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Please enter a valid email address' });
            return;
        }

        // Validate password criteria
        if (password.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            res.status(400).json({ message: 'Password must be at least 6 characters long and contain both letters and numbers' });
            return;
        }
        // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);
        // Check if user already exists
     
        const [existingStudents] = await connection.promise().execute('SELECT * FROM student WHERE email = ? AND status = ?', [email, false]);

        if (existingStudents.length > 0) {
            // Check if the user's status is false
            if (existingStudents[0].status === false) {
                // Generate a new verification token
                const newVerificationToken = jwt.sign({ email }, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });
            
                // Update the verification token and all user data in the database
                await connection.promise().execute(
                    'UPDATE student SET first_name = ?, last_name = ?, password = ?, mobile= ?, token = ?,ID=? ?WHERE email = ?', 
                    [first_name, last_name, hashedPassword, mobile_number, newVerificationToken, ID, email]
                );
            
                // Send the verification email with the new token
                sendVerificationEmail(email, newVerificationToken);
            
                // Respond with a message indicating that the verification email has been sent
                res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
            }
            
               
             else {
                // If the status is true, the user is already registered and verified
                res.status(400).json({ message: 'User already registered and verified' });
            }
            return;
        }

       
        // create token:
        const verificationToken = jwt.sign({ email }, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });
        // Insert the user data into the database using prepared statements
        const [result] = await connection.promise().execute(
            'INSERT INTO student (first_name, last_name, email, password, mobile,token,ID) VALUES (?,?, ?, ?, ?,?, ?)',
            [first_name, last_name, email, hashedPassword, mobile_number,verificationToken,ID]
        );

        // Send verification email and respond with success
        sendVerificationEmail(email, verificationToken);
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { registerstudent };

// ============================================================================================================

// Function to get a user by verification token
const getUserByVerificationToken = async (verificationToken) => {
    try {
       
        const [rows] = await connection.promise().execute('SELECT * FROM student WHERE token = ?', [verificationToken]);
        return rows[0]; // Assuming there's only one user per token
    } catch (error) {
        console.error('Error fetching user by verification token:', error);
        throw new Error('Error fetching user by verification token');
    }
};

const studentverification = asyncHandler(async (req, res) => {
    const userToken = req.query.token; // Get the token from the URL
    console.log(userToken)
    const user = await getUserByVerificationToken(userToken); // Retrieve user by token from the database

    if (user) {
        // Compare the token in the URL with the one stored in the database
        try {
            const email = user.email;
            // Update Status to true
            await connection.promise().execute('UPDATE student SET status = ? WHERE email = ?', [true, email]);

            // Redirect the user to the login page after successful verification
            console.log('Verification succeed');
            res.redirect('http://localhost:3000/login');
        } catch (error) {
            // Token verification failed, handle accordingly
            console.error('Error verifying token:', error);
            res.redirect('/student/register');
        }
    } else {
        // Invalid token or user not found, handle accordingly
        res.redirect('/student/register');
    }
});

export { studentverification };

