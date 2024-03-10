import { fileURLToPath } from 'url';
import path from 'path';
import qr from 'qr-image';
import fs from 'fs';
import crypto from 'crypto';
import connection from '../config/connection.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const generateqrcode = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const studentName = req.params.studentName;

        // Construct data to be encoded in the QR code
        const qrData = {
            studentId: studentId,
            studentName: studentName
        };

        // Convert data to JSON string
        const qrDataString = JSON.stringify(qrData);

        // Hash the data using SHA-256
        const hashedData = crypto.createHash('sha256').update(qrDataString).digest('hex');

        // Generate QR code with hashed data
        const qr_png = qr.image(qrDataString, { type: 'png' });

        // Define filename for the QR code image
        const filename = `qr_code_${studentId}_${studentName}.png`;

        // Define the path to the folder where QR codes will be stored
        const qrCodeFolder = path.join(__dirname, '..', 'qrcodes', 'qr_codes');

        // Check if the folder exists, if not, create it
        if (!fs.existsSync(qrCodeFolder)) {
            fs.mkdirSync(qrCodeFolder, { recursive: true });
        }

        // Save QR code to a file inside the qr_codes folder
        const qrFilePath = path.join(qrCodeFolder, filename);
        const qrFileStream = fs.createWriteStream(qrFilePath);
        qr_png.pipe(qrFileStream);

        qrFileStream.on('finish', async () => {
            try {
                // Upload the generated QR code image to Cloudinary
                const cloudResult = await cloudinary.uploader.upload(qrFilePath, { folder: 'qrcodes' });

                // Insert the data into the database using a prepared statement
                await connection.promise().execute(
                    'INSERT INTO qrcodes (file_name, hashed_data, cloudinary_url) VALUES (?, ?, ?)',
                    [filename, hashedData, cloudResult.secure_url]
                );

                console.log(`QR Code generated successfully for student ${studentName}!`);
                res.send(filename); // Send the filename as response
            } catch (uploadError) {
                console.error('Error uploading QR code to Cloudinary:', uploadError);
                res.status(500).send('Error uploading QR code to Cloudinary');
            } finally {
                // Close the file stream
                qrFileStream.close();
            }
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal server error');
    }
};

export { generateqrcode };
