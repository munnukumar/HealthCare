import express from 'express';
import {
  assignDoctor,
  getMappings,
  getPatientDoctors,
  removeMapping,
} from '../controllers/mapping.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/assign', protect, assignDoctor);
router.get('/get', getMappings);
router.get('/get-patient-doctor/:patientId', getPatientDoctors);
router.delete('/remove-mapping/:id', protect, removeMapping);

export default router;
