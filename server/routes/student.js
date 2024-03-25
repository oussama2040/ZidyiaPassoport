import express from 'express';
import { registerstudent, studentverification } from '../controllers/register.js';
import { loginStudent } from '../controllers/login.js';
import { requestPasswordReset, resetPassword } from '../controllers/forgetpass.js';
import upload from '../controllers/imageuploadcontroller.js';
import {getstudentInfo} from '../controllers/studentController.js';
import { StudentvalidateToken } from '../Middleware/validateTokenHandler.js';
import {grantAccessToSuperadminPage} from '../controllers/superadminController.js';
import { getVerifiedCertificatesForStudent } from '../controllers/studentController.js';
import { updateProfile,addRequestCertificate,getAllCertificatesForStudent, getProfileImage} from '../controllers/studentController.js';
import { GetStudentData } from '../controllers/studentController.js';
const router = express.Router();


//router.use(validateToken); we can use this to apply the validatetoken on all routes, 
//but here we don;t want to apply this validation on the registration
router.post('/register', upload.single("ID"),registerstudent)
router.get('/registerverify', studentverification)
router.post('/login', loginStudent)
// router.get('/current', validateToken, currentuser)
router.post('/resetpassverify',requestPasswordReset)
router.post('/resetpass',resetPassword)
router.get('/studentinfo/:studentID',getstudentInfo)
router.get('/authorization',StudentvalidateToken,grantAccessToSuperadminPage)
 


router.get('/verifiedCertificate',StudentvalidateToken, getVerifiedCertificatesForStudent);
router.put('/updateProfile',StudentvalidateToken,upload.single("profile_img"), updateProfile);
router.post('/addRequest',StudentvalidateToken, upload.fields([
    { name: 'CertificateFile'},
    { name: 'TranscriptFile'}
]), addRequestCertificate);

router.get('/RequestCertificate',StudentvalidateToken, getAllCertificatesForStudent);
router.get('/profileImage',StudentvalidateToken, getProfileImage);
router.get('/GetStudentData',StudentvalidateToken, GetStudentData);

export default router;