import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import connection from '../config/connection.js';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
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
                    role: "student",
                }
            }, process.env.STUDENT_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

            const refreshToken = jwt.sign({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                    role: "student",
                }
            }, process.env.STUDENT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
             console.log("student", student.first_name)

            res.status(200).json({
                student: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
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
        // Verify password
        const passwordMatch = await bcrypt.compare(password, tenent.password); // comparing plaintext password with hashed password     
        console.log("idddddd ",tenent.organization_id)
        if (passwordMatch) {
            // Generate access token and refresh token for the student
            const accessToken = jwt.sign({
                tenent: {
                    tenentid: tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname: tenent.name,
                    tenentlocation: tenent.location,
                    role:"tenent",
                }
            }, process.env.TENENT_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });


            const refreshToken = jwt.sign({
                tenent: {
                    tenentid: tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname: tenent.name,
                    tenentlocation: tenent.location,
                    role:"tenent",
                }
            }, process.env.TENENT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" })





            // Assuming `accessToken` and `refreshToken` are the tokens you want to decode
            const accessTokenData = jwt.decode(accessToken);
            const refreshTokenData = jwt.decode(refreshToken);

            // Log the decoded data
            console.log('Decoded Access Token:', accessTokenData);
            console.log('Decoded Refresh Token:', refreshTokenData);


            res.status(200).json({
                tenent: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    tenentid: tenent.organization_id,
                    adminemail: tenent.admin_email,
                    tenentname: tenent.name,
                    tenentlocation: tenent.location,
                    firstPassUpdate: tenent.firstPassUpdate
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
export { loginTenent };

//--------------------------------------------------------------------------------------
// subscriber login:
const loginSubscriber = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [subscriberrow] = await connection.promise().execute('SELECT * FROM subscriber WHERE admin_email = ?', [email]);

    // Check if the user exists
    if (subscriberrow.length > 0) {
        const subscriber = subscriberrow[0]; // Assuming there's only one user per email

        // Verify password
        const passwordMatch = await bcrypt.compare(password, subscriber.password); // comparing plaintext password with hashed password     
        if (passwordMatch) {
         

          

                const accessToken = jwt.sign({
                    subscriber: {
                        subscriberid: subscriber.subscriber_id,
                        adminemail: subscriber.admin_email,
                        subscribername: subscriber.name,
                        subscriberlocation: subscriber.location,
                        expiry_date: subscriber.expiry_date,
                        role:"subscriber",
                    }
                }, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

                const refreshToken = jwt.sign({
                    subscriber: {
                        subscriberid: subscriber.subscriber_id,
                        adminemail: subscriber.admin_email,
                        subscribername: subscriber.name,
                        subscriberlocation: subscriber.location,
                        expiry_date: subscriber.expiry_date,
                        role:"subscriber",
                    }
                }, process.env.SUBSCRIBER_REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

                // Expiry date is valid, user can log in
                res.status(200).json({
                    subscriber: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        subscriberid: subscriber.subscriber_id,
                        adminemail: subscriber.admin_email,
                        subscribername: subscriber.name,
                        subscriberlocation: subscriber.location,
                        expiryDate: subscriber.expiry_date,
                        firstPassUpdate: subscriber.firstPassUpdate
                    },
                    success: true,
                    message: "Login successful!"
                });
            
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
export { loginSubscriber };

//-----------------------------------------------------------------------------------------
//Superadmin login 
const loginSuperAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [SuperAdminrow] = await connection.promise().execute('SELECT * FROM superadmin WHERE email = ? ', [email]);

    // Check if the user exists
    if (SuperAdminrow.length > 0) {
        const SuperAdmin = SuperAdminrow[0]; // Assuming there's only one user per email 

        // Verify password
        const passwordMatch = await bcrypt.compare(password, SuperAdmin.password); // comparing plaintext password with hashed password     

        if (passwordMatch) {
            // Generate access token and refresh token for the superadmin
            const accessToken = jwt.sign({
                SuperAdmin: {
                    SuperAdminid: SuperAdmin.superadmin_id,
                    adminemail: SuperAdmin.email,
                    role: "superadmin",
                }
            }, process.env.SUPERADMIN_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });
            const refreshToken = jwt.sign({
                SuperAdmin: {
                    SuperAdminid: SuperAdmin.superadmin_id,
                    adminemail: SuperAdmin.email,
                    role: "superadmin",
                }
            }, process.env.SUPERADMIN_REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

            res.status(200).json({
                SuperAdmin: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    SuperAdminid: SuperAdmin.superadmin_id,
                    adminemail: SuperAdmin.email,
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
        throw new Error("super Admin not found!");
    }
});
export { loginSuperAdmin };