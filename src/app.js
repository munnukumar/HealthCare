import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';
import morganMiddleware from './middlewares/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';
import patientRoutes from './routes/patient.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import mappingRoutes from './routes/mapping.routes.js';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.use(errorMiddleware);

export default app;
