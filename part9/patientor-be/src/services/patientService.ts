import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Entry, NewEntry, PatientWithoutSsn, NewPatientEntry, Patient } from '../types';

const getPatients = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patientData.map(({ ssn, ...rest }) => rest) as PatientWithoutSsn[];
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) return undefined;
  return patient;
};

const addPatient = (newPatientData: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { id, ...newPatientData };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry => {
  const patient = getPatient(id);
  if (!patient) { throw new Error('Patient not found'); }

  const entryWithId: Entry = { ...newEntry, id: uuid() };
  patient.entries = patient.entries.concat(entryWithId);
  return entryWithId;
};

export {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};
