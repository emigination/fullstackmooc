import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getPatients, getPatient, addPatient } from '../services/patientService';
import { NewPatientEntry, PatientWithoutSsn, Patient } from '../types';
import { NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients: PatientWithoutSsn[] = getPatients();
  res.send(patients);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | undefined>) => {
  const patient = getPatient(req.params.id);
  res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = addPatient(req.body);
  res.json(addedEntry);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
