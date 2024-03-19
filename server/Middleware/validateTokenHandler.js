import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { parse } from "cookie";

//MIDLEWARE OF STUDENT:
const StudentvalidateToken = asyncHandler(async (req, res, next) => {

    const cookies = req.headers.cookie;
    if (!cookies || cookies === "undefined") {
        return res.status(401).redirect("http://localhost:3000/student/login");
    }
    const accessToken = parse(cookies).studentaccessToken;
    if (accessToken) {
        // Extract the token from the Authorization header
        const token = accessToken;
        // Verify the token
        jwt.verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If the access token is expired, attempt to refresh it using the refresh token
                const refreshToken = req.cookies.studentrefreshToken;

                jwt.verify(refreshToken, process.env.STUDENT_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        res.status(401).json({ message: "Invalid refresh token" });
                        res.clearCookie('studentrefreshToken'); // Clear the refresh token cookie
                        res.redirect("localhost:3000/login"); // Redirect to login page
                    } else {
                        // Generate a new access token
                        const newAccessToken = jwt.sign({
                            student: {
                                first_name: refreshDecoded.student.first_name,
                                last_name: refreshDecoded.student.last_name,
                                email: refreshDecoded.student.email,
                                id: refreshDecoded.student.id,
                            }
                        }, process.env.STUDENT_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

                        // Attach the user information to the request object
                        req.student = {
                            first_name: refreshDecoded.student.first_name,
                            last_name: refreshDecoded.student.last_name,
                            email: refreshDecoded.student.email,
                            id: refreshDecoded.student.id,
                        };

                        // Set the new access token in the response headers
                        res.cookie('studentaccessToken', newAccessToken, { httpOnly: true, secure: true });

                        next(); // Continue to the next middleware or route
                    }
                });
            } else {
                // Attach the user information to the request object
                console.log("decoded",decoded)
                req.student = decoded.student;
                next(); // Continue to the next middleware or route
            }
        });
    } else {
        res.status(401);
        throw new Error("student is not authorized or token is missing");
    }
});

export { StudentvalidateToken };

//-----------------------------------------------------------------------------------

//MIDLEWARE OF TENENT:
const TenentvalidateToken = asyncHandler(async (req, res, next) => {

    const cookies = req.headers.cookie;

    if (!cookies || cookies === "undefined") {
        return res.status(401).redirect("http://localhost:3000/tenent/login");
    }

    const accessToken = parse(cookies).tenentaccessToken;
    if (accessToken) {
        // Extract the token from the Authorization header
        const token = accessToken;
        // Verify the token
        jwt.verify(token, process.env.TENENT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If the access token is expired, attempt to refresh it using the refresh token
                const refreshToken = req.cookies.tenentrefreshToken;

                jwt.verify(refreshToken, process.env.TENENT_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        res.status(401).json({ message: "Invalid refresh token" });
                        res.clearCookie('tenentrefreshToken'); // Clear the refresh token cookie
                        res.redirect("localhost:3000/login"); // Redirect to login page
                    } else {
                        // Generate a new access token
                        const newAccessToken = jwt.sign({
                            tenent: {
                                tenentid: refreshDecoded.tenent.tenentid,
                                adminemail: refreshDecoded.tenent.adminemail,
                                tenentname: refreshDecoded.tenent.tenentname,
                                tenentlocation: refreshDecoded.tenent.tenentlocation,
                            }
                        }, process.env.TENENT_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });


                        // Attach the user information to the request object
                        req.tenent = {
                            tenentid: refreshDecoded.tenent.tenentid,
                            adminemail: refreshDecoded.tenent.adminemail,
                            tenentname: refreshDecoded.tenent.tenentname,
                            tenentlocation: refreshDecoded.tenent.tenentlocation,
                        };

                        // Set the new access token in the response headers
                        res.cookie('tenentaccessToken', newAccessToken, { httpOnly: true, secure: true });

                        next(); // Continue to the next middleware or route
                    }
                });
            } else {
                // Attach the user information to the request object
                console.log("decoded",decoded)
                req.tenent = decoded.tenent;
                next(); // Continue to the next middleware or route
            }
        });
    } else {
        res.status(401);
        throw new Error("tenent is not authorized or token is missing");
    }
});

export { TenentvalidateToken };
//-----------------------------------------------------------------------------------

//MIDLEWARE OF SUBSCRIBER:
const SubscribervalidateToken = asyncHandler(async (req, res, next) => {

    const cookies = req.headers.cookie;

    if (!cookies || cookies === "undefined") {
        return res.status(401).redirect("http://localhost:3000/subscriber/login");
    }

    const accessToken = parse(cookies).subscriberaccessToken;
    if (accessToken) {
        // Extract the token from the Authorization header
        const token = accessToken;
        // Verify the token
        jwt.verify(token, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If the access token is expired, attempt to refresh it using the refresh token
                const refreshToken = req.cookies.subscriberrefreshToken;

                jwt.verify(refreshToken, process.env.SUBSCRIBER_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        res.status(401).json({ message: "Invalid refresh token" });
                        res.clearCookie('subscriberrefreshToken'); // Clear the refresh token cookie
                        res.redirect("localhost:3000/login"); // Redirect to login page
                    } else {
                        const newAccessToken = jwt.sign({
                            subscriber: {
                                subscriberid: refreshDecoded.subscriber.subscriberid,
                                email: refreshDecoded.subscriber.adminemail,
                                subscribername: refreshDecoded.subscriber.subscribername,
                                subscriberlocation: refreshDecoded.subscriber.subscriberlocation,
                                expiry_date: refreshDecoded.subscriber.expiry_date
                            }
                        }, process.env.SUBSCRIBER_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });
                        

                        // Attach the user information to the request object
                        req.subscriber = {
                            subscriberid: refreshDecoded.subscriber.subscriberid,
                            email: refreshDecoded.subscriber.adminemail,
                            subscribername: refreshDecoded.subscriber.subscribername,
                            subscriberlocation: refreshDecoded.subscriber.subscriberlocation,
                            expiry_date: refreshDecoded.subscriber.expiry_date
                        };

                        // Set the new access token in the response headers
                        res.cookie('subscriberaccessToken', newAccessToken, { httpOnly: true, secure: true });

                        next(); // Continue to the next middleware or route
                    }
                });
            } else {
                // Attach the user information to the request object
                console.log("decoded",decoded)
                req.subscriber = decoded.subscriber;
                next(); // Continue to the next middleware or route
            }
        });
    } else {
        res.status(401);
        throw new Error("subscriber is not authorized or token is missing");
    }
});

export { SubscribervalidateToken };



// token validation for super admin
const SuperadminValidateToken = asyncHandler(async (req, res, next) => {

    const cookies = req.headers.cookie;
    if (!cookies || cookies === "undefined") {
        return res.status(401).redirect("http://localhost:3000/superadmin/login");
    }
    const accessToken = parse(cookies).SuperAdminaccessToken;
    
    if (accessToken) {
        // Extract the token from the Authorization header
        const token = accessToken;
        // Verify the token
        jwt.verify(token, process.env.SUPERADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If the access token is expired, attempt to refresh it using the refresh token
                const refreshToken = req.cookies.SuperAdminrefreshToken;

                jwt.verify(refreshToken, process.env.SUPERADMIN_REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        res.status(401).json({ message: "Invalid refresh token" });
                        res.clearCookie('SuperadminrefreshToken'); // Clear the refresh token cookie
                        res.redirect("http://localhost:3000/superadmin/login"); // Redirect to login page
                    } else {
                        // Generate a new access token
                        const newAccessToken = jwt.sign({

                            SuperAdmin: {
                                SuperAdminid: refreshDecoded.SuperAdmin.SuperAdminid,
                                email: refreshDecoded.SuperAdmin.adminemail,
                            }
                        }, process.env.SUPERADMIN_ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

                        // Attach the user information to the request object
                        req.SuperAdmin = {
                            SuperAdminid: refreshDecoded.SuperAdmin.SuperAdminid,
                            email: refreshDecoded.SuperAdmin.adminemail,
                        };

                        // Set the new access token in the response headers
                        res.cookie('SuperAdminaccessToken', newAccessToken, { httpOnly: true, secure: true });

                        next(); // Continue to the next middleware or route
                    }
                });
            } else {
                // Attach the user information to the request object
                req.SuperAdmin = decoded.SuperAdmin;
                next(); // Continue to the next middleware or route
            }
        });
    } else {
        res.status(401);
        throw new Error("superadmin is not authorized or token is missing");
    }
});

export { SuperadminValidateToken };