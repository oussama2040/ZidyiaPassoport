import express from 'express';
import { generateqrcode,getQRCodeUrlByStudentId } from '../controllers/qr-code.js';
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';


router.get("/generateQR/:studentId/:studentName",generateqrcode)
router.get('/getgeneratedQR/:studentId',getQRCodeUrlByStudentId)


export default router;