import express from 'express';
import { loginSubscriber } from '../controllers/login.js';
import { SubscriberUpdatePass } from '../controllers/updatePassword.js';
import { SubscriberrequestPasswordReset, SubscriberresetPassword } from '../controllers/forgetpass.js';
import { SubscribervalidateToken } from '../Middleware/validateTokenHandler.js';
import {grantAccessToSuperadminPage} from '../controllers/superadminController.js';
import {GetSubscriberinfo} from '../controllers/subscriberController.js';

const router = express.Router();


router.post('/login', loginSubscriber);
router.post('/resetpassverify',SubscriberrequestPasswordReset)
router.post('/resetpass',SubscriberresetPassword)
router.post('/updatepassword',SubscriberUpdatePass)
router.get('/authorization',SubscribervalidateToken,grantAccessToSuperadminPage)
router.get('/getsubscriberinfo',SubscribervalidateToken,GetSubscriberinfo)





export default router;