import { z } from 'zod';
import { DiagnosisSchema, NewPatientSchema, PatientSchema, PatientWithoutSsnSchema,  } from './utils';

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type Patient = z.infer<typeof PatientSchema>;

export type PatientWithoutSsn = z.infer<typeof PatientWithoutSsnSchema>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}
