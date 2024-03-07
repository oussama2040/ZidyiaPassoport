import express from 'express';
import { generateqrcode } from '../controllers/qr-code.js';
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';


router.get("/generateQR/:studentId/:studentName",upload.single("filename"),generateqrcode)


export default router;