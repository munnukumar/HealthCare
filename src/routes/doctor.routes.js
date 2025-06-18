
import express from 'express';
import {
  addDoctor,
  getDoctors,
  getDoctor,
  editDoctor,
  removeDoctor,
} from '../controllers/doctor.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add-doctor', protect, addDoctor);
router.get('/fetch-doctor', getDoctors);
router.get('/fetch-doctor/:id', getDoctor);
router.put('/update-doctor/:id', protect, editDoctor);
router.delete('/remove-doctor/:id', protect, removeDoctor);

export default router;