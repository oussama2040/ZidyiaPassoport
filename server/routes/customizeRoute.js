import express from 'express';
import { sendcustomizeFields, studentgetCustomFields ,fillAndSendFormToOrganization , getFilledFormsByStudent , DeleteCustomFieldd} from '../controllers/customizeController.js';
import upload from '../controllers/imageuploadcontroller.js';
import { TenentvalidateToken } from '../Middleware/validateTokenHandler.js';
const router = express.Router();


router.post('/admin/customizefields',
// TenentvalidateToken,
 sendcustomizeFields);
router.get('/student/getcustomizefields/:organizationId', studentgetCustomFields);
router.delete('/admin/deletecustomizefields/:organizationId', DeleteCustomFieldd);
router.post('/student/filledform/:organizationId',upload.single("FileOption"), fillAndSendFormToOrganization );
router.get('/admin/filledform/:organizationId', getFilledFormsByStudent);



export default router;