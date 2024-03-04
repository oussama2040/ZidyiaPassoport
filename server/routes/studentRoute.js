import express from 'express';
import { updateProfile,addRequestCertificate } from '../controllers/studentController.js';
import upload from '../controllers/imageuploadcontroller.js';
const router = express.Router();


router.put('/updateProfile/:studentId',upload.single("profile_img"), updateProfile);
router.post('/addRequest', upload.fields([
    { name: 'CertificateFile'},
    { name: 'TranscriptFile'}
]), addRequestCertificate);

export default router;
