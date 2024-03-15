import connection from '../config/connection.js';
import { uploadImage } from './imageuploadcontroller.js';
import bcrypt from 'bcrypt';


/**___________________________________________
 * @desc    Get All Certificates For Student
 * @route    /students/certificates/:studentId
 * @method   GET
 * @access   private
 * ---------------------------------------------**/
const getAllCertificatesForStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const query = `
            SELECT
                cert.*,
                student.first_name,
                student.last_name,
                tenent.organization_id,
                tenent.name AS organization_name,
                tenent.location AS organization_location
            FROM
                request_certificate cert
                JOIN student ON cert.student_id = student.student_id
                JOIN tenent ON tenent.organization_id = cert.organization_id
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

/**___________________________________________
 * @desc    Get Verified Certificates For Student
 * @route    /students/certificates/verified/:studentId
 * @method   GET
 * @access   private
 * ---------------------------------------------**/
const getVerifiedCertificatesForStudent = async (req, res) => {
    const studentId = req.params.studentId;
    console.log(studentId);
    try {
        const query = `
        SELECT
            student.first_name,
            student.last_name,
            verification.verification_date,
            tenent.organization_id,
            tenent.name AS organization_name,
            tenent.location AS organization_location,
            verification.certificate_url
        FROM
            student
            LEFT JOIN verifiedcertificate verification ON verification.student_id = student.student_id
            JOIN tenent ON tenent.organization_id = verification.organization_id
        WHERE
            student.student_id = ? AND verification.verification_id IS NOT NULL
        ORDER BY
            verification.verification_date DESC;
    `;

        const [rows, fields] = await connection.promise().query(query, [studentId]);

        if (rows && rows.length > 0) {
            res.status(200).json({
                certificates: rows,
            });
        } else {
            res.status(404).json({ error: "No certificates found" });
        }

    } catch (error) {
        console.error("Error retrieving verified certificates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**___________________________________________
 * @desc    Share only verified Certificate
 * @route    /students/certificates/share/:certificateId
 * @method   POST
 * @access   private
 * ---------------------------------------------**/
const shareCertificate = async (req, res) => {
    const studentId = req.user.user.id;
    const certificateId = req.params.certificateId;

    try {
        const [certificate] = await connection
            .promise()
            .query('SELECT * FROM request_certificate WHERE request_id = ? AND status = "verified" AND student_id = ?', [certificateId, studentId]);


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


/**___________________________________________
 * @desc    Update Student Profile
 * @route    /students/updateProfile/:studentId
 * @method   PUT
 * @access   private
 * ---------------------------------------------**/
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


/**___________________________________________
 * @desc    Student Add Request Certificate
 * @route    /students/addRequest
 * @method   POST
 * @access   private
 * ---------------------------------------------**/
const addRequestCertificate = async (req, res) => {
    let CertificateFile;
    let TranscriptFile;
    let insertedCertificateId;
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

        if (CertificateFile !== undefined) {
            const [certificateResult] = await connection.promise().execute(
                `INSERT INTO request_certificate 
            (student_id, organization_id, name, body, issued_date, expiry_date, CertificateFile) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
                [
                    student_id,
                    organization_id,
                    name,
                    body,
                    issued_date,
                    expiry_date,
                    CertificateFile
                ]
            );

            insertedCertificateId = certificateResult ? certificateResult.insertId : null;

            if (insertedCertificateId && TranscriptFile) {
                // If TranscriptFile is provided, insert into the transcript table
                const [transcriptResult] = await connection.promise().execute(
                    `INSERT INTO transcript 
                (student_id, organization_id, TranscriptFile) 
                VALUES ( ?, ?, ?)
                `,
                    [

                        student_id,
                        organization_id,
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
        } else {
            return res.status(400).json({
                success: false,
                message: 'Certificate file is required.'
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Certificate request added successfully.',
            request_id: insertedCertificateId
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

/**___________________________________________
 * @desc    Get Student Info
 * @route    /student/studentinfo
 * @method   GET
 * @access   private
 * ---------------------------------------------**/
const getstudentInfo = async (req, res) => {
    // {studentID}=req.params;
    const studentID = 1;
    try {

        const [rows] = await connection.promise().execute(
            'SELECT first_name,last_name FROM student WHERE student_id = ?',
            [studentID]
        );
        if (rows.length > 0) {

            const { first_name, last_name } = rows[0];
            res.status(200).json({ first_name, last_name });
        } else {
            res.status(404).json({ error: 'student info not found' });
        }
    } catch (error) {
        console.error('Error retrieving student info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { getstudentInfo };