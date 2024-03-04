import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import connection from '../config/connection.js';
import jwt from 'jsonwebtoken';

// login student
const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [studentRows] = await connection.promise().execute('SELECT * FROM student WHERE email = ? ', [email]);

    // Check if the user exists
    if (studentRows.length > 0) {
        const student = studentRows[0]; // Assuming there's only one user per email

        // Verify password and status
        const passwordMatch = await bcrypt.compare(password, student.password); // comparing plaintext password with hashed password
        const status = student.status;

        if (passwordMatch && status == 1) {
            // Generate access token and refresh token for the student
            const accessToken = jwt.sign({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

            const refreshToken = jwt.sign({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                }
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

            // Save the refresh token and the access token in a secure cookie
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true});
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days in milliseconds

            res.status(200).json({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                },
                success: true,
                message: "Login successful!"
            });
        } else {
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    } else {
        res.status(401);
        throw new Error("User not found!");
    }
});

export { loginStudent };

//-----------------------------------------------------------------------------------------
//Tenant login 
const loginTenent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [tenantrow] = await connection.promise().execute('SELECT * FROM tenent WHERE admin_email = ? ', [email]);

    // Check if the user exists
    if (tenantrow.length > 0) {
        const tenent = tenantrow[0]; // Assuming there's only one user per email

        // Verify password and status
        const passwordMatch = await bcrypt.compare(password, tenent.password); // comparing plaintext password with hashed password
        

        if (passwordMatch) {
            // Generate access token and refresh token for the student
            const accessToken = jwt.sign({
                tenent: {
                    tenentid:tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname:tenent.name,
                    tenentlocation:tenent.location,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

            const refreshToken = jwt.sign({
                tenent: {
                    tenentid:tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname:tenent.name,
                    tenentlocation:tenent.location,
                }
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

            // Save the refresh token and the access token in a secure cookie
            res.cookie('TenentaccessToken', accessToken, { httpOnly: true, secure: true});
            res.cookie('TenentrefreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days in milliseconds

            res.status(200).json({
                tenent: {
                    tenentid:tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname:tenent.name,
                    tenentlocation:tenent.location,
                },
                success: true,
                message: "Login successful!"
            });
        } else {
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    } else {
        res.status(401);
        throw new Error("tenent not found!");
    }
});
export {loginTenent};

//--------------------------------------------------------------------------------------
// subscriber login:
const loginSubscriber = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [subscriberrow] = await connection.promise().execute('SELECT * FROM subscriber WHERE admin_email = ? ', [email]);

    // Check if the user exists
    if (subscriberrow.length > 0) {
        const subscriber = subscriberrow[0]; // Assuming there's only one user per email

        // Verify password
        const passwordMatch = await bcrypt.compare(password, subscriber.password); // comparing plaintext password with hashed password
        
        if (passwordMatch) {
            const expiryDate = new Date(subscriber.expiry_date);
            const currentDate = new Date();

            // Check if expiry date is less than current date
            if (expiryDate < currentDate) {
                // Expiry date has passed
                res.status(401);
                throw new Error("Subscription expired!");
            } else {

                const accessToken = jwt.sign({
                    subscriber: {
                        subscriberid:subscriber.subscriber_id,
                        email: subscriber.admin_email,
                        subscribername:subscriber.name,
                        subscriberlocation:subscriber.location,
                        expiry_date:subscriber.expiry_date
                    }
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });
    
                const refreshToken = jwt.sign({
                    subscriber: {
                        subscriberid:subscriber.subscriber_id,
                        email: subscriber.admin_email,
                        subscribername:subscriber.name,
                        subscriberlocation:subscriber.location,
                        expiry_date:subscriber.expiry_date
                    }
                }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
    
                // Save the refresh token and the access token in a secure cookie
                res.cookie('subscriberaccessToken', accessToken, { httpOnly: true, secure: true});
                res.cookie('subscriberrefreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days in milliseconds
    
                // Expiry date is valid, user can log in
                res.status(200).json({
                    subscriber: {
                        subscriberid:subscriber.subscriber_id,
                        email: subscriber.admin_email,
                        subscribername:subscriber.name,
                        subscriberlocation:subscriber.location,
                        expiry_date:subscriber.expiry_date
                    },
                    success: true,
                    message: "Login successful!"
                });
            }
        } else {
            // Password doesn't match
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    } else {
        // Subscriber not found
        res.status(401);
        throw new Error("Subscriber not found!");
    }
});
export {loginSubscriber};