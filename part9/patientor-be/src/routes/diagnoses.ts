import express from 'express';
import { Response } from 'express';
import { getDiagnoses } from '../services/diagnosisService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses: Diagnosis[] = getDiagnoses();
  res.send(diagnoses);
});

export default router;
