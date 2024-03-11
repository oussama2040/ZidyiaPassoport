import connection from '../config/connection.js';
import { uploadImageInFolder } from './imageuploadcontroller.js';


const SaveVerifiedCertificate = async (req, res) => {
    try {
        // Check if request contains file data
        if (!req.file) {
            return res.status(400).json({ error: 'Certificate image is required' });
        }

        // Get the buffer containing image data
        const imageData = req.file.buffer;
        const orgId = '1';
        const stdId = '2';

        // Upload the certificate image to Cloudinary
        const uploadedCertificate = await uploadImageInFolder(imageData, "Verified-Certificates");
        console.log('Uploaded Certificate:', uploadedCertificate);

        if (!uploadedCertificate) {
            throw new Error('Failed to upload certificate to Cloudinary');
        }

        // Save the secure URL and other certificate data to your database using a prepared statement
        const [results] = await connection.promise().execute(
            `INSERT INTO verifiedcertificate (student_id, organization_id, certificate_url) VALUES (?, ?, ?)`,
            [stdId, orgId, uploadedCertificate]
        );
        console.log('Database Insert Result:', results);

        // Return success response
        return res.status(200).json({ message: 'Certificate saved successfully', certificate: uploadedCertificate });
        
    } catch (error) {
        console.error('Error saving verified certificate:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default SaveVerifiedCertificate;
