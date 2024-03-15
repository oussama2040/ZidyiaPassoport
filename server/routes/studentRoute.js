import express from 'express';
import { updateProfile,addRequestCertificate,getAllCertificatesForStudent ,getVerifiedCertificatesForStudent,shareCertificate} from '../controllers/studentController.js';
import upload from '../controllers/imageuploadcontroller.js';
const router = express.Router();



router.put('/updateProfile/:studentId',upload.single("profile_img"), updateProfile);
router.post('/addRequest', upload.fields([
    { name: 'CertificateFile'},
    { name: 'TranscriptFile'}
]), addRequestCertificate);


router.get('/certificates/:studentId', getAllCertificatesForStudent);
router.get('/certificates/verified/:studentId', getVerifiedCertificatesForStudent);
router.post('/certificates/share/:certificateId', shareCertificate);


export default router;
