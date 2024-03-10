//this is the organization admin:
//analytics:(number of requests,number of documents/number of certificates) according to their status
//filter analytics by date
//customize certificate fields/customized document
//view student requests
//view student documnet
//view uploaded certificates/transcripts
//admin can verify certificate and create qrcode
// issue certificate

import connection from '../config/connection.js';
import { uploadImage } from './imageuploadcontroller.js';




const SaveVerifiedCertificate = async (req, res) => {
    try {
        // Check if request contains file data
        if (!req.file) {
            return res.status(400).json({ error: 'Certificate image is required' });
        }

        // Get the buffer containing image data
        const imageData = req.file.buffer;
        const orgid='5';
        const stdID='6';
        // Upload the certificate image to Cloudinary
        const uploadedCertificate = await uploadImage(imageData);

        // Check if upload to Cloudinary was successful
        if (!uploadedCertificate.secure_url) {
            return res.status(500).json({ error: 'Failed to upload certificate to Cloudinary' });
        }

        // Save the secure URL and other certificate data to your database using a prepared statement
        const [results] = await connection.promise().execute(
            'INSERT INTO verifiedcertificate (student_id, organization_id, verification_date, certificate_url) VALUES ( ?, ?, ?, ?)',
            [stdID, orgid,'', uploadedCertificate.secure_url]
        );
        
         
        // Return success response
        return res.status(200).json({ message: 'Certificate saved successfully', certificate: uploadedCertificate });
        
    } catch (error) {
        console.error('Error saving verified certificate:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export default SaveVerifiedCertificate;

