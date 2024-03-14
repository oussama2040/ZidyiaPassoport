import express from 'express';
import { getUsersCount, getTenantsCount, getSubscribersCount, getIssuedCertificatesCount, countPendingDocs, countApprovedDocs, countRejectedDocs, createTenant, getSubscribersRequest, CreateSubscriber, CreateVerifier } from '../controllers/superadminController.js';

const router = express.Router();


router.post('/superadmin/create-tenant', createTenant);
router.post('/superadmin/subscriptions', CreateSubscriber);
router.post('/superadmin/create-subscriber', CreateVerifier);
router.get('/superadmin/students-count', getUsersCount);
router.get('/superadmin/tenants-count', getTenantsCount);
router.get('/superadmin/subscribers-count', getSubscribersCount);
router.get('/superadmin/issued-cert-count', getIssuedCertificatesCount);
router.get('/superadmin/pending-docs-count', countPendingDocs);
router.get('/superadmin/approved-docs-count', countApprovedDocs);
router.get('/superadmin/rejected-docs-count', countRejectedDocs);
router.get('/superadmin/subscription-requests', getSubscribersRequest);


export default router;





