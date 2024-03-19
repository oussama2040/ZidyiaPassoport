import connection from '../config/connection.js';
import { uploadImageInFolder } from './imageuploadcontroller.js';


// Save the verified certificate on cloudinery and  its secure url in the database
const SaveVerifiedCertificate = async (req, res) => {
    try {
        // Check if request contains file data
        if (!req.file) {
            return res.status(400).json({ error: 'Certificate image is required' });
        }

        // Get the buffer containing image data
        const imageData = req.file.buffer;
        const orgId = req.tenent.tenentid;
        const stdId = req.params.studentID;

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

export {SaveVerifiedCertificate};


/**___________________________________________
 * @desc    Get Organization info by id
 * @route    /admin/organizationinfo
 * @method   GET
 * @access   private
 * ---------------------------------------------**/
const getOrganizationInfo = async (req, res) => {
    // const organizationID=req.tenent.tenentid;
    const organizationID=9;
    try {
        
        const [rows] = await connection.promise().execute(
            'SELECT name,location FROM tenent WHERE organization_id = ?',
            [organizationID] 
        );

        if (rows.length > 0) {
           
            const { name, location } = rows[0];
            res.status(200).json({ name, location }); 
        } else {
            res.status(404).json({ error: 'Organization info not found' }); 
        }
    } catch (error) {
        console.error('Error retrieving organization info:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
};
export {getOrganizationInfo};

/**___________________________________________
 * @desc    get All organization name and id
 * @route   /tenent/Allorganization
 * @method   GET
 * @access   private
 * ---------------------------------------------**/
const getAllOrganizations = async (req, res) => {
    try {
        const [rows] = await connection.promise().execute(
            'SELECT organization_id, name FROM tenent'
        );

        if (rows.length > 0) {
            const organizations = rows.map(row => {
                return {
                    id: row.organization_id,
                    name: row.name
                };
            });
            res.status(200).json(organizations); 
        } else {
            res.status(404).json({ error: 'No organizations found' }); 
        }
    } catch (error) {
        console.error('Error retrieving organizations:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
};

export {getAllOrganizations};
