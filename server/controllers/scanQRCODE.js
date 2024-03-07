import qrCode from 'qrcode-reader';
import Jimp from 'jimp';
import crypto from 'crypto';
import connection from '../config/connection.js';
import mysql from 'mysql2/promise'; // Import MySQL module for executing SQL queries

const scanQRCODE = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the uploaded image file
        const fileData = req.file.buffer;
        console.log(fileData);

        // Decode the QR code from the image
        const img = await Jimp.read(fileData);
        const qr = new qrCode();

        // Decode the QR code asynchronously
        qr.callback = async (err, value) => {
            if (err) {
                console.error('Error decoding QR code:', err);
                res.status(500).json({ error: 'Error decoding QR code' });
            } else {
                console.log('QR Code decoded successfully:', value.result);

                // Hash the data retrieved from the QR code using SHA-256
                const hashedQRData = crypto.createHash('sha256').update(value.result).digest('hex');


                // Execute SQL query to retrieve hashed data from the database
                const [rows] = await connection.promise().execute('SELECT * FROM qrcodes WHERE hashed_data = ?',[hashedQRData]);

                if (rows.length > 0) {
                  
                        res.status(200).json({ message: 'QR Code data matched with database' });
                    
                } else {
                    res.status(401).json({ error: 'QR Code data does not match with database' });
                }

            }
        };

        // Start the decoding process
        qr.decode(img.bitmap);
    } catch (error) {
        console.error('Error scanning QR code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { scanQRCODE };
