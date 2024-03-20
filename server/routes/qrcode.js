import express from 'express';
import { generateqrcode,getQRCodeUrlByStudentId } from '../controllers/qr-code.js';
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';
import { TenentvalidateToken } from '../Middleware/validateTokenHandler.js';


router.get("/generateQR/:studentId/:studentName/:organization_Name",TenentvalidateToken,generateqrcode)
router.get('/getgeneratedQR/:studentId',TenentvalidateToken,getQRCodeUrlByStudentId)


export default router;