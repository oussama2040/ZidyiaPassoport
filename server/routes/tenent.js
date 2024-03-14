import express from 'express';
import { loginTenent } from '../controllers/login.js';
import { TenentrequestPasswordReset, TenentresetPassword } from '../controllers/forgetpass.js';
<<<<<<< HEAD
import SaveVerifiedCertificate from '../controllers/tenantController.js';
=======
import {SaveVerifiedCertificate, getOrganizationInfo} from '../controllers/tenantController.js';
>>>>>>> f49f01b872f6e998397b7fa3868a6648fdec7f8b
const router = express.Router();
import upload from '../controllers/imageuploadcontroller.js';



router.post('/login', loginTenent);
router.post('/resetpassverify',TenentrequestPasswordReset)
router.post('/resetpass',TenentresetPassword)
router.post('/savecertificate',upload.single('certificateImage'),SaveVerifiedCertificate)
<<<<<<< HEAD

=======
router.get('/organizationinfo',getOrganizationInfo)
>>>>>>> f49f01b872f6e998397b7fa3868a6648fdec7f8b

export default router;