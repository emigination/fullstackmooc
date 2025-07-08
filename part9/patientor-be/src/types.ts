import { z } from 'zod';
import { DiagnosisSchema, EntrySchema, NewEntrySchema, NewPatientSchema, PatientSchema, PatientWithoutSsnSchema,  } from './utils';

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export type Entry = z.infer<typeof EntrySchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type Patient = z.infer<typeof PatientSchema>;

export type PatientWithoutSsn = z.infer<typeof PatientWithoutSsnSchema>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}
