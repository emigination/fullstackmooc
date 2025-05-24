import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}
