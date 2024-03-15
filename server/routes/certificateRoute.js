import express from 'express';
import {
    createCertificate, updateCertificate,
    countTotalCertificates, countPendingCertificates, countApprovedCertificates, countRejectedCertificates
    , getAllCertificateRequests, updateCertificateRequestStatus,countCertificatesByStatusAndDateRange,updatefilledRequestStatus
} from '../controllers/certificateController.js';

const router = express.Router();

// Authentication middleware 
const authenticateUser = (req, res, next) => { req.user = { user: { id: 1, }, }; next(); };
router.use(authenticateUser);

router.post('/certificates', createCertificate);
router.put('/certificates/:id', updateCertificate);
router.get('/certificates/organization/:organization_id/count', countTotalCertificates);
router.get('/certificates/organization/:organization_id/count/pending', countPendingCertificates);
router.get('/certificates/organization/:organization_id/count/approved', countApprovedCertificates);
router.get('/certificates/organization/:organization_id/count/rejected', countRejectedCertificates);
router.get('/certificates/organization/count/byDate', countCertificatesByStatusAndDateRange);

router.get('/certificates/:organizationId', getAllCertificateRequests);
router.put('/certificatesRequest/:requestId', updateCertificateRequestStatus);
router.put('/filledformRequest/:requestId', updatefilledRequestStatus);


export default router;


