import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect gender: ' + gender);

  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    if (!isString(object.name) || !isString(object.dateOfBirth) || !isDate(object.dateOfBirth) || !isString(object.ssn) || !isString(object.occupation)) {
      throw new Error('Invalid data format');
    }

    const newEntry: NewPatientEntry = {
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      ssn: object.ssn,
      gender: parseGender(object.gender),
      occupation: object.occupation
    };

    return newEntry;
  }

  throw new Error('Invalid data: some fields are missing');
};

