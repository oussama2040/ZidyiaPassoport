//--------fill template(specific template sent by specific tenant with more info (Full name,marks,...))


import db from '../config/connection.js';
import { cloudinaryUploadImage, cloudinaryRemoveImage } from "../utils/cloudinary.js";

//update profile(username,password,profilepic(default),bio(default),location(default))



//send verification request(tenant,academic ID,document(transcript,certificate),certificate name,desc,issuing date/expiry date)
const createCertificateRequest = async (req, res) => {
    try {
        const {
            organization_id,
            // academic_id,
            name,
            body,
            issued_date,
            expiry_date,
            certificate_file,  // certificate (mandatory)
            transcript_file,   // transcript (optional)
        } = req.body;


        // Upload certificate file
        const certificateImagePath = certificate_file;
        const certificateResult = await cloudinaryUploadImage(certificateImagePath);

        if (!certificateResult || certificateResult.error) {
            await cloudinaryRemoveImage(certificateImagePath);
            return res.status(500).json({ error: 'Error uploading certificate image to Cloudinary.' });
        }

        const certificateCloudinaryData = {
            asset_id: certificateResult.asset_id,
            public_id: certificateResult.public_id,
            version: certificateResult.version,
            url: certificateResult.secure_url,
        };

        // Upload transcript file if provided
        let transcriptCloudinaryData = null;

        if (transcript_file) {
            const transcriptImagePath = transcript_file;
            const transcriptResult = await cloudinaryUploadImage(transcriptImagePath);

            if (!transcriptResult || transcriptResult.error) {
                await cloudinaryRemoveImage(transcriptImagePath);
                await cloudinaryRemoveImage(certificateImagePath); // Remove the certificate image as well
                return res.status(500).json({ error: 'Error uploading transcript image to Cloudinary.' });
            }

            transcriptCloudinaryData = {
                asset_id: transcriptResult.asset_id,
                public_id: transcriptResult.public_id,
                version: transcriptResult.version,
                url: transcriptResult.secure_url,
            };
        }

        const query = `
            INSERT INTO certificate
            (student_id, organization_id, name, body, issued_date, expiry_date, file)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        await db.promise().query(query, [
            req.user.user.id,  
            organization_id,
            // academic_id,
            name,
            body,
            issued_date,
            expiry_date,
            certificateCloudinaryData.url,
        ]);

        // If transcript data is provided:
        if (transcriptCloudinaryData) {
            const transcriptQuery = `
                INSERT INTO transcript
                (student_id, organization_id, file,status)
                VALUES (?, ?, ?,?);
            `;

            await db.promise().query(transcriptQuery, [
                req.user.user.id, 
                organization_id,
                transcriptCloudinaryData.url,
                "pending"
            ]);
        }

        res.status(201).json({ message: 'Certificate request created successfully.' });
    } catch (error) {
        console.error('Error creating certificate request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



//view all requests to check status/specific request according to status
// Function to retrieve all verification requests or requests with a specific status
const getAllCertificatesForStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId; // Assuming you have the studentId in the request parameters

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

        const [rows] = await db.promise().query(query, [studentId]);

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
    const studentID = req.user.user.id;
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

        const [rows] = await db.promise().query(query, [studentID]);

        res.status(200).json({
            certificates: rows, 
        });
    } catch (error) {
        console.error("Error retrieving verified certificates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//share verified certificates only only only only
//share certificate and transcript with external organizations or employers
const shareCertificate = async (req, res) => {
    const studentId = req.user.user.id;
    const certificateId = req.params.certificateId;

    try {
        // Check if the certificate exists, is verified, student_id
        const [certificate] = await db
            .promise()
            .query('SELECT * FROM certificate WHERE certificate_id = ? AND status = "verified" AND student_id = ?', [certificateId, studentId]);


        res.status(200).json({ message: 'Certificate shared successfully.' });
    } catch (error) {
        console.error('Error sharing certificate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export {
    createCertificateRequest,
    getAllCertificatesForStudent,
    getVerifiedCertificatesForStudent,
    shareCertificate,
};
