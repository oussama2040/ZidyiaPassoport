import express from 'express';
import { sendcustomizeFields, studentgetCustomFields ,fillAndSendFormToOrganization , getFilledFormsByStudent , DeleteCustomFieldd} from '../controllers/customizeController.js';
import upload from '../controllers/imageuploadcontroller.js';
import { TenentvalidateToken } from '../Middleware/validateTokenHandler.js';
import { StudentvalidateToken } from '../Middleware/validateTokenHandler.js';
const router = express.Router();


router.post('/admin/customizefields',TenentvalidateToken,sendcustomizeFields);
router.delete('/admin/deletecustomizefields/:organizationId',TenentvalidateToken, DeleteCustomFieldd);
router.get('/admin/filledform/:organizationId', TenentvalidateToken,getFilledFormsByStudent);

router.get('/student/getcustomizefields/:organizationId', studentgetCustomFields);
router.post('/student/filledform/:organizationId',StudentvalidateToken,upload.single("FileOption"), fillAndSendFormToOrganization ); // need to add validate student

export default router;