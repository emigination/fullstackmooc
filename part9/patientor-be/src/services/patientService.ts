import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PatientWithoutSsn, NewPatientEntry, Patient } from '../types';

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

export {
  getPatients,
  getPatient,
  addPatient
};
