import Jimp from 'jimp';
import jsQR from 'jsqr';
import crypto from 'crypto';
import connection from '../config/connection.js';

const scanQRCODE = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'No file uploaded or invalid file format' });
        }

        // Read the uploaded image file
        const fileData = req.file.buffer;

        // Use Jimp to read the image buffer
        const image = await Jimp.read(fileData);

        // Convert the image to a raw pixel array
        const imageData = image.bitmap.data;
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const code = jsQR(imageData, width, height);

        if (code) {
            // Decode the QR code
            const decodedQRData = code.data;

            // Hash the decoded data using SHA-256
            const hashedQRData = crypto.createHash('sha256').update(decodedQRData).digest('hex');

            // Query the database to check if the hashed QR data exists
            const [rows] = await connection.promise().execute('SELECT * FROM qrcodes WHERE hashed_data = ?', [hashedQRData]);

            if (rows.length > 0) {
                return res.status(200).json({ message: 'QR Code data matched with database',decodedQRData  });
            } else {
                return res.status(401).json({ error: 'QR Code data does not match with database' });
            }
        } else {
            return res.status(404).json({ error: 'No QR code found in the image' });
        }
    } catch (error) {
        console.error('Error scanning QR code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { scanQRCODE };
