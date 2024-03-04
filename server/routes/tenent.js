import express from 'express';
import { loginTenent } from '../controllers/login.js';
import { TenentrequestPasswordReset, TenentresetPassword } from '../controllers/forgetpass.js';

const router = express.Router();



router.post('/login', loginTenent);
router.post('/resetpassverify',TenentrequestPasswordReset)
router.post('/resetpass',TenentresetPassword)


export default router;