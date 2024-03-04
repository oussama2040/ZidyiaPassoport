//update profile(username,password,profilepic(default),bio(default),location(default))
//send verification request(tenant,academic ID,document(transcript,certificate),certificate name,desc,issuing date/expiry date)
//---------------fill template(specific template sent by specific tenant with more info (Full name,marks,...))
//view all requests to check status/specific request according to status
// view all customized certificate
//share verified certificates only only only only
//share certificate and transcript with external organizations or employers




// Assuming '../config/connection.js' is the correct relative path to your connection file
// import db from '../config/connection.js';
// import { uploadImage } from './imageuploadcontroller.js';

// const updateProfile = async (req, res) => {
//     const { first_name, last_name, password, bio, location, mobile} = req.body;
//     const student_id = req.params.studentId;
//     let profile_img  = await uploadImage(req.file.buffer);
//     try {
    
//         const [result] = await db.promise().execute(
//             'UPDATE student SET first_name = ?, last_name = ?, password = ?, bio = ?, location = ?, mobile = ?, profile_img = ? WHERE student_id = ?',
//             [first_name, last_name, password, bio, location, mobile, profile_img, student_id]
//         );
//         const affectedRows = result ? result.affectedRows : 0;
//         if (affectedRows > 0) {
//             res.status(200).json({ success: true, message: 'Profile updated successfully.' });
//         } else {
//             res.status(404).json({ success: false, message: 'User not found.' });
//         }
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
//     }
// };
// export { updateProfile };


import connection from '../config/connection.js';
import { uploadImage } from './imageuploadcontroller.js';
import bcrypt from 'bcrypt';

const updateProfile = async (req, res) => {
    const { first_name, last_name, password, bio, location, mobile } = req.body;
    const student_id = req.params.studentId;
    let profile_img;
    try {
        // Validate password
        let hashedPassword;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ success: false, message: 'Password should be at least 6 characters long.' });
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }
        if (req.file) {
            // Upload image only if file is provided
            profile_img = await uploadImage(req.file.buffer);
        }

        const updateFields = [];
        const queryParams = [];

        if (first_name) {
            updateFields.push('first_name = ?');
            queryParams.push(first_name);
        }

        if (last_name) {
            updateFields.push('last_name = ?');
            queryParams.push(last_name);
        }

        if (hashedPassword) {
            updateFields.push('password = ?');
            queryParams.push(hashedPassword);
        }

        if (bio) {
            updateFields.push('bio = ?');
            queryParams.push(bio);
        }

        if (location) {
            updateFields.push('location = ?');
            queryParams.push(location);
        }

        if (mobile) {
            updateFields.push('mobile = ?');
            queryParams.push(mobile);
        }

        if (profile_img) {
            updateFields.push('profile_img = ?');
            queryParams.push(profile_img);
        }

        queryParams.push(student_id);

        const updateQuery = `UPDATE student SET ${updateFields.join(', ')} WHERE student_id = ?`;

        const [result] = await connection.promise().execute(updateQuery, queryParams);
    
        const affectedRows = result ? result.affectedRows : 0;
        if (affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Profile updated successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};

export { updateProfile };




const addRequestCertificate = async (req, res) => {
    let CertificateFile;
    let TranscriptFile;
    const {
        student_id,
        organization_id,
        name,
        body,
        issued_date,
        expiry_date
    } = req.body;
    try {

        if (req.files && req.files.CertificateFile) {
            // Upload CertificateFile
            CertificateFile = await uploadImage(req.files.CertificateFile[0].buffer);
        }

        if (req.files && req.files.TranscriptFile) {
            // Upload TranscriptFile
            TranscriptFile = await uploadImage(req.files.TranscriptFile[0].buffer);
        }

        const [result] = await connection.promise().execute(
            `INSERT INTO certificate 
            (student_id, organization_id, name, body, issued_date, expiry_date, CertificateFile,TranscriptFile) 
            VALUES (?, ?, ?, ?, ?, ?, ? , ?)
            `,
            [
                student_id,
                organization_id,
                name,
                body,
                issued_date,
                expiry_date,
                CertificateFile,
                TranscriptFile || " " //TranscriptFile is optinal
            ]
        );

        const insertedCertificateId = result ? result.insertId : null;

        if (insertedCertificateId) {
            res.status(201).json({
                success: true,
                message: 'Certificate request added successfully.',
                certificate_id: insertedCertificateId
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to add certificate request.'
            });
        }
    } catch (error) {
        console.error('Error adding certificate request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
};

export { addRequestCertificate };
