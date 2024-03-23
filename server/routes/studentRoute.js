import express from 'express';
import { updateProfile,addRequestCertificate,getAllCertificatesForStudent,
    getVerifiedCertificatesForStudent,shareCertificate, getProfileImage} from '../controllers/studentController.js';
import upload from '../controllers/imageuploadcontroller.js';
const router = express.Router();
import { StudentvalidateToken } from '../Middleware/validateTokenHandler.js';

router.put('/updateProfile/:studentId',upload.single("profile_img"), updateProfile);
router.post('/addRequest', upload.fields([
    { name: 'CertificateFile'},
    { name: 'TranscriptFile'}
]), addRequestCertificate);

router.get('/certificates/:studentId',getAllCertificatesForStudent);
router.get('/certificates/verified/:studentId', getVerifiedCertificatesForStudent);
router.post('/certificates/share/:certificateId', shareCertificate);
router.get('/profileImage/:studentId', getProfileImage);

export default router;