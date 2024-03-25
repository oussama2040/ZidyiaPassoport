import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { parse } from "cookie";

//MIDLEWARE OF STUDENT:

const StudentvalidateToken = asyncHandler(async (req, res, next) => {
    // Check if access token is present
    const accessToken = req.cookies.studentaccessToken;
    if (accessToken) {
        // Verify the access token
        jwt.verify(accessToken, process.env.STUDENT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If verification fails, return an error response
                return res.status(401).json({ message: 'Access token verification failed' });
            } else {
                // If verification succeeds, attach decoded tenant information to the request object
                req.student = decoded.student;
                next();
            }
        });
    } else {
        // If access token is not present, check for refresh token
        const refreshToken = req.cookies.studentrefreshToken;
        if (!refreshToken) {
            // If refresh token is not present, return an error response
            return res.status(401).json({ message: 'Refresh token is missing' });
        }

        // Use the refresh token to generate a new access token
        jwt.verify(refreshToken, process.env.STUDENT_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                // If refresh token verification fails, return an error response
                return res.status(401).json({ message: 'Invalid refresh token' });
            } else {
                // Generate a new access token using the refresh token's data
                const newAccessToken = jwt.sign({
                    student: {
                        first_name: refreshDecoded.student.first_name,
                        last_name: refreshDecoded.student.last_name,
                        email: refreshDecoded.student.email,
                        id: refreshDecoded.student.id,
                        role: refreshDecoded.student.role 
                    }
                }, process.env.STUDENT_ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

                // Attach tenant information to the request object
                req.student = {
                    first_name: refreshDecoded.student.first_name,
                    last_name: refreshDecoded.student.last_name,
                    email: refreshDecoded.student.email,
                    id: refreshDecoded.student.id,
                    role: refreshDecoded.student.role 
                };

                // Set the new access token in the response headers
                res.cookie('studentaccessToken', newAccessToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3 * 60 * 1000) });
                next();
            }
        });
    }
});

export { StudentvalidateToken };

//-----------------------------------------------------------------------------------

//MIDLEWARE OF TENENT:
const TenentvalidateToken = asyncHandler(async (req, res, next) => {
    // Check if access token is present
    const accessToken = req.cookies.tenentaccessToken;
    if (accessToken) {
        // Verify the access token
        jwt.verify(accessToken, process.env.TENENT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If verification fails, return an error response
                return res.status(401).json({ message: 'Access token verification failed' });
            } else {
                // If verification succeeds, attach decoded tenant information to the request object
                req.tenent = decoded.tenent;
                next();
            }
        });
    } else {
        // If access token is not present, check for refresh token
        const refreshToken = req.cookies.tenentrefreshToken;
        if (!refreshToken) {
            // If refresh token is not present, return an error response
            return res.status(401).json({ message: 'Refresh token is missing' });
        }

        // Use the refresh token to generate a new access token
        jwt.verify(refreshToken, process.env.TENENT_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                // If refresh token verification fails, return an error response
                return res.status(401).json({ message: 'Invalid refresh token' });
            } else {
                // Generate a new access token using the refresh token's data
                const newAccessToken = jwt.sign({
                    tenent: {
                        tenentid: refreshDecoded.tenent.tenentid,
                        adminemail: refreshDecoded.tenent.adminemail,
                        tenentname: refreshDecoded.tenent.tenentname,
                        tenentlocation: refreshDecoded.tenent.tenentlocation,
                        role: refreshDecoded.tenent.role 
                    }
                }, process.env.TENENT_ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

                // Attach tenant information to the request object
                req.tenent = {
                    tenentid: refreshDecoded.tenent.tenentid,
                    adminemail: refreshDecoded.tenent.adminemail,
                    tenentname: refreshDecoded.tenent.tenentname,
                    tenentlocation: refreshDecoded.tenent.tenentlocation,
                    role: refreshDecoded.tenent.role 
                };

                // Set the new access token in the response headers
                res.cookie('tenentaccessToken', newAccessToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3 * 60 * 1000) });
                next();
            }
        });
    }
});

export { TenentvalidateToken };
//-----------------------------------------------------------------------------------

//MIDLEWARE OF SUBSCRIBER:
const SubscribervalidateToken = asyncHandler(async (req, res, next) => {
    // Check if access token is present
    const accessToken = req.cookies.subscriberaccessToken;
    if (accessToken) {
        // Verify the access token
        jwt.verify(accessToken, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If verification fails, return an error response
                return res.status(401).json({ message: 'Access token verification failed' });
            } else {
                // If verification succeeds, attach decoded tenant information to the request object
                req.subscriber = decoded.subscriber;
                next();
            }
        });
    } else {
        // If access token is not present, check for refresh token
        const refreshToken = req.cookies.subscriberrefreshToken;
        if (!refreshToken) {
            // If refresh token is not present, return an error response
            return res.status(401).json({ message: 'Refresh token is missing' });
        }

        // Use the refresh token to generate a new access token
        jwt.verify(refreshToken, process.env.SUBSCRIBER_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                // If refresh token verification fails, return an error response
                return res.status(401).json({ message: 'Invalid refresh token' });
            } else {
                // Generate a new access token using the refresh token's data
                const newAccessToken = jwt.sign({
                    subscriber: {
                        subscriberid: refreshDecoded.subscriber.subscriberid,
                        email: refreshDecoded.subscriber.adminemail,
                        subscribername: refreshDecoded.subscriber.subscribername,
                        subscriberlocation: refreshDecoded.subscriber.subscriberlocation,
                        expiry_date: refreshDecoded.subscriber.expiry_date,
                        role: refreshDecoded.subscriber.role 
                    }
                }, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

                // Attach tenant information to the request object
                req.subscriber = {
                        subscriberid: refreshDecoded.subscriber.subscriberid,
                        email: refreshDecoded.subscriber.adminemail,
                        subscribername: refreshDecoded.subscriber.subscribername,
                        subscriberlocation: refreshDecoded.subscriber.subscriberlocation,
                        expiry_date: refreshDecoded.subscriber.expiry_date,
                        role: refreshDecoded.subscriber.role 
                };

                // Set the new access token in the response headers
                res.cookie('subscriberaccessToken', newAccessToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3 * 60 * 1000) });
                next();
            }
        });
    }
});

export { SubscribervalidateToken };

// token validation for super admin
const SuperadminValidateToken = asyncHandler(async (req, res, next) => {
    // Check if access token is present
    const accessToken = req.cookies.SuperAdminaccessToken;
    if (accessToken) {
        // Verify the access token
        jwt.verify(accessToken, process.env.SUPERADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If verification fails, return an error response
                return res.status(401).json({ message: 'Access token verification failed' });
            } else {
                // If verification succeeds, attach decoded tenant information to the request object
                req.SuperAdmin = decoded.SuperAdmin;
                next();
            }
        });
    } else {
        // If access token is not present, check for refresh token
        const refreshToken = req.cookies.SuperAdminrefreshToken;
        if (!refreshToken) {
            // If refresh token is not present, return an error response
            return res.status(401).json({ message: 'Refresh token is missing' });
        }

        // Use the refresh token to generate a new access token
        jwt.verify(refreshToken, process.env.SUPERADMIN_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                // If refresh token verification fails, return an error response
                return res.status(401).json({ message: 'Invalid refresh token' });
            } else {
                // Generate a new access token using the refresh token's data
                const newAccessToken = jwt.sign({
                    SuperAdmin: {
                        SuperAdminid: refreshDecoded.SuperAdmin.SuperAdminid,
                        email: refreshDecoded.SuperAdmin.adminemail,
                    }
                }, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, { expiresIn: '3m' });

                // Attach tenant information to the request object
                req.SuperAdmin = {
                    SuperAdminid: refreshDecoded.SuperAdmin.SuperAdminid,
                    email: refreshDecoded.SuperAdmin.adminemail,
                };

                // Set the new access token in the response headers
                res.cookie('SuperAdminaccessToken', newAccessToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3 * 60 * 1000) });
                next();
            }
        });
    }
});

export { SuperadminValidateToken };