import express from 'express';
import { RequestSubscription } from '../controllers/subscriberController.js';

const router = express.Router();


router.post('/subscribe', RequestSubscription);



export default router;