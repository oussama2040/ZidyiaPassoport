import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { scanQRCODE } from '../controllers/scanQRCODE.js';

const router = express.Router();


// Define a route to handle image uploads
router.post('/scanQRCODE', upload.single("certificate"),scanQRCODE);
export default router;