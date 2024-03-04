//--------fill template(specific template sent by specific tenant with more info (Full name,marks,...))
import connection from '../config/connection.js';
import { uploadImage } from './imageuploadcontroller.js';
import bcrypt from 'bcrypt';



//view all requests to check status/specific request according to status
// Function to retrieve all verification requests or requests with a specific status
const getAllCertificatesForStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId; 
        const query = `
            SELECT
                cert.*,
                student.first_name,
                student.last_name,
                verification.verification_date,
                verification.note
            FROM
                certificate cert
                JOIN student ON cert.student_id = student.student_id
                LEFT JOIN certificateverification verification ON cert.certificate_id = verification.certificate_id
            WHERE
                cert.student_id = ?
            ORDER BY
                cert.issued_date DESC;
        `;

        const [rows] = await connection.promise().query(query, [studentId]);

        res.status(200).json({
            certificates: rows,
        });
    } catch (error) {
        console.error('Error retrieving certificates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// retrieve all verified certificates for a student
// view all customized certificate
const getVerifiedCertificatesForStudent = async (req, res) => {
    const studentId = req.params.studentId; 
    try {
        const query = `
            SELECT
                cert.*,
                student.first_name,
                student.last_name,
                verification.verification_date,
                verification.note
            FROM
                certificate cert
                JOIN student ON cert.student_id = student.student_id
                LEFT JOIN certificateverification verification ON cert.certificate_id = verification.certificate_id
            WHERE
                cert.status = 'verified' AND cert.student_id = ?
            ORDER BY
                cert.issued_date DESC;
        `;

        const [rows] = await connection.promise().query(query, [studentId]);

        res.status(200).json({
            certificates: rows, 
        });
    } catch (error) {
        console.error("Error retrieving verified certificates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// view all customized certificate
// view all customized certificate
//share verified certificates only only only only
//share certificate and transcript with external organizations or employers
const shareCertificate = async (req, res) => {
    const studentId = req.user.user.id;
    const certificateId = req.params.certificateId;

    try {
        // Check if the certificate exists, is verified, student_id
        const [certificate] = await connection
            .promise()
            .query('SELECT * FROM certificate WHERE certificate_id = ? AND status = "verified" AND student_id = ?', [certificateId, studentId]);


        res.status(200).json({ message: 'Certificate shared successfully.' });
    } catch (error) {
        console.error('Error sharing certificate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export {
    getAllCertificatesForStudent,
    getVerifiedCertificatesForStudent,
    shareCertificate,
};




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

        // Insert data into the certificate table
        const [certificateResult] = await connection.promise().execute(
            `INSERT INTO certificate 
            (student_id, organization_id, name, body, issued_date, expiry_date, CertificateFile) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                student_id ,
                organization_id ,
                name ,
                body ,
                issued_date,
                expiry_date ,
                CertificateFile 
            ]
        );

        const insertedCertificateId = certificateResult ? certificateResult.insertId : null;

        if (insertedCertificateId && TranscriptFile) {
            // If TranscriptFile is provided, insert into the transcript table
            const [transcriptResult] = await connection.promise().execute(
                `INSERT INTO transcript 
                (student_id, organization_id, TranscriptFile) 
                VALUES ( ?, ?, ?)
                `,
                [
                   
                    student_id ,
                    organization_id ,
                    TranscriptFile
                ]
            );

            const insertedTranscriptId = transcriptResult ? transcriptResult.insertId : null;

            if (insertedTranscriptId) {
                return res.status(201).json({
                    success: true,
                    message: 'Certificate and Transcript request added successfully.',
                    
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to add Transcript request.'
                });
            }
        }
        return res.status(201).json({
            success: true,
            message: 'Certificate request added successfully.',
            certificate_id: insertedCertificateId
        });
    } catch (error) {
        console.error('Error adding certificate request:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
};

export { addRequestCertificate };
