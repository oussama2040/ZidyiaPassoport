import express from 'express';
import {createCertificateRequest, getAllCertificatesForStudent, getVerifiedCertificatesForStudent, shareCertificate } from '../controllers/studentController.js';

const router = express.Router();

// Authentication middleware 
const authenticateUser = (req, res, next) => {
    // Assuming user information is attached to req.user
    req.user = {
        user: {
            id: 1,
        },
    };
    next();
};
// Apply authentication middleware
router.use(authenticateUser);
router.post('/students/request', createCertificateRequest);

router.get('/students/:studentId/certificates', getAllCertificatesForStudent);
router.get('/students/certificates/verified/:studentid', getVerifiedCertificatesForStudent);
router.post('/students/certificates/share/:certificateId', shareCertificate);



export default router;
