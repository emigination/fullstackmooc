import { z } from 'zod';
import { Gender } from "./types";

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckRatingSchema = z.nativeEnum({
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({ id: true });

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional(),
});

export const NewOccupationalHealthcareEntrySchema = OccupationalHealthcareEntrySchema.omit({ id: true });

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).default([]),
});

export const PatientSchema = NewPatientSchema.extend({
  id: z.string(),
  entries: z.array(EntrySchema).default([]),
});

export const PatientWithoutSsnSchema = PatientSchema.omit({
  ssn: true,
});
