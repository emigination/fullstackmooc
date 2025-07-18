import { z } from 'zod';
import { EntrySchema, EntryFormValuesSchema, HealthCheckEntrySchema, PatientSchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type Entry = z.infer<typeof EntrySchema>;

export type Patient = z.infer<typeof PatientSchema>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = z.infer<typeof EntryFormValuesSchema>;

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
