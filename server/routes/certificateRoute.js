import express from 'express';
import {
    createCertificate, updateCertificate,
    countTotalCertificates, countPendingCertificates, countApprovedCertificates, countRejectedCertificates
    , getAllCertificateRequests, updateCertificateRequestStatus,countCertificatesByStatusAndDateRange,updatefilledRequestStatus
    ,getAllCertificateVerified,countPendingDocuments,countApprovedDocuments,countRejectedDocuments,countTotalDocuments
} from '../controllers/certificateController.js';

const router = express.Router();

router.post('/certificates', createCertificate);
router.put('/certificates/:id', updateCertificate);
router.get('/certificates/organization/:organization_id/count', countTotalCertificates);
router.get('/certificates/organization/:organization_id/count/pending', countPendingCertificates);
router.get('/certificates/organization/:organization_id/count/approved', countApprovedCertificates);
router.get('/certificates/organization/:organization_id/count/rejected', countRejectedCertificates);
router.get('/certificates/organization/count/byDate', countCertificatesByStatusAndDateRange);

router.get('/documents/organization/:organization_id/count', countTotalDocuments);
router.get('/documents/organization/:organization_id/count/pending', countPendingDocuments);
router.get('/documents/organization/:organization_id/count/approved', countApprovedDocuments);
router.get('/documents/organization/:organization_id/count/rejected', countRejectedDocuments);

router.get('/certificates/:organizationId', getAllCertificateRequests);
router.get('/certificatesverified/:organizationId', getAllCertificateVerified);

router.put('/certificatesRequest/:requestId', updateCertificateRequestStatus);
router.put('/filledformRequest/:requestId', updatefilledRequestStatus);


export default router;


