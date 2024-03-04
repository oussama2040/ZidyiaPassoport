import connection from '../config/connection.js';
import { cloudinaryUploadImage, cloudinaryRemoveImage } from "../utils/cloudinary.js";




/**___________________________________________
 * @desc     Create New Certificates by admin
 * @route    /certificates
 * @method   POST
 * @access   private 
 * ---------------------------------------------**/
const createCertificate = async (req, res) => {

    try {
        const {
            student_id,
            organization_id,
            name,
            body,
            issued_date,
            expiry_date,
            CertificateFile,
        } = req.body;

        // Upload photo
        const imagePath = CertificateFile;

        const result = await cloudinaryUploadImage(imagePath);
        if (!result || result.error) {
            await cloudinaryRemoveImage(imagePath);
            return res.status(500).json({ error: 'Error uploading image to Cloudinary.' });
        }

        const cloudinaryData = {
            asset_id: result.asset_id,
            public_id: result.public_id,
            version: result.version,
            url: result.secure_url,
        };

        const query = `
            INSERT INTO certificate
            (student_id, organization_id, name, body, issued_date, expiry_date, CertificateFile, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'verified');
        `;

        await connection.promise().query(query, [
            student_id,
            organization_id,
            name,
            body,
            issued_date,
            expiry_date,
            cloudinaryData.url,
        ]);

        res.status(201).json({ message: 'Certificate created successfully.' });
    } catch (error) {
        console.error('Error creating certificate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**___________________________________________
 * @desc     Update Certificate
 * @route    /certificates/:id
 * @method   PUT
 * @access   private
 * ---------------------------------------------**/
//share qr code, scan it
const updateCertificate = async (req, res) => {
    try {

        const certificateId = req.params.id;
        // Check if the certificate exists in the database
        const checkQuery = 'SELECT * FROM certificate WHERE certificate_id = ?';
        const [rows] = await connection.promise().query(checkQuery, [certificateId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Certificate not found.' });
        }
        const {
            student_id,
            organization_id,
            name,
            body,
            issued_date,
            expiry_date,
            status,
            CertificateFile,
        } = req.body;

        // Upload photo
        const imagePath = CertificateFile;

        const result = await cloudinaryUploadImage(imagePath);
        if (!result || result.error) {
            await cloudinaryRemoveImage(imagePath);
            return res.status(500).json({ error: 'Error uploading image to Cloudinary.' });
        }
        const cloudinaryData = {
            asset_id: result.asset_id,
            public_id: result.public_id,
            version: result.version,
            url: result.secure_url,
        };

        const query = `
            UPDATE certificate
            SET student_id = ?, organization_id = ?, name = ?, body = ?, issued_date = ?, expiry_date = ?, status = ?, CertificateFile = ?
            WHERE certificate_id = ?;
        `;

        await connection.promise().query(query, [
            student_id,
            organization_id,
            name,
            body,
            issued_date,
            expiry_date,
            status,
            cloudinaryData.url,
            certificateId,
        ]);

        res.status(200).json({ message: 'Certificate updated successfully.' });
    } catch (error) {
        console.error('Error updating certificate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**___________________________________________
 * @desc     Get all certificate requests for admins in a specific organization
 * @route    /admin/certificate-requests/:organizationId
 * @method   GET
 * @access   private 
 * ---------------------------------------------**/
const getAllCertificateRequests = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;

        const query = `
            SELECT
                cert.*,
                student.first_name,
                student.last_name
            FROM
                certificate cert
                JOIN student ON cert.student_id = student.student_id
            WHERE
                cert.organization_id = ? AND cert.status = 'pending'
            ORDER BY
                cert.created_at DESC;
        `;

        const [rows] = await connection.promise().query(query, [organizationId]);

        res.status(200).json({
            certificateRequests: rows,
        });
    } catch (error) {
        console.error('Error retrieving certificate requests for admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


/**___________________________________________
 * @desc     Update Certificate Request Status
 * @route    /admin/certificates/:requestId
 * @method   PUT
 * @access   private
 * ---------------------------------------------**/
const updateCertificateRequestStatus = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { status, rejectionReason } = req.body;

        if (status === 'verified') {
            const today = new Date().toISOString().split('T')[0];
            
            const updateVerificationQuery = `
               INSERT INTO certificateverification
               (organization_id, verification_date, certificate_id)
               VALUES (?, ?, ?);
            `;
            
            await connection.promise().query(updateVerificationQuery, [req.user.user.id, today, requestId]);
        }

        if (status === 'verified') {
            const updateCertificateQuery = `
                UPDATE certificate
                SET status = ?
                WHERE certificate_id = ?;
            `;
            await connection.promise().query(updateCertificateQuery, [status, requestId]);
        } else if (status === 'rejected') {
            const updateCertificateQuery = `
                UPDATE certificate
                SET status = ?, rejection_reason = ?
                WHERE certificate_id = ?;
            `;
            await connection.promise().query(updateCertificateQuery, [status, rejectionReason, requestId]);
        }

        res.status(200).json({ message: 'Certificate request status updated successfully.' });
    } catch (error) {
        console.error('Error updating certificate request status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





/**___________________________________________
 * @desc     Count the number of certificates for the organization
 * @route    /certificates/organization/:organization_id/count
 * @method   GET
 * @access   private 
 * ---------------------------------------------**/
const countTotalCertificates = async (req, res) => {
    try {
        const organizationId = req.params.organization_id;
        const countQuery = 'SELECT COUNT(*) AS totalCertificates FROM certificate WHERE organization_id = ?';
        const [result] = await connection.promise().query(countQuery, [organizationId]);
        const totalCertificates = result[0].totalCertificates;
        res.status(200).json({ totalCertificates });
    } catch (error) {
        console.error('Error counting total certificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/**___________________________________________
 * @desc     Count the number of pending certificates for the organization
 * @route    /certificates/organization/{organization_id}/count/pending
 * @method   GET
 * @access   private 
 * ---------------------------------------------**/
const countPendingCertificates = async (req, res) => {
    try {
        const organizationId = req.params.organization_id;
        const countQuery = 'SELECT COUNT(*) AS pendingCertificates FROM certificate WHERE organization_id = ? AND status = "pending"';
        const [result] = await connection.promise().query(countQuery, [organizationId]);
        const pendingCertificates = result[0].pendingCertificates;

        res.status(200).json({ pendingCertificates });
    } catch (error) {
        console.error('Error counting pending certificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**___________________________________________
 * @desc     Count the number of approved certificates for the organization
 * @route    /certificates/organization/{organization_id}/count/approved
 * @method   GET
 * @access   private 
 * ---------------------------------------------**/
const countApprovedCertificates = async (req, res) => {
    try {
        const organizationId = req.params.organization_id;
        const countQuery = 'SELECT COUNT(*) AS approvedCertificates FROM certificate WHERE organization_id = ? AND status = "verified"';
        const [result] = await connection.promise().query(countQuery, [organizationId]);
        const approvedCertificates = result[0].approvedCertificates;
        res.status(200).json({ approvedCertificates });
    } catch (error) {
        console.error('Error counting approved certificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**___________________________________________
 * @desc     Count the number of rejected certificates for the organization
 * @route    /certificates/organization/:organization_id/count/rejected
 * @method   GET
 * @access   private 
 * ---------------------------------------------**/
const countRejectedCertificates = async (req, res) => {
    try {
        const organizationId = req.params.organization_id;
        const countQuery = 'SELECT COUNT(*) AS rejectedCertificates FROM certificate WHERE organization_id = ? AND status = "rejected"';
        const [result] = await connection.promise().query(countQuery, [organizationId]);
        const rejectedCertificates = result[0].rejectedCertificates;

        res.status(200).json({ rejectedCertificates });
    } catch (error) {
        console.error('Error counting rejected certificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {
    createCertificate,
    updateCertificate,
    getAllCertificateRequests,
    updateCertificateRequestStatus,
    countTotalCertificates,
    countPendingCertificates,
    countApprovedCertificates,
    countRejectedCertificates
};
