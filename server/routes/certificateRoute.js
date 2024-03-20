import express from 'express';
import {
    createCertificate, updateCertificate,
    countTotalCertificates, countPendingCertificates, countApprovedCertificates, countRejectedCertificates
    , getAllCertificateRequests, updateCertificateRequestStatus,countCertificatesByStatusAndDateRange,updatefilledRequestStatus
    ,getAllCertificateVerified,countPendingDocuments,countApprovedDocuments,countRejectedDocuments,countTotalDocuments
} from '../controllers/certificateController.js';
import { TenentvalidateToken } from '../Middleware/validateTokenHandler.js';


const router = express.Router();

router.post('/certificates', createCertificate);
router.put('/certificates/:id', updateCertificate);


router.get('/certificates/organization/:organization_id/count',TenentvalidateToken, countTotalCertificates);
router.get('/certificates/organization/:organization_id/count/pending', TenentvalidateToken ,countPendingCertificates);
router.get('/certificates/organization/:organization_id/count/approved',TenentvalidateToken, countApprovedCertificates);
router.get('/certificates/organization/:organization_id/count/rejected', TenentvalidateToken,countRejectedCertificates);
router.get('/certificates/organization/count/byDate', countCertificatesByStatusAndDateRange);

router.get('/documents/organization/:organization_id/count', TenentvalidateToken ,countTotalDocuments);
router.get('/documents/organization/:organization_id/count/pending',TenentvalidateToken, countPendingDocuments);
router.get('/documents/organization/:organization_id/count/approved',TenentvalidateToken, countApprovedDocuments);
router.get('/documents/organization/:organization_id/count/rejected', TenentvalidateToken ,countRejectedDocuments);

router.get('/certificates/:organizationId',TenentvalidateToken, getAllCertificateRequests);
router.get('/certificatesverified/:organizationId',TenentvalidateToken, getAllCertificateVerified);

router.put('/certificatesRequest/:requestId', TenentvalidateToken ,updateCertificateRequestStatus);
router.put('/filledformRequest/:requestId', TenentvalidateToken ,updatefilledRequestStatus);


export default router;


