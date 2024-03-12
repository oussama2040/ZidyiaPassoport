import express from 'express';
import { loginTenent } from '../controllers/login.js';
import { TenentrequestPasswordReset, TenentresetPassword } from '../controllers/forgetpass.js';
import {SaveVerifiedCertificate, getOrganizationInfo} from '../controllers/tenantController.js';
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';



router.post('/login', loginTenent);
router.post('/resetpassverify',TenentrequestPasswordReset)
router.post('/resetpass',TenentresetPassword)
router.post('/savecertificate',upload.single('certificateImage'),SaveVerifiedCertificate)
router.get('/organizationinfo',getOrganizationInfo)

export default router;