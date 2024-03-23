import express from 'express';
import { updateProfile,addRequestCertificate,getAllCertificatesForStudent,
    getVerifiedCertificatesForStudent,shareCertificate, getProfileImage} from '../controllers/studentController.js';
import { StudentvalidateToken } from '../Middleware/validateTokenHandler.js';
import upload from '../controllers/imageuploadcontroller.js';
const router = express.Router();


router.put('/updateProfile/:studentId',StudentvalidateToken,upload.single("profile_img"), updateProfile);
router.post('/addRequest',StudentvalidateToken, upload.fields([
    { name: 'CertificateFile'},
    { name: 'TranscriptFile'}
]), addRequestCertificate);

router.get('/certificates/:studentId',StudentvalidateToken, getAllCertificatesForStudent);
router.get('/certificates/verified/s',StudentvalidateToken, getVerifiedCertificatesForStudent);
router.post('/certificates/share/:certificateId', StudentvalidateToken,shareCertificate);
router.get('/profileImage/:studentId',StudentvalidateToken, getProfileImage);

export default router;