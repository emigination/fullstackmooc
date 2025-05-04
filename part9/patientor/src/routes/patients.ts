import express from 'express';
import { Response } from 'express';
import { getEntries, addEntry } from '../services/patientService';
import { PatientWithoutSsn } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
  const patients: PatientWithoutSsn[] = getEntries();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = addEntry(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) errorMessage = 'Error: ' + error.message;
    res.status(400).send(errorMessage);
  }
});


export default router;
