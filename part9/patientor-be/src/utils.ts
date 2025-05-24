import { z } from 'zod';
import { Gender } from "./types";

const EntryArraySchema = z.array(z.object({}));

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: EntryArraySchema
});
