import express from 'express';
import {
  addPatient,
  getPatients,
  getPatient,
  editPatient,
  removePatient,
} from '../controllers/patient.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add-patient', protect, addPatient);
router.get('/fetch-patients', protect, getPatients);
router.get('/fetch-patients/:id', protect, getPatient);
router.put('/update-patient/:id', protect, editPatient);
router.delete('/remove-patient/:id', protect, removePatient);

export default router;
