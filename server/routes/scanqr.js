import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { scanQRCODE } from '../controllers/scanQRCODE.js';
import { SubscribervalidateToken } from '../Middleware/validateTokenHandler.js';


const router = express.Router();


// Define a route to handle image uploads
router.post('/scanQRCODE',SubscribervalidateToken, upload.single("certificate"),scanQRCODE);
export default router;