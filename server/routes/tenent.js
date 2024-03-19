import express from 'express';
import { loginTenent } from '../controllers/login.js';
import { TenentrequestPasswordReset, TenentresetPassword } from '../controllers/forgetpass.js';
import { TenentUpdatePass } from '../controllers/updatePassword.js';
import {SaveVerifiedCertificate, getOrganizationInfo,getAllOrganizations} from '../controllers/tenantController.js';
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';
import {TenentvalidateToken} from "./../Middleware/validateTokenHandler.js";



router.post('/login', loginTenent);
router.post('/resetpassverify',TenentrequestPasswordReset)
router.post('/resetpass',TenentresetPassword)
router.post('/updatepassword',TenentUpdatePass)
router.post('/savecertificate',upload.single('certificateImage'),SaveVerifiedCertificate)
router.get('/organizationinfo',TenentvalidateToken,getOrganizationInfo)
router.get('/Allorganization',getAllOrganizations)

export default router;