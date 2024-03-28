import express from 'express';
import { sendcustomizeFields, studentgetCustomFields ,fillAndSendFormToOrganization , getFilledFormsByStudent,getFilledissueFormsByStudent , DeleteCustomFieldd,fillAndSendissueFormToOrganization} from '../controllers/customizeController.js';
import upload from '../controllers/imageuploadcontroller.js';
import { TenentvalidateToken } from '../Middleware/validateTokenHandler.js';
import { StudentvalidateToken } from '../Middleware/validateTokenHandler.js';
const router = express.Router();


router.post('/admin/customizefields',TenentvalidateToken,sendcustomizeFields);
router.delete('/admin/deletecustomizefields/:organizationId',TenentvalidateToken, DeleteCustomFieldd);
// router.get('/admin/filledform/:organizationId', TenentvalidateToken,getFilledFormsByStudent);
router.get('/admin/filledform/:organizationId', getFilledFormsByStudent);
router.get('/admin/issuefilledform/:organizationId', getFilledissueFormsByStudent);

router.get('/student/getcustomizefields/:organizationId', studentgetCustomFields);
router.post('/student/filledform/:organizationId',StudentvalidateToken,upload.single("FileOption"), fillAndSendFormToOrganization ); // need to add validate student
router.post('/student/issuefilledform/:organizationId',StudentvalidateToken,upload.single("FileOption"), fillAndSendissueFormToOrganization );
export default router;