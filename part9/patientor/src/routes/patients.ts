import express from 'express';
import { Response } from 'express';
import { getEntries } from '../services/patientService';
import { PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients: PatientWithoutSsn[] = getEntries();
  res.send(patients);
});

export default router;
