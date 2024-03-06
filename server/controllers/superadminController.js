import db from '../config/connection.js'
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// send tenant creation notification
function sendTenantCreateNotification(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });

    const mailOptions = {
        from: 'passportzidyia@gmail.com',
        to: email,
        subject: 'Your Tenant account has been created',
        html: `<div> Please use the following credentials to login into your account <br/><p>Your email: ${email}</p> <br/><p>Your temporary password: ${password}</p> <br/> <a href="http://localhost:3000/tenant/login">Click here to login</a></div> `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// send subscription notification
function sendCreateSubscriberNotification(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });

    const mailOptions = {
        from: 'passportzidyia@gmail.com',
        to: email,
        subject: 'Subscription to Zidyia Passport',
        html: `<div> Please use the following credentials to login into your account <br/><p>Your email: ${email}</p><p>Your temporary password: ${password}</p> <br/> <a href="http://localhost:3000/subscriber/login">Click here to login</a></div>  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

//view analytics

// Count students
export const getUsersCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS studentCount FROM student';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const studentCount = results[0].studentCount;
            res.status(200).json({ studentCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count tenants
export const getTenantsCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS tenantCount FROM tenent';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const tenantCount = results[0].tenantCount;
            res.status(200).json({ tenantCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count subscribers (whose expiry date is tomorrow or later)
export const getSubscribersCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS subscriberCount FROM subscriber WHERE expiry_date >= CURRENT_DATE;';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const subscriberCount = results[0].subscriberCount;
            res.status(200).json({ subscriberCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count issued certificates
export const getIssuedCertificatesCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS IssuedCertCount FROM certificate WHERE status = "verified"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const IssuedCertCount = results[0].IssuedCertCount;
            res.status(200).json({ IssuedCertCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


// number of requests // skipped to verify requirements 
//number of pending documnets

export const countPendingDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS PendingDocs FROM document WHERE status = "pending"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const PendingDocsCount = results[0].PendingDocs;
            res.status(200).json({ PendingDocsCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


//number of approved documnets
export const countApprovedDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS ApprovedDocs FROM document WHERE status = "approved"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const countApprovedDocs = results[0].ApprovedDocs;
            res.status(200).json({ countApprovedDocs });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

//number of rejected documnets
export const countRejectedDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS RejectedDocs FROM document WHERE status = "rejected"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const countRejectedDocs = results[0].RejectedDocs;
            res.status(200).json({ countRejectedDocs });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


//create tenant

export const createTenant = async (req, res) => {
    try {
        const { admin_email, name, location } = req.body;
        
        // Check if email already exists
        const emailExistsQuery = 'SELECT COUNT(*) AS count FROM tenent WHERE admin_email = ?';
        db.query(emailExistsQuery, [admin_email], async (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }
            
            const emailExists = results[0].count > 0;
            
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            
            const autoGeneratedPassword = crypto.randomBytes(12).toString('hex').slice(0, 12);
            const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 8);
            
            const query = 'INSERT INTO tenent (admin_email, password, name, location) VALUES (?, ?, ?, ?)';
            db.query(query, [admin_email, hashedPassword, name, location], (error, results) => {
                if (error) {
                    console.error('Error querying database:', error);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(200).json({
                    message: "Tenant created successfully", results
                });
                sendTenantCreateNotification(admin_email, autoGeneratedPassword);
            });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};




//get subscription request and create subscriber
export const getSubscribersRequest = async (req, res) => {
    try {
        const query = 'SELECT * FROM subscriptionrequest WHERE status = "pending"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ subscriptionRequests: results });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


//create subscriber

export const CreateSubscriber = async (req, res) => {
    try {
        const { subscriptionRequestId } = req.body; 
        const autoGeneratedPassword = crypto.randomBytes(12).toString('hex').slice(0, 12);
        const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 8);
        const selectQuery = 'SELECT * FROM subscriptionrequest WHERE id = ?';
        db.query(selectQuery, [subscriptionRequestId], (selectError, selectResults) => {
            if (selectError) {
                console.error('Error querying database:', selectError);
                return res.status(500).json({ error: 'Database error' });
            }


            const subscriptionRequestData = selectResults[0];
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);

            const insertQuery = 'INSERT INTO subscriber (admin_email, password, name, location, expiry_date) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [subscriptionRequestData.subscriber_email, hashedPassword, subscriptionRequestData. subscriber_name, subscriptionRequestData.location, endDate], (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error inserting subscription into database:', insertError);
                    return res.status(500).json({ error: 'Database error' });
                }
                const deleteQuery = 'DELETE FROM subscriptionrequest WHERE id = ?';
                db.query(deleteQuery, [subscriptionRequestId], (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.error('Error deleting subscription request from database:', deleteError);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    res.status(200).json({ message: `Subscription for ${selectResults[0].subscriber_name} created successfully` });
                    sendCreateSubscriberNotification(subscriptionRequestData.subscriber_email, autoGeneratedPassword)
                });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};





