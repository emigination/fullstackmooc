import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PatientWithoutSsn, NewPatientEntry, Patient } from '../types';

const getEntries = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patientData.map(({ ssn, ...rest }) => rest) as PatientWithoutSsn[];
};

const addEntry = (newPatientData: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { id, ...newPatientData };

  patientData.push(newPatient);
  return newPatient;
};

export {
  getEntries,
  addEntry
};
