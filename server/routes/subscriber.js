import express from 'express';
import { loginSubscriber } from '../controllers/login.js';
import { SubscriberrequestPasswordReset, SubscriberresetPassword } from '../controllers/forgetpass.js';

const router = express.Router();


router.post('/login', loginSubscriber);
router.post('/resetpassverify',SubscriberrequestPasswordReset)
router.post('/resetpass',SubscriberresetPassword)




export default router;